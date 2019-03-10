<doc>
# SectionGraphics
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import SubjectCard from './Card'
import { mapGetters } from 'vuex';

export default {
  name: 'SectionGraphics',
  components: { SubjectCard },
  props: {},
  data(){
    return {
      swiper:{
        instance: null,
        options: {
          loop: true,
          slidesPerView: 1.2,
          centeredSlides: true,
          spaceBetween: 10,
          // autoplay: {
          //   delay: 5000,
          //   speed: 5000,
          // },
        }
      },
    }
  },
  computed:{
    ...mapGetters({
      device: 'Interface/device',
      sections: 'Informations/sections',
    }),
  },
  mounted() {
    this.swiper.options = {
      ...this.swiper.options,
      pagination: {
        el: this.$refs.Pagination,
        clickable: true,
      },
      navigation: {
        nextEl: this.$refs.Next,
        prevEl: this.$refs.Prev,
      },
    };

    this.swiper.instance = this.createSwiper(this.swiper.options);
  },
  methods: {

    /**
     * create our swiper instance
     * stop autoplay on first interaction
     * @return {Object} Swiper instance
     */
    createSwiper(options) {
      // remember if we have stoped our autoswiper
      let touched = false;

      const swiper = new Swiper(this.$refs.Swiper, {
        ...options,
        // on: {
        //   touchStart: () => {
        //     if (!swiper.autoplay.running) {
        //       return;
        //     }
        //     touched = true;
        //     swiper.autoplay.stop();
        //   },
        // },
      });

      // // async autoplay (so not all at the same time)
      // if (options.autoplay) {
      //   swiper.autoplay.stop();
      //   const { delay } = options.autoplay;
      //   const randomDelay = delay + random(delay);
      //   setTimeout(() => {
      //     if (!touched) {
      //       swiper.slideNext();
      //       swiper.autoplay.start();
      //     }
      //   }, randomDelay);
      // }

      return swiper;
    },
  }
};
</script>

<template>
  <section class="SectionGraphics section">
    <h2 class="title" v-t="'title'"></h2>
    <!-- Slider main container -->
    <div ref="Swiper" class="Swiper swiper-container">
      <!-- Additional required wrapper -->
      <ul ref="SwiperWrapper" class="swiper-wrapper">
          <!-- Slides -->
          <SubjectCard
            v-for="(slide, index) in sections"
            :key="`slide-${index}`"
            v-bind="slide"
            ref="Slide" class="swiper-slide" />
      </ul>
      <!-- If we need pagination -->
      <div ref="Pagination" class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div v-show="device.type === 'desktop'" ref="Prev" class="swiper-button-prev"></div>
      <div v-show="device.type === 'desktop'" ref="Next" class="swiper-button-next"></div>
    </div>
  </section>
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
  .SectionGraphics
    // height calc('100vh - '+($h-header+10px))
    flexbox(column)
    padding-bottom 20px

  .Swiper
    // background-color red
    flex-grow 1
    width 100%
    margin-top 20px
    overflow visible

  .Slide
    height 100%

  //  ===DEBUG===
  // .Swiper
  //   background-color red
  // .SectionGraphics
  //   background-color rgba(blue, 0.5)
</style>

<i18n>
{
  "fr": {
<<<<<<< HEAD
    "title":"Section Graphiques"
=======
    "title":"Section graphics"
>>>>>>> 4000b1cc442c9baab9bed6b6eb0a6547dca80696
  }
}
</i18n>
