<template>
  <el-main class="main">
    <RouterTransition />
  </el-main>
</template>

<script>
import RouterTransition from '@/components/content/RouterTransition';
export default {
  name: 'Main',
  components: {
    RouterTransition,
  },
};
</script>

<style lang='scss' scoped>
// 默认的overflow是auto 这会导致在main里面生成滚动条
.el-main {
  overflow: visible;
}
</style>
//亲人 爱人 朋友