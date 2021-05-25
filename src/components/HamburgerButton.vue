<template>
  <div
    class="hamburger-container"
    @click="burgerClick"
  >
    <div class="hamburger-line"></div>
    <div class="hamburger-line"></div>
    <div class="hamburger-line"></div>
  </div>
</template>
<script>
export default {
  name: 'HamBurgerButton',
  props: {
    defaultState: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    burgerClick() {
      if (!this.disabled) {
        let domStyle = this.$el.style;
        domStyle.transform = domStyle.transform ? '' : 'rotateZ(90deg)';
        this.$emit('burger-click');
      }
    },
  },
  mounted() {
    let domStyle = this.$el.style;
    if (this.defaultState === 'flip') {
      let temp = domStyle.transition;
      // 设置为''时应用样式表里面的效果 要覆盖得赋值none 
      domStyle.transition = 'none';
      domStyle.transform = 'rotateZ(90deg)';
      // 强制浏览器回流 应用transition效果
      this.$el.offsetTop;
      domStyle.transition = temp;
    }
  },
};
</script>
<style scoped>
.hamburger-container {
  width: 20px;
  height: 27px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
.hamburger-line {
  height: 25%;
  border-bottom: 3px solid rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}
</style>
