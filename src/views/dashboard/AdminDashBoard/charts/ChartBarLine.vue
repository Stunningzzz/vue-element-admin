<template>
  <div  class="chart-bar-line" />
</template>

<script>
import chartMixin from './charmixin.js';

export default {
  name: 'ChartBarLine',
  mixins: [chartMixin],
  methods: {
    setOptions() {
      let { expectedData, actualData } = this.chartData;
      let sellAmount = Array(expectedData.length);
      for (let i = 0; i < expectedData.length; i++) {
        sellAmount[i] = Math.max(expectedData[i], actualData[i]) * 10;
      }

      this.chart.setOption({
        xAxis: {
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
          ],
          boundaryGap: true,
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '销量',
            axisLabel: {
              formatter: '{value} 件',
            },
          },
          {
            type: 'value',
            name: '销售额',
            axisLabel: {
              formatter: '{value} 万元',
            },
          },
        ],
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          padding: [5, 10],
          backgroundColor: '#fff',
        },
        legend: {
          data: ['expected', 'actual', 'sellamount'],
        },
        emphasis: {
          focus: 'series',
        },

        series: [
          {
            name: 'expected',
            itemStyle: {
              color: '#5EE1C6',
            },
            areaStyle: {
              color: '#5EE1C6',
            },

            type: 'bar',
            data: expectedData,
            animationDuration: 2000,
            animationEasing: 'cubicInOut',
            // animationDurationUpdate:1000,// 数据更新时(不包括resize)的重绘时间
          },
          {
            name: 'actual',
            type: 'bar',
            itemStyle: {
              color: '#5CC0E3',
            },

            areaStyle: {
              color: '#5CC0E3',
            },

            data: actualData,
            animationDuration: 2000,
            animationEasing: 'quadraticOut',
            // animationDurationUpdate:1000,
          },
          {
            name: 'sellamount',
            type: 'line',
            itemStyle: {
              color: '#5470C6',
            },
            yAxisIndex: 1,
            smooth: false,
            data: sellAmount,
            animationDuration: this.animationDuration,
            animationEasing: 'quadraticOut',
            // animationDurationUpdate:1000,
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-bar-line {
  height: 350px;
  background-color: #fff;
  margin-top: 30px;
  padding-top: 20px;
}
</style>
