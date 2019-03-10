<template>
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

    <!-- <GChart type="LineChart" :data="chartData" :options="chartOptions"/> -->
  </div>
</template>

<script>
import { isEmpty, min, max, first, last, map, filter } from "lodash";
import moment from 'moment'
import { GChart } from "vue-google-charts";
import Vue from 'vue';
import Trend from 'vuetrend';

Vue.use(Trend);

export default {
  name: "Chart",
  components: {
    GChart
  },
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
      datas:[],
      selectedDate: null,
      chartData: [],
      chartDates: [],
      chartOptions: {}
    };
  },
  computed:{
    axis(){
      let empty = isEmpty(this.chartData)
      if(isEmpty(this.chartData)){
        return {
          x:[],
          y:[]
        }
      }
      
      const someDates = [first(this.chartDates)]

      const middle = Math.round((this.chartDates.length - 1) / 2)
      someDates.push(this.chartDates[middle])
      someDates.push(this.chartDates[Math.round(middle/2)])
      someDates.push(this.chartDates[Math.round(middle + (middle/2))])
      someDates.push(last(this.chartDates))
      return {
        x: someDates,
        y: [max(this.chartData), min(this.chartData)],
      }
    }
  },
  mounted() {
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
            if (newDate >= new Date(this.minDate) && newDate <= new Date(this.maxDate)) {
              const niceDate = moment(newDate).format('DD/MM/YYYY')
              if (mergedData[niceDate]) {
                mergedData[niceDate] += singleData.amount;
              } else {
                mergedData[niceDate] = singleData.amount;
                dataCount++;
              }

              average += singleData.amount;
            }
          }
        });

        average /= dataCount

        var i = 0;
        for (var date in mergedData) {
          if (mergedData.hasOwnProperty(date)) {
            
            // this.chartData.push([i, mergedData[date], average]);
            this.chartData.push(mergedData[date]);
            this.chartDates.push(date);
            window.o = date
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

  methods: {}
};
</script>

<style lang="stylus" scoped>
  .TheChart
    position relative
    padding-bottom 20px
  
  .chart
    padding-left 10px

  .axis
    font-size 1rem
    &.-y
      absolute top left bottom
      flexbox(column, $justify:space-between)
      height 75%
      text-align right
      &:before
        content ''
        absolute top left 15px bottom -4px
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
        absolute right -5% left -11px bottom 23px
        border-top 1px solid #2c3e50
      .data
        height 20px
</style>
