<doc>
# PageHome
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
import SectionStatus from 'components/sections/Status';
import SectionGraphics from 'components/sections/Graphics';
import SectionMap from 'components/sections/Map'
import SectionAbout from 'components/sections/About';
import SectionReports from 'components/sections/Reports';

export default {
  name: 'PageHome',
  components: { SectionStatus, SectionGraphics, SectionMap, SectionAbout, SectionReports },
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
    <SectionStatus :title="'coucou'"/>
    <SectionGraphics />
    <SectionMap />
    <SectionAbout />
    <SectionReports />
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
