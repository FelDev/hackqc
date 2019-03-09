<doc>
# SectionAbout
> About section that tell some high level infos + add some specific about section for each issues (bugs, water etc)

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
export default {
  name: 'SectionAbout',
  components: {},
  props: {
  },
  data(){
    return {}
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <section class="SectionAbout section">
    <h2 class="title" v-t="'title'"/>
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
  .SectionAbout
    background-color rgba(green, 0.5)
    min-height 50vh
</style>

<i18n>
{
  "en": {
    "title":"Section About"
  },
  "fr": {
    "title":"Section A-propos"
  }
}
</i18n>
