<docs>
# PageInfoSingle
> A single news page

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
// import UiPicture from 'components/ui/Picture';
// import PageBuilder from 'components/builder';
// import Store from './store';
import UiPicture from 'components/ui/Picture';
import GoogleMap from 'components/pages/GoogleMap';
import { mapGetters } from 'vuex';

export default {
  name: 'PageInfoSingle',
  // components: { UiPicture, PageBuilder },
  components: {
    UiPicture,
    GoogleMap,
  },
  computed: {
    ...mapGetters({
      data: 'Informations/data',
      page: 'Informations/page',
    }),
    slug() {
      return this.$route.params.slug;
    },
  },
  watch: {
    /** watch slug from route to load datas
     * Note that we may stay on the same component within some other slug
     */
    slug: {
      handler(slug) {
        console.log({slug});
        
        if (!slug) { }
        this.$store.dispatch('Informations/LOAD', slug);
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <main class="PageInfoSingle">
    <section id="top">
      <h1
        v-t="page.title"
        class="title" />
      <UiPicture
        class="picture"
        :src="$t(page.imageDev)"
      />
      <p v-t="page.description">
        
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
         <GoogleMap/>
      </div>
    </section>
    <a :href="page.contact">Mais quoi faire ?!</a>


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
    "statsTitle": "Statistiques",
    "mapTitle": "Près de chez vous"
  }
}
</i18n>
