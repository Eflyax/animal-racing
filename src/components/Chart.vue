<template>
   <div>
     <apexchart 
      width="1000" 
      type="bar" :options="chartOptions" :series="series"
     >
     </apexchart>
   </div>
</template>

<script>

import ApexCharts from 'apexcharts';

export default {
  name: "Chart",
   data: function() {
      return {
        chartOptions: {
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }]
      }
    },
  methods: {
  }
};
</script>
