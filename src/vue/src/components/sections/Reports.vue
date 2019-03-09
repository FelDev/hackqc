<doc>
# SectionReports
> Some form to report some issues (invadors etc)

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
export default {
  name: 'SectionReports',
  components: {},
  props: {},
  data(){
    return {}
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <section class="SectionReports section">
    <h2 class="title" v-t="'title'" />
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

  //  ===DEBUG===
  .SectionReports
    background-color rgba(magenta, 0.5)
    min-height 50vh
</style>

<i18n>
{
  "en": {
    "title":"Reports section"
  },
  "fr": {
    "title":"Section report"
  }
}
</i18n>
