<template>
  <div class="chart-pie">

  </div>
</template>

<script>
import chartMixin from './charmixin.js';
export default {
  name: 'ChartPie',
  mixins: [chartMixin],
  methods: {
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: '#fff',
        },
        legend: {
          left: 'center',
          bottom: '1%',
          icon: 'circle',
        },
        
        series: [
          {
            name: 'Weekly Write Articles',
            type: 'pie',
            radius: ['6%', '65%'],
            center: ['50%', '40%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: true,
            },
            animationDuration: 1000,
            data: this.chartData,
          },
        ],
      });
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
//亲人 爱人 朋友