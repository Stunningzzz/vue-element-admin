<template>
  <!-- 绝对定位占满其父元素 -->
  <div class="rotate-avatar">
    <!-- 需要实现的是 hover不动的frame时进行动画 但因为avatar-img是绝对定位 所以被盖着的时候是hover不到
        frame的 然后如果hover整个round-avatar的话就会把 avatar-img也算上 导致有点小瑕疵 所以在这里是用一个
        单独的设置了z-index的hover-area 它也是跟img一样占满整个父元素 只是它不旋转 -->
    <div class="hover-area">
    </div>
    <div
      class="avatar-img"
      :style="{backgroundImage:`url(${avatarUrl})`}"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'RotateAvatar',
  props: {
    avatarUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.rotate-avatar{
  position: relative;
}
.hover-area,
.avatar-img {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  position: absolute;
  &:hover + .avatar-img {
    transform: rotateZ(-110deg);
  }
}
.hover-area {
  z-index: 1;
}
.avatar-img {
  background: center center/cover;
  transform-origin: 100% 50%;
  transition: all 0.3s;
}
</style>
//亲人 爱人 朋友