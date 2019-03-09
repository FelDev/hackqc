<doc>
# SectionMap
> Map section that display 1 issue at a time (select) and view historic, current status and tendencies

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
export default {
  name: 'SectionMap',
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
  <div class="SectionMap section">
    <h2 class="title" v-t="'title'" />
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

  //  ===DEBUG===
  .SectionMap
    background-color rgba(purple, 0.5)
    min-height 50vh
</style>

<i18n>
{
  "en": {
    "title":"THE MAP"
  },
  "fr": {
    "title":"Cartographie"
  }
}
</i18n>
