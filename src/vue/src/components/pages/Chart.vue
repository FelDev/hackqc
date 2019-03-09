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

        this.chartData = [["Date", "Amount"]];
        const mergedData = {};

        data.forEach(singleData => {
          if (singleData.amount !== "") {
            if (mergedData[singleData.date]) {
              mergedData[singleData.date] += singleData.amount;
            } else {
              mergedData[singleData.date] = singleData.amount;
            }
          }
        });

        for (var date in mergedData) {
          if (mergedData.hasOwnProperty(date)) {
            this.chartData.push([date, mergedData[date]]);
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
