<template>
  <div class="hamburger-container"
    @click="burgerClick">
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
      domStyle.transform = 'rotateZ(90deg)';
    }
  },
};
</script>
<style scoped>
.hamburger-container {
  width: 20px;
  height: 27px;
  transition: transform 0.3s ease-in-out;
}
.hamburger-line {
  height: 25%;
  border-bottom: 3px solid rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}
</style>
