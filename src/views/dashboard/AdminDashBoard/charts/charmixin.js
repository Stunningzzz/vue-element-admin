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
      type: [Array, Object],
    },
  },
  mixins: [resize],
  data() {
    return {
      chart: {},
      animationDuration: 2800,
      loading:null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(newVal) {
        // if (newVal) {
        //   this.chart.hideLoading();
        //   this.setOptions();
        // } else {
        //   this.chart.showLoading();
        // }
        if (newVal) {
          this.loading.close();
          this.setOptions()
        }
      },
    },
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons');
    // this.chart.showLoading();

    this.loading = this.$loading({
      target:this.$el,
      fullScreen:false,
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
};
