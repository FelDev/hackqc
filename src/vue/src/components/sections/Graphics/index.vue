<doc>
# SectionGraphics
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
export default {
  name: 'SectionGraphics',
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
  <section class="SectionGraphics section">
    <h2 class="title" v-t="'title'"></h2>
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
  .SectionGraphics
    background-color rgba(blue, 0.5)
    min-height 50vh
</style>

<i18n>
{
  "en": {
    "title":"Graphics section"
  },
  "fr": {
    "title":"Section grapghics"
  }
}
</i18n>
