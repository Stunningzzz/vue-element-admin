<template>
  <div class="header-fullscreen">
    <el-tooltip
      :content="tooltipConent"
      placement="bottom"
      :key="tooltipConent"
    >
      <!-- 加了key就不会看到切换文字了 -->
      <svg-icon
        :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"
        @click="click"
      />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'HeaderRightFullScreen',
  data() {
    return {
      isFullscreen: false,
      tooltipConent: '全屏',
    };
  },
  mounted() {
    screenfull.on('change', this.handleChange);
  },
  beforeDestroyed() {
    screenfull.off('change', this.handleChange);
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning',
        });
        return false;
      }
      screenfull.toggle();
      // 注意 并不是调用完toggle后其isFullscreen的值就立即改变
      // 当isFullscreen的值改变的时候会触发change事件 所以需要监听change事件并
    },
    handleChange() {
      this.isFullscreen = screenfull.isFullscreen;
      this.tooltipConent = this.isFullscreen ? '退出全屏' : '全屏';
    },
  },
};
</script>
<style lang="scss" scoped>
</style>