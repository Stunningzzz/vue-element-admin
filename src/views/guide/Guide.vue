<template>
  <div class="app-container">
    <aside>
      The guide page is useful for some people who entered the project for the first time. You can briefly introduce the
      features of the project. Demo is based on
      <a
        href="https://github.com/kamranahmedse/driver.js"
        target="_blank"
      >driver.js.</a>
    </aside>
    <el-button
      icon="el-icon-question"
      type="primary"
      @click.prevent.stop="guide"
    >
      Show Guide
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js'; // import driver.js
import 'driver.js/dist/driver.min.css'; // import driver.js css
import steps from './steps';

export default {
  name: 'Guide',
  data() {
    return {
      driver: null,
    };
  },
  mounted() {
    this.driver = new Driver({
      onDeselected(ele) {
        ele.stackNode?.classList.toggle('driver-top');
      },
      onHighlighted(ele) {
        // 首先driver.js通过给所有父元素添加.driver-fix-stacking类防止出现层叠元素
        // 且定位是通过 z-index:auto 防止的
        // 但是 position:fixed 和 position:sticky 即使是z-index:auto的情况下也会出现新的层叠上下文
        // 所以要从当前节点往上搜索 如果有position:fixed或sticky的话 将其z-Index设置为1000004
        let node = ele.node;
        // 什么时候退出? node为document.body时 以及 node.position
        while (
          node !== document.body &&
          !['fixed', 'sticky'].includes(getComputedStyle(node).position)
        ) {
          node = node.parentNode;
        }
        if (node !== document.body) {
          ele.stackNode = node;
          node.classList.toggle('driver-top');
        }
      },
    });
  },
  beforeDestroy() {},
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    },
  },
};
</script>
