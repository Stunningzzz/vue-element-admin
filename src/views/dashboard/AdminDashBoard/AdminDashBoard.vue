<template>
  <!-- 这个是最外层的用于设置是否需要默认padding 如果想要padding 但不是默认padding的话 那就再包一层  -->
  <div class="admin-dashboard no-padding">
    <GitHubCorner class="github-corner" />
    <div class="dashboard-wrapper">
      <div v-loading="!lineChartData">
        <PanelGroup :panel-group-items="panelGroupItems" />
        <ChartBarLine
          :chart-data="lineChartData"
          class="chart"
        />
      </div>

      <div class="various-charts">
        <ChartPie
          :chart-data="pieChart"
          class="chart"
        ></ChartPie>
        <ChartSunBurst
          :chart-data="sunBurstChart"
          class="chart"
        ></ChartSunBurst>
        <ChartTree
          :chart-data="treeChart"
          class="chart"
        ></ChartTree>
      </div>
      <el-row
        :gutter="10"
        class="dashboard-bottom"
      >
        <el-col :span="12">
          <BottomTransactionTable :transaction-data="transactionData" />
        </el-col>
        <el-col :span="6">
          <BottomTodoList />
        </el-col>
        <el-col :span="6">
          <BottomPostCard />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GitHubCorner from '@/components/common/GitHubCorner';
import PanelGroup from './PanelGroup';
import ChartBarLine from './charts/ChartBarLine';
import ChartPie from './charts/ChartPie';
import ChartSunBurst from './charts/ChartSunBurst';
import ChartTree from './charts/ChartTree';
import BottomTransactionTable from './BottomTransactionTable';
import BottomTodoList from './bottomtodolist/index';
import BottomPostCard from './BottomPostCard';

import {
  transactionList as getTransactionList,
  treeChart as getTreeChart,
  barLineChart as getBarLineChart,
  pieChart as getPieChart,
  subBurstChart as getSubBurstChart,
} from '@/network/dashboard';

export default {
  name: 'AdminDashBoard',
  components: {
    GitHubCorner,
    PanelGroup,
    ChartBarLine,
    ChartPie,
    ChartSunBurst,
    ChartTree,
    BottomTransactionTable,
    BottomTodoList,
    BottomPostCard,
  },
  provide() {
    return {
      activeItem: this.activeItem,
    };
  },
  data() {
    return {
      activeItem: {
        class: 'peoples',
      },
      barLineChart: null,
      pieChart: null,
      sunBurstChart: null,
      treeChart: null,
      transactionData: null,
      panelGroupItems: null,
    };
  },
  computed: {
    lineChartData() {
      return this.barLineChart?.[this.activeItem.class];
    },
  },
  async created() {
    let transactionData;
    [
      { data: transactionData },
      { data: this.treeChart },
      { data: this.barLineChart },
      { data: this.pieChart },
      { data: this.sunBurstChart },
    ] = await Promise.all([
      getTransactionList(),
      getTreeChart(),
      getBarLineChart(),
      getPieChart(),
      getSubBurstChart(),
    ]);

    this.transactionData = transactionData.items.slice(-8).map((item) => ({
      ...item,
      price: `¥ ${item.price}`,
    }));

    this.panelGroupItems = Object.keys(this.barLineChart).map((key) => {
      let { itemClass, itemDesc, itemNum } = this.barLineChart[key];
      return {
        itemClass,
        itemDesc,
        itemNum,
      };
    });
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
  .various-charts {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    > div {
      width: 32.5%;
      background-color: #fff;
      height: 320px;
    }
  }
  .dashboard-bottom {
    margin-top: 30px;
  }
  // 避免闪屏
  .chart {
    overflow: hidden;
  }
}
</style>
//亲人 爱人 朋友