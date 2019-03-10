<docs>
# PageInfoSingle
> A single news page

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
// import UiPicture from 'components/ui/Picture';
// import PageBuilder from 'components/builder';
// import Store from './store';
import UiPicture from "components/ui/Picture";
import GoogleMap from "components/pages/GoogleMap";
import Chart from "components/pages/Chart";
import { mapGetters } from "vuex";
import moment from 'moment'
import { map, filter } from 'lodash'

import { Scene } from 'ScrollMagic';

export default {
  name: "PageInfoSingle",
  // components: { UiPicture, PageBuilder },
  components: {
    UiPicture,
    GoogleMap,
    Chart
  },
  computed: {
    // Check in src/store/modules/Informations
    ...mapGetters({
      data: "Informations/data",
      page: "Informations/page"
    }),
    slug() {
      return this.$route.params.slug;
    }
  },
  data() {
    return {
      predictedStartDate:null,
      isOnViewport:false,
      renderMap: false,
      dateRange: [],
      minDateB: "2018-01-12T00:00:00-05:00",
      maxDateB: "2018-08-12T00:00:00-04:00",
      // minDate: "2018-03-10T10:41:26",
      // maxDate: "2019-03-10T10:41:26"
      minDate: "2018-01-12T10:41:26",
      maxDate: "2019-08-12T10:41:26"
    };
  },
  watch: {
    /** watch slug from route to load datas
     * Note that we may stay on the same component within some other slug
     */
    slug: {
      handler(slug) {
        if (!slug) {
        }
        this.$store.dispatch("Informations/LOAD", slug);
      },
      immediate: true
    }
  },
  mounted(){
    this.$refs.Chart.$watch('selectedRange', (range)=>{
      this.dateRange = map(range, date=>{
        return moment(date, 'DD/MM/YY').format('YYYY-MM-DDTh:mm:ss')
      })
      // this.renderMap = false
      // this.$nextTick(()=>{
      //   this.renderMap = true
      // })
    })
    this.initScrollMagic()

    this.$watch('data', item=>{
      let firstItemPredicted =  filter(item, data=>data.predicted)[0]
      console.log('firstItemPredicted', firstItemPredicted);
      if(firstItemPredicted){
        this.predictedStartDate = moment(firstItemPredicted.date).format('X')
      }
    })
  },
  methods:{
    initScrollMagic(){
      const scene = new Scene({
        triggerElement: this.$refs.ChartWrapper,
        triggerHook: 1,
      })
      .addIndicators()
      .on('enter', ()=>{
        this.isOnViewport = true
      })
      .on('leave', ()=>{
        this.isOnViewport = false
      })
      // scene.addTo(controller);
      this.$store.dispatch('ScrollMagic/ADD_SCENE', { scene, indicators: false });

    }
  }
};
</script>


<template>
  <main class="PageInfoSingle">
    <section id="top">
      <header class="header">
        <UiPicture class="picture" :src="page.image" cover="cover" :full="true" :overlay="true"/>
        <h1 v-text="page.title" class="title"/>
      </header>
      <div class="content" v-html="page.description"/>
    </section>
    <section id="bottom-no-bg">
      <GoogleMap :minDate="dateRange[0]" :maxDate="dateRange[1]" :donnee="data" v-if="dateRange"/>
      <div ref="ChartWrapper">
        <Chart :predictedStartDate="predictedStartDate" :display="isOnViewport" :minDate="minDate" :maxDate="maxDate" :donnee="data" ref="Chart"/>
      </div>
    </section>
    <a class="button" :href="page.contact">Ressources en cas d'infestation</a>
  </main>
</template>

<style lang="stylus" scoped>
.PageInfoSingle
  background-color #fff
.header {
  ratio-box((16 / 9));
  position: relative;

  .title {
    absolute: bottom 20px left 20px;
    f-style(title, h1);
    background-color : #ffffff
    z-index: 10;
  }
}

.button{
  display: inline-block;
    display: inline-block;
    margin-top: 20px;
    border: 2px solid red;
    color: red;
    padding: 10px 20px;
    background-color : #ffffff
    margin-left : 1em
}
.content {
  padding: 20px;
  line-height: 1.4;

  >>> ul {
    list-style: outside disc;
    margin-left: 20px;
  }

  >>> h2 {
    f-style(title, h2);
    margin-top: 20px;
  }

  >>> h3 {
    f-style(title, h3);
    margin-top: 10px;
  }

  >>> a {
    display: inline-block;
    margin-top: 20px;
    border: 2px solid red;
    color: red;
    padding: 10px 20px;
  }
}

#top {
  background: white;
}

// #middle {
//   background: #112;
//   display: flex;

//   h1 {
//     color: red;
//     flex-grow: 2;
//   }

//   .d3Graph {
//     flex-grow: 8;
//     border: 2px solid black;
//     border-radius: 1em;
//   }
// }

// #bottom {
//   background: #123;
// }

#middle {
  background: #112;
  display: flex;

  h1 {
    color: red;
    flex-grow: 2;
  }

  .d3Graph {
    flex-grow: 8;
    border: 2px solid black;
    border-radius: 1em;
  }
}

#bottom {
  background: #123;
}

.picture {
  // ratio-box(16/9)
  // width: 50%;
}

/**
 * TABLE OF CONTENT
 * --------
 *  - LAYOUT
 *  - DEBUG
 *  - NO_SCOPE
 */
</style>

<i18n>
{
  "fr": {
    "statsTitle": "Statistiques",
    "mapTitle": "Près de chez vous"
  }
}
</i18n>
