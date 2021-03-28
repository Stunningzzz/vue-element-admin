<template>
  <!-- 这个是最外层的用于设置是否需要默认padding 如果想要padding 但不是默认padding的话 那就再包一层  -->
  <div class="admin-dashboard no-padding">
    <GitHubCorner class="github-corner" />
    <div class="dashboard-wrapper">
      <PanelGroup />
      <ChartLine :chart-data="chartData" />
    </div>
  </div>
</template>

<script>
import GitHubCorner from '@/components/common/GitHubCorner';
import PanelGroup from './PanelGroup';
import ChartLine from './ChartLine';
export default {
  name: 'AdminDashBoard',
  components: {
    GitHubCorner,
    PanelGroup,
    ChartLine,
  },
  provide() {
    return {
      activeItem:this.activeItem,
    };
  },
  data() {
    return {
      activeItem: {
        class: 'peoples',
      },
      chartDataSet: {
        peoples: {
          expectedData: [100, 120, 161, 134, 105, 160, 165],
          actualData: [120, 82, 91, 154, 162, 140, 145],
        },
        message: {
          expectedData: [200, 192, 120, 144, 160, 130, 140],
          actualData: [180, 160, 151, 106, 145, 150, 130],
        },
        money: {
          expectedData: [80, 100, 121, 104, 105, 90, 100],
          actualData: [120, 90, 100, 138, 142, 130, 130],
        },
        shopping: {
          expectedData: [130, 140, 141, 142, 145, 150, 160],
          actualData: [120, 82, 91, 154, 162, 140, 130],
        },
      },
    };
  },
  computed: {
    chartData() {
      return this.chartDataSet[this.activeItem.class];
    },
  },
};
</script>

<style lang='scss' scoped>
.admin-dashboard {
  position: relative;
  background: #f0f2f5;
  .github-corner {
    position: absolute;
    right: 0;
  }
  .dashboard-wrapper {
    padding: 40px;
  }
}
</style>
//亲人 爱人 朋友