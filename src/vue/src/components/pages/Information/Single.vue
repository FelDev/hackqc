<docs>
# PageInfoSingle
> A single news page

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
// import UiPicture from 'components/ui/Picture';
// import PageBuilder from 'components/builder';
// import Store from './store';

export default {
  name: 'PageInfoSingle',
  // components: { UiPicture, PageBuilder },
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
        if (!slug) { return; }
        // this.$store.dispatch('News/LOAD_SINGLE', slug);
      },
      immediate: true,
    },
  },
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
    <h1 class="title" v-t="title" />+
    <pre>
      slug: {{slug}}
    </pre>
  </main>
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
</style>

<i18n>
{
  "en": {
    "title": "1 subject"
  },
  "fr": {
    "title": "1 sujet"
  }
}
</i18n>
