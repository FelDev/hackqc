<doc>
# PageAbout
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
export default {
  name: 'PageAbout',
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
  <main class="PageAbout">
    <h1 class="title" v-t="'title'" />
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

  //  ===DEBUG===
</style>

<i18n>
{
  "en": {
    "title":"About page"
  },
  "fr": {
    "title":"A-propos"
  }
}
</i18n>
