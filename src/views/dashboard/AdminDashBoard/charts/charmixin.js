import * as echarts from 'echarts';
import 'echarts/theme/macarons'; // echarts theme
import resize from './resize';

export default {
  props: {
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: [Array,Object],
    },
  },
  mixins:[resize],
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
    this.chart = echarts.init(this.$el,'macarons');
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
