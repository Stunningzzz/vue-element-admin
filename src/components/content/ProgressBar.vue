<template>
  <div class="top-progress-bar"
    v-show="$store.state.isLoading">
    <el-progress :percentage="$store.state.percentage"
      :show-text="false"
      :stroke-width="2"
      color="#2299dd"
      @transitionend.native="actionEnd"
      ref="progress"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    // 并不是每次transition结束都会调用 实际是有延迟到
    // 触发多了一次setPercentage 
    actionEnd() {
      console.log('actionEnd');
      this.$store.commit('setLoading', false);
      let preClass = this.$el.className;
      this.$el.className += ' full';
      this.$store.commit('setPercentage', 0);
      this.$nextTick(() => {
        this.$el.className = preClass;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.top-progress-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
::v-deep {
  .el-progress-bar__inner {
    transition: width .2s;
  }
  .full .el-progress-bar__inner {
    transition: none;
  }
}
</style>
//亲人 爱人 朋友