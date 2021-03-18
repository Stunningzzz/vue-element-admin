<template>
  <h2>
    <el-tooltip content="avcdasd">
      <Child :key.sync="key" />
    </el-tooltip>
  </h2>
</template>

<script>
import Child from './Child';
export default {
  name: 'Permission',
  components: {
    Child,
  },
  data() {
    return {
      key: 0,
    };
  },
  methods: {
    click() {
      this.key++;
    },
  },
};
</script>

<style lang='scss' scoped>
.display-enter-active,
.display-leave-active {
  transition: all 0.5s;
}
.display-enter,
.display-leave-to {
  opacity: 0.1;
}
</style>
//亲人 爱人 朋友