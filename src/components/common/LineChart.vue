<template>
  <div style="width:100vh;height:100vh">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'LineChart',
  data() {
    return {
      lineChart: {},
    };
  },
  mounted() {
    this.lineChart = echarts.init(this.$el);
    this.setOption();
    // 一个网页中可以创建多个 echarts 实例。每个 echarts 实例 中可以创建
    // 多个图表和坐标系等等（用 option 来描述）。准备一个 DOM 节点（作为 echarts 的渲染容器），
    // 就可以在上面创建一个 echarts 实例。每个 echarts 实例独占一个 DOM 节点。

    // 系列（series）是很常见的名词。在 echarts 里，系列（series）是指：一组数值以及他们映射成的图。
    // “系列”这个词原本可能来源于“一系列的数据”，而在 echarts 中取其扩展的概念，不仅表示数据，
    // 也表示数据映射成为的图。所以，一个 系列 包含的要素至少有：一组数值、图表类型（series.type）、
    // 以及其他的关于这些数据如何映射成图的参数。

    // echarts 里系列类型（series.type）就是图表类型。系列类型（series.type）
    // 至少有：line（折线图）、bar（柱状图）、pie（饼图）、scatter（散点图）、graph（关系图）、tree（树图）、...

    // 如下图，右侧的 option 中声明了三个 系列（series）：pie（饼图系列）、
    // line（折线图系列）、bar（柱状图系列），每个系列中有他所需要的数据（series.data）。
  },
  methods: {
    setOption() {
      this.lineChart.setOption({
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: '售价',
            type: 'line',
            data: [3, 10, 50, 21, 35, 22],
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