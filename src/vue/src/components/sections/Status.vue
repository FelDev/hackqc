<Sectiondoc>
# Status
> Section that resume invadors status in your sector / neighbourhood

@author Nicolas Husson <hello@nusson.ninja>
</Sectiondoc>

<script>
export default {
  name: 'SectionStatus',
  components: {},
  props: {
    title:{
      type:String
    }
  },
  data(){
    return {}
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <section class="SectionStatus section">
    <h1 class="title">{{title}}</h1>
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
  .SectionStatus
    //

  //  ===DEBUG===
  .SectionStatus
    background-color rgba(red, 0.5)
    min-height 50vh
</style>

<i18n>
{
  "en": {
    "title":"Invador status"
  },
  "fr": {
    "title":"Status section"
  }
}
</i18n>
