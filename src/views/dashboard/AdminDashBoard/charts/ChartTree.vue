<template>
  <div></div>
</template>

<script>
import chartMixin from './charmixin.js';

export default {
  name: 'ChartTree',
  mixins: [chartMixin],
  methods: {
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        series: [
          {
            name: 'Front End Type',
            type: 'tree',
            data: this.chartData,
            top: '5%',
            bottom: '5%',
            left: '20%',
            right: '20%',
            tooltip: {
              backgroundColor: '#fff',
              formatter:params => {
                return this.tooltips[params.data.name];
              }
            },
            // 圆形布局
            // layout: 'radial',

            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 10,
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
              },
            },

            // item为空心圆
            symbol: 'emptyCircle',
            // item宽度
            symbolSize: 7,
            initialTreeDepth: 3,
            //  animationDurationUpdate数据更新动画的时长
            animationDurationUpdate: 750,
            emphasis: {
              focus: 'descendant',
            },
            animationDuration: 1000,
          },
        ],
      });
    },

    getTooltips(nodes, ancestorTooltip = '') {
      let res = {};
      for (let node of nodes) {
        // 'Front End'
        let curTooltip = `${ancestorTooltip}${node.name} `;
        if (node.value) {
          curTooltip += `&nbsp;&nbsp;&nbsp;<strong>${node.value}</strong>`;
        }
        res[node.name] = curTooltip;
        curTooltip += '> ';
        if (node.children) {
          res = { ...res, ...this.getTooltips(node.children, curTooltip) };
        }
      }
      return res;
    },
  },
  created() {
    console.log(this.tooltips);
  },
  computed: {
    tooltips() {
      // 通过name来识别并拿到相应的tooltip 要保证name唯一
      return this.getTooltips(this.chartData);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友