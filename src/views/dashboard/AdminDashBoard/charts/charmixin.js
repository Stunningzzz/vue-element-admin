import * as echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
export default {
  props: {
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Array | Object,
      // required: true,
    },
  },
  data() {
    return {
      chart: {},
      animationDuration:2800,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setOptions();
      },
    },
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons');
    this.setOptions();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
};
