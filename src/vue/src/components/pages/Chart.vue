<template>
  <div>
    <GChart type="LineChart" :data="chartData" :options="chartOptions"/>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import { GChart } from "vue-google-charts";

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
      selectedDate: null,
      chartData: [],
      chartOptions: {}
    };
  },

  mounted() {
    this.$watch(
      () => {
        return this.donnee;
      },
      data => {
        if (isEmpty(data)) return;

        this.chartData = [["Date", "Amount", "Moyenne"]];
        const mergedData = {};
        var average = 0;
        var dataCount = 0;

        data.forEach(singleData => {
          if (!isNaN(singleData.amount)) {
            var newDate = new Date(singleData.date);
            newDate.setHours(0, 0, 0, 0);
            if (newDate >= new Date(this.minDate) && newDate <= new Date(this.maxDate)) {
              if (mergedData[newDate.toString()]) {
                mergedData[newDate.toString()] += singleData.amount;
              } else {
                mergedData[newDate.toString()] = singleData.amount;
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
            // date
            this.chartData.push([i, mergedData[date], average]);
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
