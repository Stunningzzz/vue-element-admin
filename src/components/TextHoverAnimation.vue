<template>
  <a
    class="text-hover-animation"
    href="#"
  >
    {{ text }}
    <span
      class="top-part"
      :data-letters="text"
    />
    <span
      class="bottom-part"
      :data-letters="text"
    />
  </a>
</template>

<script>
export default {
  name: 'TextHoverAnimation',
  props: {
    text: {
      type: String,
      default: 'vue-element-admin',
    },
  },
};
</script>

<style lang="scss" scoped>
.text-hover-animation {
  color: #4dd9d5;
  font-weight: bold;
  line-height: 1;
  position: relative;
  /* 行内元素的overflow:hidden无效 */
  display: block;
  overflow: hidden;
  transition: color 0.5s 0.25s;
}
/* 如果不设置transform: translate(-100%);刚好占满内容区  transform: translate(-100%);刚好全部在左边
     transform: translate(100%);刚好全部在右边  */
.text-hover-animation::before {
  content: '';
  background-color: #3888fa;
  position: absolute;
  width: 100%;
  height: 6px;
  top: 50%;
  left: 0;
  margin-top: -3px;
  transform: translate(-100%);
  transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
}

.text-hover-animation:hover::before {
  transform: translate(100%);
}

.text-hover-animation:hover {
  /* 为了颜色不重叠 需要消失的时候颜色不过渡 出现的时候颜色过渡 */
  transition: none;
  color: transparent;
}

.text-hover-animation span::before {
  content: attr(data-letters);
  position: absolute;
  transition: transform 0.5s;
}
.text-hover-animation:hover span::before {
  /* 出现的时候加上延迟 消失的时候不加延迟为了让线和文字不重合 */
  transition-delay: 0.3s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}

.top-part {
  color: #3888fa;
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0;
  left: 0;
  overflow: hidden;
}

/* top:0 让它默认位置和父文本重合 */
.top-part::before {
  content: attr(data-letters);
  top: 0;
  left: 0;
  position: absolute;
  transform: translate(0, 100%);
}

.text-hover-animation:hover .top-part::before {
  transform: translate(0, 0);
  transition-delay: 0.3s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}

.bottom-part {
  color: #3888fa;
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
  left: 0;
  overflow: hidden;
}

/* bottom:0 让它默认位置和父文本重合 */
.bottom-part::before {
  bottom: 0;
  left: 0;
  transform: translate(0, -100%);
}

.text-hover-animation:hover .bottom-part::before {
  transform: translate(0, 0);
}
</style>