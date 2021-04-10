<template>
  <el-card class="bottom-postcard">
    <template #header>
      <img :src="headerImg">
    </template>
    <div class="user-desc">
      <div class="user-avatar">
        <!-- RotateAvatar 默认把开启定位的祖先元素的padding + width占满且为圆形-->
        <!-- 如果我把根元素设置为了relative的话就是根据根元素定位  -->
        <RotateAvatar :avatar-url="avatar" />
      </div>
      <TextHoverAnimation text="element-admin" />

    </div>
    <SkillsAdapted />
  </el-card>
</template>

<script>
import SkillsAdapted from '@/components/SkillsAdapted';
import RotateAvatar from '@/components/RotateAvatar';
import TextHoverAnimation from '@/components/TextHoverAnimation';
import { mapGetters } from 'vuex';
export default {
  name: 'BottomPostCard',
  components: {
    SkillsAdapted,
    RotateAvatar,
    TextHoverAnimation,
  },
  data() {
    return {
      headerImg:
        'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
    };
  },
  computed: {
    ...mapGetters(['avatar']),
  },
};
</script>

<style lang='scss' scoped>
::v-deep .el-card__header {
  padding: 0;
  height: 220px;
  img {
    width: 100%;
    height: 100%;
    transition: all 0.2s linear;
    &:hover {
      // 设置放大效果
      transform: scale(1.1, 1.1);
      // 设置滤镜 即提高对比度 看起来就更亮
      filter: contrast(130%);
    }
  }
}
.avatar-outer {
  width: 70px;
  height: 70px;
}
.user-desc {
  margin-top: -50px;
  .user-avatar {
    // 提高层级为了放大时能够背景颜色能盖住图片
    position: relative;
    display: inline-block;
    border-radius: 50%;
    border: 5px solid transparent;
    background-color: #fff;
    vertical-align: bottom;
    .rotate-avatar {
      height: 60px;
      width: 60px;
    }
  }
  .text-hover-animation {
    font-size: 19px;
  }
}
</style>
//亲人 爱人 朋友