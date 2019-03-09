<docs>
# PageInfoCollection
> Page info - listing

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
// import Store from './store';

export default {
  name: 'PageInfoCollection',
  components: {
  },
  computed: {
    // ...mapGetters({
    //   entries: 'News/entries',
    // }),
  },
  // /** register news store if needed and load page */
  // beforeCreate() {
  //   if (!this.$store.state.News) {
  //     this.$store.registerModule('News', Store);
  //   }
  //   const api = this.$store.state.News.apis.collection;
  //   this.$store.dispatch('News/LOAD', api);
  // },
};
</script>

<template>
  <main class="PageInfoCollection">
    <h1 class="title" v-t="'title'" />
    @TODO LIST ALL SUBJECTS
  </main>
</template>

<i18n>
{
  "fr": {
    "title": "Tous les sujets"
  }
}
</i18n>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===

  //  ===DEBUG===
  .PageInfoCollection
    //
</style>
