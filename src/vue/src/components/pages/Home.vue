<doc>
# PageHome
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
import SectionStatus from 'components/sections/Status';
import SectionGraphics from 'components/sections/Graphics';

export default {
  name: 'PageHome',
  components: { SectionStatus, SectionGraphics },
  props: {},
  data(){
    return {}
  },
  mounted() {},
  methods:{}
};
</script>

<template>
  <main class="PageHome">
    <SectionStatus :title="'Alertes'"/>
    <SectionGraphics />
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


<style lang="stylus">
  //  ===NO_SCOPE===
  .PageHome
    //
</style>
