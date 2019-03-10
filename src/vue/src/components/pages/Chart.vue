<template>
  <div class="component">
    <header class="header">
      <h3 class="title">Tendances</h3>
      <p class="dates" v-text="`du ${selectedRange.from} au ${selectedRange.to}`" />
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
  props: {
    minDate: null,
    maxDate: null,
    donnee: {
      type: Array,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      SECOND_TO_DAYS,
      SECOND_TO_WEEK,
      SECOND_TO_MONTH,
      SECOND_TO_YEAR,
      cursorWrapperWidth:0,
      timeRange:SECOND_TO_WEEK,
      datas:[],
      selectedDate: null,
      chartData: [],
      chartDates: [],
      chartOptions: {},
      selectedRange:{
        from:null,
        to:null,
      }
    };
  },
  computed:{
    ...mapGetters({
      viewport: 'Interface/viewport'
    }),
    cursorWidth(){
      return this.cursorWrapperWidth / (this.dateRangeMs/this.timeRange)
    },
    firstDate(){
      return min(this.chartDates)
    },
    lastDate(){
      return max(this.chartDates)
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
        moment.unix(this.firstDate.toString()),
        moment.unix(this.firstDate.toString()).add(this.convertPercentToMs(0.25, 's')),
        moment.unix(this.firstDate.toString()).add(this.convertPercentToMs(0.5, 's')),
        moment.unix(this.firstDate.toString()).add(this.convertPercentToMs(0.75, 's')),
        moment.unix(this.lastDate.toString())
      ]
      return {
        x: map(someDates, date=>date.format('DD/MM/YY')),
        y: [max(this.chartData), min(this.chartData)],
      }
    },
    dateRangeMs(){
      if(this.chartDates.length < 2) return 0
      return last(this.chartDates) - first(this.chartDates)
    },
  },
  mounted() {
    // const tl = new TimelineMax()
    //   .to(this.$refs.Cursor, 1, {x:(this.viewport.width-60)})
    this.$watch('viewport', ({width})=>{
      if(!width) return
      this.cursorWrapperWidth = width - 40
    }, {immediate:true})

    this.$watch('chartDates', (chartDates)=>{
      if(isEmpty(chartDates)) return
      this.$nextTick(this.createDraggable.bind(this))
    }, {immediate:true})

    // updateRangeDate()
    
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
      return percent * this.dateRangeMs * 1000
    },
    createDraggable(){
      let draggable = null
      const updateRangeDate = (event)=>{
        let {x} = draggable[0] || {x:0}
        
        const percentPosition = (()=>{
          let d = x / this.cursorWrapperWidth
          if(d > 1) return 1
          if(d < 0) return 0
          return d
        })()

        const msToAdd = this.convertPercentToMs(percentPosition)
        this.selectedRange = {
          from: moment.unix(this.firstDate.toString()).add(msToAdd, 'ms').format('DD/MM/YY'),
          to: moment.unix(this.firstDate.toString()).add(msToAdd, 'ms').add(this.timeRange, 's').format('DD/MM/YY')
        }
      }
      draggable = Draggable.create(this.$refs.Cursor, {
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
        onDrag:updateRangeDate.bind(this),
        onDragInit:updateRangeDate.bind(this),
        onDragEnd:updateRangeDate.bind(this)
      });

      this.$nextTick(updateRangeDate.bind(this))
    }
  }
};
</script>

<style lang="stylus" scoped>
  .cursorWrapper
    absolute top left 30px right 10px bottom
    // background-color rgba(blue, 0.2)
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
        margin-left 5px
    &.-x
      absolute bottom left 30px right 10px
      flexbox(row, $justify:space-between)
      text-align center
      // background-color rgba(yellow, 0.2)
      &:before
        content ''
        absolute right left bottom 23px
        border-top 1px solid #2c3e50
      .data
        height 20px
        position relative
        &:before
          content '|'
          absolute top -50% left 50%
          transform translateX(-50%)
        &:nth-child(1)
          transform translateX(-50%)
        &:nth-child(2)
          transform translateX(-25%)
        &:nth-child(3)
          transform translateX(0%)
        &:nth-child(4)
          transform translateX(25%)
        &:nth-child(5)
          transform translateX(50%)
        
  .title
    padding 20px 0px 0 10px
    margin 0
    f-style(title, h2)
  .dates
    padding 0 0 10px 10px
    f-style()
    font-size 1.3rem !important
</style>
