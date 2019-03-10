<template>
  <div class="component">
    <pre>
      {{debug}}
    </pre>
    <!-- <pre>
      {{dateRangeMs}}
      {{(dateRangeMs/SECOND_TO_DAYS)}}
      {{(dateRangeMs/SECOND_TO_WEEK)}}
      {{(dateRangeMs/SECOND_TO_MONTH)}}
      {{(dateRangeMs/SECOND_TO_YEAR)}}
      {{(dateRangeMs/timeRange)}}

    </pre> -->
    <header class="header">
      <h3 class="title">Tendances</h3>
      <p class="dates" v-text="`du ${formatUnixDate(firstDate)} au ${formatUnixDate(lastDate)}`" />
    </header>
    <div class="TheChart">
      <ul class="axis -y">
        <li v-for="(item, index) in axis.y" :key="`y-${index}`" class="data" v-text="item" />
      </ul>
      <ul class="axis -x">
        <li v-for="(item, index) in axis.x" :key="`x-${index}`" class="data" v-text="item" />
      </ul>
      <trend
        class="chart"
        ref="Trend"
        :data="chartData"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth>
      </trend>
      <div class="cursorWrapper" ref="CursorWrapper">
        <div class="cursor" ref="Cursor" :style="{width:`${cursorWidth}px`}" />
      </div>

      <!-- <GChart type="LineChart" :data="chartData" :options="chartOptions"/> -->
    </div>
    <div class="ranges">
      <button class="range -day" @click.prevent="timeRange=SECOND_TO_DAYS">Days</button>
      <button class="range -week" @click.prevent="timeRange=SECOND_TO_WEEK">Semaines</button>
      <button class="range -month" @click.prevent="timeRange=SECOND_TO_MONTH">Mois</button>
      <button class="range -year" @click.prevent="timeRange=SECOND_TO_YEAR">Année</button>
    </div>
  </div>
</template>

<script>
import { isEmpty, min, max, first, last, map, filter } from "lodash";
import moment from 'moment'
// import { GChart } from "vue-google-charts";
import Vue from 'vue';
import Trend from 'vuetrend';
import {mapGetters} from 'vuex'
import Draggable from 'gsapUtils/Draggable'
Vue.use(Trend);

const SECOND_TO_DAYS = 86400 
const SECOND_TO_WEEK = 604800 
const SECOND_TO_MONTH = (SECOND_TO_DAYS*30) 
const SECOND_TO_YEAR = (SECOND_TO_DAYS*365) 

window.moment = moment
export default {
  name: "Chart",
  // components: {
  //   GChart
  // },
  props: {
    minDate: null,
    maxDate: null,
    donnee: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      SECOND_TO_DAYS,
      SECOND_TO_WEEK,
      SECOND_TO_MONTH,
      SECOND_TO_YEAR,
      cursorWrapperWidth:0,
      timeRange:SECOND_TO_DAYS,
      datas:[],
      selectedDate: null,
      chartData: [],
      chartDates: [],
      chartOptions: {}
    };
  },
  computed:{
    ...mapGetters({
      viewport: 'Interface/viewport'
    }),
    cursorWidth(){
      
      const a = this.cursorWrapperWidth / (this.dateRangeMs/this.timeRange)
      console.log(this.cursorWrapperWidth, this.dateRangeMs, this.timeRange, (this.dateRangeMs/this.timeRange), a);
      return a
    },
    firstDate(){
      return min(this.chartDates || [])
    },
    lastDate(){
      return max(this.chartDates || [])
    },
    axis(){
      let empty = isEmpty(this.chartData)
      if(isEmpty(this.chartData)){
        return {
          x:[],
          y:[]
        }
      }
      
      const someDates = [
        this.firstDate,
        moment.unix(this.firstDate).add(this.convertPercentToMs(0.5)),
        moment.unix(this.firstDate).add(this.convertPercentToMs(0.5)),
        moment.unix(this.firstDate).add(this.convertPercentToMs(0.5)),
        this.lastDate
      ]//, date=>moment.unix(date).format('DD/MM/YY')

      const middle = moment.unix(this.firstDate).add(this.convertPercentToMs(0.5))
      someDates.push(this.chartDates[middle])
      someDates.push(this.chartDates[Math.round(middle/2)])
      someDates.push(this.chartDates[Math.round(middle + (middle/2))])
      someDates.push(last(this.chartDates))
      return {
        x: map(someDates, date=>moment.unix(date).format('DD/MM/YY')),
        // x: someDates,
        y: [max(this.chartData), min(this.chartData)],
      }
    },
    dateRangeMs(){
      if(this.chartDates.length < 2) return 0
      return last(this.chartDates) - first(this.chartDates)
    },
    debug(){
      const diff = this.lastDate-this.firstDate;

      return {
        first:this.firstDate,
        last:this.lastDate,
        diff,
        dateRangeMs:this.dateRangeMs,
        w:diff/SECOND_TO_WEEK,
        m:diff/SECOND_TO_MONTH,
        d:diff/SECOND_TO_DAYS,
        y:diff/SECOND_TO_YEAR,
        CURRENT:(diff/this.timeRange),
        timeRange:this.timeRange,
        mf:this.formatUnixDate(this.firstDate),
        me:this.formatUnixDate(this.lastDate)
      }
    }
  },
  mounted() {
    // const tl = new TimelineMax()
    //   .to(this.$refs.Cursor, 1, {x:(this.viewport.width-60)})
    this.$watch('viewport', ({width})=>{
      if(!width) return
      console.log({width});
      this.cursorWrapperWidth = width - 40
    }, {immediate:true})

    const draggable = Draggable.create(this.$refs.Cursor, {
      type:"x",
      edgeResistance:0.65,
      bounds:this.$refs.CursorWrapper,
      lockAxis:true,
      throwProps:true,
      snap: {
        x: function(endValue) {
          return Math.round(endValue / gridWidth) * gridWidth;
        },
        y: function(endValue) {
          return Math.round(endValue / gridHeight) * gridHeight;
        }
      },
      // onDrag:(event)=>{
      //   let {x} = draggable[0]
      //   if(x>this.cursorWrapperWidth){
      //     x = this.cursorWrapperWidth
      //   }else if(x<0){
      //     x = 0
      //   }
      //   const msPeriode = (this.dateRangeMs/this.timeRange)
      //   // console.log({event, draggable})
      //   console.log({x, cursorWrapperWidth:this.cursorWrapperWidth, cursorWidth:this.cursorWidth, msPeriode, df:this.dateRangeMs});
      //   // @todo guess witch periode is highlighted and reflect related points into the map
      // },
      onDragEnd:(event)=>{
        let {x} = draggable[0]

        const percentPosition = (()=>{
          let d = x / this.cursorWrapperWidth
          if(d > 1) return 1
          if(d < 0) return 0
          return d
        })()

        const msToAdd = this.convertPercentToMs(percentPosition)
        

        const msPeriode = (this.dateRangeMs/this.timeRange)
        // console.log({event, draggable})
        console.log('END',{x,max,percentPosition,msPeriode, df:this.dateRangeMs});
        const d = this.firstDate + (percentPosition*this.dateRangeMs)
        console.log({
          f:this.firstDate,
          mf:this.formatUnixDate(this.firstDate),
          d,
          m:this.formatUnixDate(d),
          a:moment.unix(this.firstDate).add(msToAdd, 's'),
          b:moment.unix(this.firstDate).add(msToAdd, 's').format('DD/MM/YY'),
        })

        const from = moment.unix(this.firstDate).add(msToAdd, 's').format('DD/MM/YY')
        const to = moment.unix(this.firstDate).add(msToAdd, 's').add(this.timeRange, 's').format('DD/MM/YY')
        console.log({from, to})
        // @todo guess witch periode is highlighted and reflect related points into the map
      }
    });
    
    this.$watch(
      () => {
        return this.donnee;
      },
      data => {
        if (isEmpty(data)) return [];
        
        this.chartData = []
        this.chartDates = []
        this.chartOptions = {}
        const mergedData = [];
        var average = 0;
        var dataCount = 0;

        data.forEach(singleData => {
          if (!isNaN(singleData.amount)) {
            var newDate = new Date(singleData.date);
            newDate.setHours(0, 0, 0, 0);
            // if (newDate >= new Date(this.minDate) && newDate <= new Date(this.maxDate)) {
              const msDate = moment(newDate).format('X')

              if (mergedData[msDate]) {
                mergedData[msDate] += singleData.amount;
              } else {
                mergedData[msDate] = singleData.amount;
                dataCount++;
              }

              average += singleData.amount;
            // }
          }
        });

        average /= dataCount
        var i = 0;
        for (var date in mergedData) {
          if (mergedData.hasOwnProperty(date)) {
            
            // this.chartData.push([i, mergedData[date], average]);
            this.chartData.push(mergedData[date]);
            this.chartDates.push(date);
            i++;
          }
        }

        this.chartOptions = {
          curveType: "function"
        };
      },
      { immediate: true }
    );
  },

  methods: {
    formatUnixDate(date){
      return moment.unix(date).format('DD/MM/YYYY')
    },
    convertPercentToMs(percent){
      return percent * this.dateRangeMs
    }
  }
};
</script>

<style lang="stylus" scoped>
  .cursorWrapper
    absolute top left 30px right 10px bottom
  .cursor
    background-color rgba(red, 0.4)
    absolute top left 0 bottom
    width 20px
    z-index 20
    transition width 0.4s easing('out-expo')
  .ranges
    padding 10px 20px 20px
  .TheChart
    position relative
    padding-bottom 20px
  
  .chart
    padding-left 20px

  .axis
    font-size 1rem
    &.-y
      absolute top left bottom
      flexbox(column, $justify:space-between)
      height 75%
      text-align right
      &:before
        content ''
        absolute top left 25px bottom -4px
        border-right 1px solid #2c3e50
      .data
        width 10px
    &.-x
      absolute bottom left right
      flexbox(row, $justify:space-between)
      width 90%
      margin 0 7%
      text-align center
      &:before
        content ''
        absolute right -5% left -1px bottom 23px
        border-top 1px solid #2c3e50
      .data
        height 20px
        
  .title
    padding 20px 0px 0 10px
    margin 0
    f-style(title, h3)
  .dates
    padding 0 0 10px 10px
    f-style()
    font-size 1.3rem !important
</style>
