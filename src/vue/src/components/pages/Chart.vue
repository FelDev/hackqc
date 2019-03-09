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
    donnee: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
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

        data.forEach(singleData => {
          if (!isNaN(singleData.amount)) {
            if (mergedData[singleData.date]) {
              mergedData[singleData.date] += singleData.amount;
            } else {
              mergedData[singleData.date] = singleData.amount;
            }

            average += singleData.amount;
          }
        });

        average /= 31;

        for (var date in mergedData) {
          if (mergedData.hasOwnProperty(date)) {
            this.chartData.push([date, mergedData[date], average]);
          }
        }

        this.chartOptions = {
          curveType: "function",
        };
      },
      { immediate: true }
    );
  },

  methods: {}
};
</script>
