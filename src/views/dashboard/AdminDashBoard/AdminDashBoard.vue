<template>
  <!-- 这个是最外层的用于设置是否需要默认padding 如果想要padding 但不是默认padding的话 那就再包一层  -->
  <div class="admin-dashboard no-padding">
    <GitHubCorner class="github-corner" />
    <div class="dashboard-wrapper">
      <PanelGroup />
      <ChartBarLine
        :chart-data="lineChartData"
        class="chart"
      />
      <div class="various-charts">
        <ChartPie
          :chart-data="chartDataSet.pieChart"
          class="chart"
        ></ChartPie>
        <ChartSunBurst
          :chart-data="chartDataSet.sunBurstChart"
          class="chart"
        ></ChartSunBurst>
        <ChartTree
          :chart-data="chartDataSet.treeChart"
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

import { transactionList } from '@/network/remote-search';

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
      chartDataSet: {
        treeChart: [
          {
            name: 'Front End',
            children: [
              {
                name: 'HTML',
                children: [
                  {
                    name: 'Jade',
                    value: 5,
                  },
                  {
                    name: 'Pug',
                    value: 5,
                  },
                ],
              },
              {
                name: 'CSS',
                children: [
                  {
                    name: 'Sass',
                    value: 10,
                  },
                  {
                    name: 'Less',
                    value: 10,
                  },
                  {
                    name: 'Stylus',
                    value: 10,
                  },
                  {
                    name: 'Scss',
                    value: 10,
                  },
                ],
              },
              {
                name: 'JavaScript',
                children: [
                  {
                    name: 'ECMA Script',
                  },
                  {
                    name: 'AJAX',
                    children: [
                      {
                        name: 'Axios',
                        value: 5,
                      },
                    ],
                  },
                  {
                    name: 'Vue',
                    children: [
                      {
                        name: 'Vue-Router',
                        value: 10,
                      },
                      {
                        name: 'VueX',
                        value: 10,
                      },
                      {
                        name: 'ElementUI',
                        value: 20,
                      },
                      {
                        name: 'Vant',
                        value: 20,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        lineChart: {
          peoples: {
            expectedData: [100, 120, 161, 134, 105, 160, 165, 100, 150, 180],
            actualData: [120, 82, 91, 154, 162, 140, 145, 120, 90, 130],
          },
          message: {
            expectedData: [200, 192, 120, 144, 160, 130, 140, 100, 120, 161],
            actualData: [180, 160, 151, 106, 145, 150, 130, 130, 140, 100],
          },
          money: {
            expectedData: [80, 100, 121, 104, 105, 90, 100, 142, 130, 130],
            actualData: [120, 90, 100, 138, 142, 130, 130, 105, 90, 100],
          },
          shopping: {
            expectedData: [130, 140, 141, 142, 145, 150, 160, 90, 100, 142],
            actualData: [120, 82, 91, 154, 162, 140, 130, 145, 150, 160],
          },
        },
        pieChart: [
          {
            value: 320,
            name: 'Industries',
            itemStyle: { color: '#5470C6' },
            label: { color: '#5470C6' },
          },
          {
            value: 240,
            name: 'Technology',
            itemStyle: { color: '#91CC75' },
            label: { color: '#91CC75' },
          },
          {
            value: 150,
            name: 'Forex',
            itemStyle: { color: '#FAC858' },
            label: { color: '#FAC858' },
          },
          {
            value: 100,
            name: 'Science',
            itemStyle: { color: '#EE6666' },
            label: { color: '#EE6666' },
          },
          {
            value: 80,
            name: 'Biology',
            itemStyle: { color: '#3BA272' },
            label: { color: '#3BA272' },
          },
          {
            value: 80,
            name: 'Physical',
            itemStyle: { color: '#2EC7C9' },
            label: { color: '#2EC7C9' },
          },
        ],
        sunBurstChart: [
          {
            name: 'Front End',
            children: [
              {
                name: 'HTML',
                value: 5,
                children: [
                  {
                    name: 'Jade',
                    name: 3,
                  },
                ],
              },
              {
                name: 'CSS',
                value: 15,
                children: [
                  {
                    name: 'Sass',
                    value: 5,
                  },
                  {
                    name: 'Less',
                    value: 5,
                  },
                  {
                    name: 'Stylus',
                    value: 5,
                  },
                ],
              },
              {
                name: 'JS',
                value: 30,
                children: [
                  {
                    name: 'AJAX',
                    children: [
                      {
                        name: 'Axios',
                        value: 5,
                      },
                    ],
                  },
                  {
                    name: 'ECMA Script',
                    value: 10,
                    children: [
                      {
                        name: 'ES6',
                        value: 8,
                      },
                    ],
                  },
                  {
                    name: 'Vue',
                    value: 15,
                    children: [
                      {
                        name: 'ElementUI',
                        value: 5,
                      },
                      {
                        name: 'VAnt',
                        value: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      transactionData: [],
    };
  },
  computed: {
    lineChartData() {
      return this.chartDataSet.lineChart[this.activeItem.class];
    },
  },
  created() {
    transactionList().then((response) => {
      let { items } = response.data;
      this.transactionData = items.slice(-8);
      this.transactionData.forEach((item) => {
        item.price = `¥ ${item.price}`;
      });
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
      width: 31.5%;
      background-color: #fff;
      height: 320px;
    }
  }
  .dashboard-bottom {
    margin-top: 30px;
  }
  // 避免闪屏
  .chart{
    overflow: hidden;
  }
}
</style>
//亲人 爱人 朋友