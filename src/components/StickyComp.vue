<template>
  <div :style="wrapperStyle">
    <div :style="innerStyle">
      <!-- 然后这里才是真正的内容 不会添加任何样式 但因为它的父元素可能设置定位 所以如果原本为绝对定位的话 包含块 -->
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StickyComp',
  props: {
    stickyTop: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      position: '',
      width: '',
      height: '',
      isSticky: false,
    };
  },
  computed: {
    wrapperStyle() {
      // 不能设置宽度是因为 需要通过根元素动态获取宽度然后设置给固定定位的元素
      let { height } = this;
      return {
        height:height,
      };
    },
    innerStyle() {
      let { isSticky, stickyTop, zIndex, position, width, height } = this;
      return {
        top: isSticky ? stickyTop + 'px' : '',
        zIndex: isSticky ? zIndex : '',
        position: position,
        width: width,
      };
    },
  },
  mounted() {
    // 监听滚动和resize
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  activated() {
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    sticky() {
      if (!this.isSticky) {
        let { width,height } = this.$el.getBoundingClientRect();
        // 如果内容区设置了宽度的话不受影响 否则为'auto'因为改变了包含块 所以要同步前包含块的宽度给后包含块
        this.width = width + 'px';
        // 设置骨架的内联高度
        this.height = height + 'px';
        this.position = 'fixed';
        this.isSticky = true;
      }
    },
    reset() {
      this.position = '';
      this.width = '';
      this.height = '';
      this.isSticky = false;
    },
    handleScroll(e) {
      // 为什么宽度就要每次都重新获取呢?
      const { top } = this.$el.getBoundingClientRect();
      top <= this.stickyTop ? this.sticky() : this.reset();
    },
    handleResize() {
      // 需要同步
      if (this.isSticky) {
        const { width } = this.$el.getBoundingClientRect();
        this.width = width + 'px';
      }
    },
  },
};
</script>
