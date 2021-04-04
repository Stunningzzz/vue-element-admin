<template>
  <div>

  </div>
</template>

<script>
import chartMixin from './charmixin.js';

export default {
  name: 'ChartSunBurst',
  mixins: [chartMixin],
  methods: {
    setOptions() {
      this.chart.setOption({
        series: {
          type: 'sunburst',
          data: this.chartData,
          radius: ['5%', '95%'],
          label: {
            rotate: 0, // 设置文字不旋转
          },
          animationDuration: 1000,
          emphasis: {
            focus: 'descendant',
          },
        },
        visualMap: {
          type: 'continuous',
          min: 0,
          max: 50,
          left: '3%',
          inRange: {
            color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862'],
          },
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友