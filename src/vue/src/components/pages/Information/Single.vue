<docs>
# PageInfoSingle
> A single news page

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
// import UiPicture from 'components/ui/Picture';
// import PageBuilder from 'components/builder';
// import Store from './store';
import UiPicture from 'components/ui/picture';

export default {
  name: 'PageInfoSingle',
  // components: { UiPicture, PageBuilder },
  components: {
    UiPicture,
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    /**
     * @argument {Object} article - our entry datas
     */
    entry() {
      // return this.$store.getters['News/getEntryBySlug'](this.slug);
    },
  },
  watch: {
    /** watch slug from route to load datas
     * Note that we may stay on the same component within some other slug
     */
    slug: {
      handler(slug) {
        if (!slug) { }
        // this.$store.dispatch('News/LOAD_SINGLE', slug);
      },
      immediate: true,
    },
  },
  data(){
    return {
      title:"saluyuiuiuiuiu"
    }
  }
  // /** register news store if needed - load datas on slug change */
  // beforeCreate() {
  //   if (!this.$store.state.News) {
  //     this.$store.registerModule('News', Store);
  //   }
  // },
};
</script>

<template>
  <main class="PageInfoSingle">
    <section id="top">
      <h1
        v-t="title"
        class="title" />
      <pre>
        slug: {{ slug }}
      </pre>
      <h1>{{ slug }}</h1>
      <UiPicture
        class="picture"
        :src="$t('imageDev')"
      />
      <p v-t="'infoPunaises'">
        
      </p>
    </section>
    <section id="middle">
      <div class="d3Graph">
         <!-- TODO: inclure un graph d3.js -->
      </div>
      <h1
        v-t="'statsTitle'"
        class="title" />
    </section>
    <section id="bottom">
      <h1
        v-t="'mapTitle'"
        class="title" />
      <div class="map">
         <!-- TODO: inclure la map-à-Marc -->
      </div>
    </section>

  </main>
</template>

<style lang="stylus" scoped>
  #top
    background #456
  #middle
    background #112
    display flex
    h1
      color:red
      flex-grow 2
    .d3Graph
      flex-grow 8
      border 2px solid black
      border-radius 1em
  #bottom
    background #123
  .picture
    // ratio-box(16/9)
    width 50%

  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===
</style>

<i18n>
{
  "fr": {
    "title": "1 sujet",
    "image": "https://static.actu.fr/uploads/2018/10/punaises-de-lit.jpg",
    "imageDev": "https://i.ytimg.com/vi/sB5kkRHdnLQ/hqdefault.jpg",
    "statsTitle": "Statistiques",
    "mapTitle": "Près de chez vous",
    "infoPunaises": "L'appellation « punaise des lits » peut désigner plusieurs espèces d'insectes hétéroptères de la famille des Cimicidae, selon les régions du monde où le terme est employé. Exclusivement hématophages, les mâles comme les femelles piquent et sucent (durant 10 à 20 min) le sang de leur hôte, pouvant vivre sans manger jusqu’à 1 an et demi, voire 2 ans dans de bonnes conditions. Elles sont sources de fortes démangeaisons et de dermatites. \nAu début du xxie siècle, certaines espèces de punaises semblent de nouveau proliférer, y compris dans des hôtels, hôpitaux ou maisons de retraite1. Ce sont des insectes exclusivement nocturnes, mais lorsque la population augmente ils peuvent se promener même le jour. \nLa revue Nature a publié en février 2016 de premières données génomiques sur la punaise du lit, qui pourrait permettre d'affiner les méthodes de prévention et de lutte2"
  }
}
</i18n>
