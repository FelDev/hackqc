<docs>
# UIVideo
> video component full nice

@todo
- [x] poster (image not poster so covermode) + overlay
- [x] types :
  - [x] file
  - [x] youtube (native api - works within any youtube urls)
  - [x] vimeo (native api)
- [ ] optimisations
  - [x] dynamic imports ('@vimeo/player', 'youtube-player', 'object-fit-videos' only if needed)
  - [x] ScrollMagic to force stop on leave viewport
  - [ ] load video only when in screen (scrollmagic) / or even on play
- [ ] annimations
- [ ] improve embed player's mute / volume
- [ ] test autoplay with mute etc, and with embed players

@author Nicolas Husson <nicolas@kffen.com>
</docs>

<script>
import Picture from 'components/ui/Picture';
import StringsHelper from 'utils/helpers/Strings';
import S from 'string';
// import { each } from 'lodash';
import { Scene } from 'scrollmagic';
import { mapGetters } from 'vuex';
// @todo dynamic conditional imports
import ObjectFitVideos from 'object-fit-videos';

const importVimeoPlayer = () => import('@vimeo/player');
const importYouTubePlayer = () => import('youtube-player');

const VIDEO_TYPES = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
};
const VIDEO_PLATFOMS = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
};

export default {
  name: 'UiVideo',
  components: { Picture },
  props: {
    /** "internal" | "external" -- @see VIDEO_TYPES */
    type: {
      type: String,
      default: VIDEO_TYPES.INTERNAL,
    },
    /** video url - can be a filepath or an external url */
    src: {
      type: String,
      default: null,
      required: true,
    },
    /** poster image can be image url or image object - @see `<UiPicture />` */
    poster: {
      type: [String, Object],
      default: null,
    },
    /**
     * if 'cover' or 'contain' use object-fit-video
     * if null, no cover mode (@todo)
     */
    cover: {
      type: String,
      default: 'cover',
    },
    /** default loop player option */
    loop: {
      type: Boolean,
      default: false,
    },
    /** default autoplay player option */
    autoplay: {
      type: Boolean,
      default: false,
    },
    /** default muted player option */
    muted: {
      type: Boolean,
      default: false,
    },
    /** default controls player option */
    controls: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      VIDEO_TYPES,
      VIDEO_PLATFOMS,
      player: null, // video embed player (vimeo/youtube)
      /**
       * component state sync within video playback events
       * if we do a play action, it may take time for video to actualy play (buffer etc)
       * and once it's playing, it trigger some events, that will update our state :)
       */
      state: {
        playing: false,
        muted: false,
        ended: true,
        loaded: true, // @todo preload
      },
      /**
       * events handlers for playbacks events
       * sync playback with component state and emit some events
       */
      handlers: {
        play: () => {
          this.state.playing = true;
          this.state.ended = false;
          /**
           * play event
           * @type {Event}
           */
          this.$emit('play');
        },
        pause: () => {
          this.state.playing = false;
          /**
           * pause event
           * @type {Event}
           */
          this.$emit('pause');
        },
        stop: () => {
          this.state.playing = false;
          this.state.ended = true;
          /**
           * stop event (on stop or ended)
           * @type {Event}
           */
          this.$emit('stop');
        },
        youtubeStateChange: (event) => {
          // https://developers.google.com/youtube/iframe_api_reference#onStateChange
          switch (event.data) {
            case 1: // playing
              return this.handlers.play();
            case 2: // paused
              return this.handlers.pause();
            case 0: // ended
            case 5: // stopped
              return this.handlers.stop();
            default:
              return null;
          }
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      viewport: 'Interface/viewport',
    }),
    // /** @return {Object} style of our play button
    //  * not intended to be generic, kffein site specific stuff
    //  */
    // actionStyles() {
    //   return {
    //     color: 'white',
    //     backgroundColor: '#944bf6',
    //   };
    // },
    /**
     * @return {String} video format ('videp/mp4') based on file extension
     * or 'youtube' | 'vimeo'
     */
    format() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        if (typeof (this.src) !== 'string' || this.src === '') return null;
        return `video/${StringsHelper.getFileExtension(this.src)}`;
      }

      if (S(this.src).contains('youtube') || S(this.src).contains('youtu.be')) {
        return VIDEO_PLATFOMS.YOUTUBE;
      }
      if (S(this.src).contains('vimeo')) {
        return VIDEO_PLATFOMS.VIMEO;
      }

      return null;
    },
  },
  watch: {
    player(player) {
      if (!player) return;

      this.addPlaybackListeners();
      if (this.autoplay) {
        this.play();
      }
    },
  },

  mounted() {
    // sync state with props
    this.state.muted = this.muted || this.autoplay;

    if (this.type === VIDEO_TYPES.EXTERNAL) {
      this.initEmbedPlayer();
    } else {
      this.addPlaybackListeners();
      if (this.autoplay) {
        this.play();
      }
    }
    this.applyCoverPolyfill();

    setTimeout(this.initScrollMagic.bind(this), 1000);
  },
  beforeDestroy() {
    // @todo destroy YTPlayer and listeners
    this.removePlaybackListeners();
  },
  methods: {
    /** play video
     * @returns Promise
     */
    play() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        return this.$refs.Video.play();
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          return this.player.playVideo();
        case VIDEO_PLATFOMS.VIMEO:
          return this.player.play();
        default:
          return new Promise((resolve, reject) => {
            reject(new Error('incorrect video url'));
          });
      }
    },
    /** pause video
     * @returns Promise
     */
    pause() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        return this.$refs.Video.pause();
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          return this.player.pauseVideo();
        case VIDEO_PLATFOMS.VIMEO:
          return this.player.pause();
        default:
          return new Promise((resolve, reject) => {
            reject(new Error('incorrect video url'));
          });
      }
    },
    /** stop video
     * @returns Promise
     */
    stop() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        this.$refs.Video.pause();
        const { duration } = this.$refs.Video;
        if (!Number.isNaN(duration)) {
          this.$refs.Video.currentTime = duration;
        }
        return new Promise((resolve) => {
          resolve();
        });
      }

      if (!this.player) {
        return new Promise((resolve) => {
          resolve();
        });
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          return this.player.stopVideo();
        case VIDEO_PLATFOMS.VIMEO:
          // no stop method... so seek to end - 0.5 (because if just seek to end it bug)
          return this.player.getDuration()
          .then((duration) => {
            this.player.setCurrentTime(duration - 0.5);
            return this.player;
          });
        default:
          return new Promise((resolve, reject) => {
            reject(new Error('incorrect video url'));
          });
      }
    },
    /** mute video
     * @param {Boolean} muted - if false, unmute video - but default to true
     * @returns void
     */
    mute(muted = true) {
      this.state.muted = muted;
    },
    /** unmute video
     * @returns void
     */
    unmute() {
      this.state.muted = false;
    },

    /** add playback listener - and emit events based on those
     * actually only for internal videos - YT player will also watch is state change
     * @returns void
     */
    addPlaybackListeners() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        this.$refs.Video.addEventListener('play', this.handlers.play); // playing
        this.$refs.Video.addEventListener('pause', this.handlers.pause);
        this.$refs.Video.addEventListener('ended', this.handlers.stop);
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          this.player.on('stateChange', this.handlers.youtubeStateChange);
          break;
        case VIDEO_PLATFOMS.VIMEO:
          this.player.on('play', this.handlers.play);
          this.player.on('pause', this.handlers.pause);
          this.player.on('ended', this.handlers.stop);
          break;
        default:
          break;
      }
    },
    /** remove playback listeners */
    removePlaybackListeners() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        this.$refs.Video.removeEventListener('play', this.handlers.play);
        this.$refs.Video.removeEventListener('pause', this.handlers.pause);
      }
    },

    /** apply cover polyfill
     * if needed (cover + ie) only on INTERNAL videos
     * @todo import polyfill only if needed
     */
    applyCoverPolyfill() {
      if (this.type !== VIDEO_TYPES.INTERNAL) return;

      this.$watch('cover', (cover) => {
        if (!cover || !this.$refs.Video) return;
        ObjectFitVideos(this.$refs.Video);
      }, {
        immediate: true,
      });
    },

    /** init embed player (youtube/vimeo) */
    initEmbedPlayer() {
      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          importYouTubePlayer().then((Module) => {
            const YouTubePlayer = Module.default;
            const id = this.getYoutubeVideoID(this.src); // eslint-disable-line no-case-declarations
            const player = new YouTubePlayer(this.$refs.Video);
              // .loadVideoByUrl(this.src); // expect very specific format

            // wait player ready, video loaded, and stop it because default autoplay
            // note that will watch this.player and re-autoplay if needed
            player.loadVideoById(id)
              .then(() => player.stopVideo())
              .then(() => {
                this.player = player;
              });
          });
          break;
        case VIDEO_PLATFOMS.VIMEO:
          importVimeoPlayer().then((Module) => {
            const VimeoPlayer = Module.default;

            this.player = new VimeoPlayer(this.$refs.Video, {
              url: this.src,
              loop: this.loop,
              autoplay: this.autoplay,
              muted: this.muted,
            });
          });
          break;
        default:
          break;
      }
    },

    /**
     * @return {String} youtube video id
     */
    getYoutubeVideoID(url) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : false;
    },

    /**
     * init scrollmagic to autostop video when off screen
     */
    initScrollMagic() {
      const duration = this.viewport.height + this.$el.offsetHeight;
      const scene = new Scene({
        triggerElement: this.$el,
        duration,
        triggerHook: 1,
      })
      .on('leave', this.stop.bind(this));
      this.$store.dispatch('ScrollMagic/ADD_SCENE', { scene, indicators: true });

      this.$watch('viewport', (viewport) => {
        scene.duration(viewport.height + this.$el.offsetHeight);
      });
    },
  },
};
</script>

<template>
  <div class="UIVideo">

    <!-- @slot default big button play - can be overrided -->
    <slot name="actions">
      <div
        v-if="state.ended"
        class="actions">
        <button
          class="btn play"
          @click.prevent="play"
          v-text="$t('play')"/>
      </div>
    </slot>

    <Picture
      v-if="state.ended || !state.loaded"
      ref="Poster"
      v-bind="poster"
      cover="cover"
      class="poster"/>

    <video
      v-if="type === VIDEO_TYPES.INTERNAL"
      ref="Video"
      :loop="loop"
      :muted="state.muted"
      :autoplay="autoplay"
      :controls="controls"
      :data-cover="cover"
      class="video"
      controlsList="nodownload">
      <source
        :src="src"
        :type="format">
    </video>

    <div
      v-else
      ref="Video"
      class="video -embed"/>

    <span
      ref="SM_END"
      class="sm -end"/>
  </div>
</template>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===
  .UIVideo
    position relative
    width 100%
    background $c-black

  .actions
  .poster
  .video
  >>> iframe
    absolute 0
    size 100%


  .video
  >>> iframe
    z-index 10

  [data-cover='cover']
    object-fit cover
    font-family 'object-fit:cover;'
  [data-cover='contain']
    object-fit contain
    font-family 'object-fit:contain;'


  .poster
    z-index 20

  .actions
    z-index 30
    flexbox(center)
    &:before
      content ''
      absolute 0
      background-color rgba($c-black, 0.8)
    .btn
      position relative

  .btn.play
    border-radius 50%
    fontstyle(title, $lh:0, $size:2rem)
    size 120px
    background-color var(--textColor)
    color var(--backgroundColor)
    .no-touchevents &:hover
      background-color var(--highlightColor)


  .sm
    position absolute
    &.-end
      bottom 0

  //  ===DEBUG===
  // [data-debug-mode="true"] .UIVideo
  //   background url('./_debug/desktop.jpg') top left no-repeat
  //   .actions:before
  //     opacity 0
  //   .poster
  //   .video
  //     opacity .2
</style>

<i18n>
{
  "fr": {
    "play": "Jouer"
  },
  "en": {
    "play": "Play"
  }
}
</i18n>

<story
  group="Ui|Video"
  name="youtube">
  <UiVideo
    style="width:640px; height:480px;"
    type="external"
    src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
</story>

<story
  group="Ui|Video"
  name="youtu.be shortags">
  <UiVideo
    style="width:640px; height:480px;"
    :autoplay="true"
    cover="contain"
    type="external"
    src="https://youtu.be/dQw4w9WgXcQ" />
</story>
