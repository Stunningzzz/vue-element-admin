<template>
  <el-card header="Abotu me">
    <div class="about-top text-muted">
      <div class="round-avatar">
        <!-- 需要实现的是 hover不动的frame时进行动画 但因为avatar-img是绝对定位 所以被盖着的时候是hover不到
        frame的 然后如果hover整个round-avatar的话就会把 avatar-img也算上 导致有点小瑕疵 所以在这里是用一个
        单独的设置了z-index的hover-area 它也是跟img一样占满整个父元素 只是它不旋转 -->
        <div class="avatar-frame">
          Hello {{user.roles[0]}}
        </div>
        <div class="hover-area">
        </div>
        <div class="avatar-img" :style="{backgroundImage:`url(${user.avatar})`}">
        </div>
      </div>
      <div class="strong-margin">{{user.username}}</div>
      {{user.roles | rolesFilter}}
    </div>
    <div class="about-mid">
      <el-card
        shadow="never"
        class="text-muted"
      >
        <template #header>
          <svg-icon icon-class="education"></svg-icon>
          <span class="title">Education</span>
        </template>
        JS in Computer Science from the University of Technology
      </el-card>
    </div>
    <div class="about-bottom">
      <el-card
        shadow="never"
        class="text-muted"
      >
        <template #header>
          <svg-icon icon-class="skill"></svg-icon>
          <span class="title">Skills</span>
        </template>
        Vue
        <el-progress :percentage="70">
        </el-progress>
        JavaScript
        <el-progress :percentage="18">
        </el-progress>
        CSS
        <el-progress :percentage="12">
        </el-progress>
        ESLint
        <el-progress
          :percentage="100"
          status="success"
        >
        </el-progress>
      </el-card>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ProfileLeftAboutMe',
  props:{
    user:{
      type:Object,
      required:true,
    }
  },
  filters:{
    rolesFilter(roles){
      return roles.join('|');
    }
  }
};
</script>

<style lang='scss' scoped>
.round-avatar {
  position: relative;
  display: inline-block;
  border-radius: 50%;
}
::v-deep.el-card:not(.is-always-shadow) {
  border: none;
  font-size: 14px;
  padding-top: 15px;
  .el-card__header,
  .el-card__body {
    .title {
      margin-left: 5px;
      font-weight: bolder;
    }
    padding: 10px 0;
    .el-progress {
      margin: 3px 0;
    }
  }
}
.about-top {
  text-align: center;
  padding: 15px 0;
}
.strong-margin {
  font-weight: bold;
  margin: 10px 0;
  color: black;
}
.avatar-frame {
  width: 100px;
  height: 100px;
  padding: 15px;
  border-radius: 50%;
  text-align: center;
  border: solid 5px #f2f2f2;
  position: relative;
}
.hover-area {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  &:hover + .avatar-img {
    transform: rotateZ(-110deg);
  }
}
.avatar-img {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  position: absolute;
  background: center center/cover;
  transform-origin: 100% 50%;
  transition: all 0.3s;
}
</style>
//亲人 爱人 朋友