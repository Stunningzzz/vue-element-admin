<template>
  <el-card header="Abotu me">
    <div class="about-top text-muted">
      <div class="round-avatar">
        <div class="avatar-frame">
          Hello {{user.roles[0]}}
        </div>
        <RotateAvatar :avatar-url="user.avatar" />
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
        <SkillsAdapted />
      </el-card>
    </div>
  </el-card>
</template>

<script>
import SkillsAdapted from '@/components/SkillsAdapted';
import RotateAvatar from '@/components/RotateAvatar';
export default {
  name: 'ProfileLeftAboutMe',
  components: {
    SkillsAdapted,
    RotateAvatar,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  filters: {
    rolesFilter(roles) {
      return roles.join('|');
    },
  },
};
</script>

<style lang='scss' scoped>
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
  }
}
.about-top {
  text-align: center;
  padding: 15px 0;
  .round-avatar {
    position: relative;
    display: inline-block;
    .avatar-frame {
      width: 100px;
      height: 100px;
      padding: 15px;
      border-radius: 50%;
      text-align: center;
      border: solid 5px #f2f2f2;
    }
    .rotate-avatar{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .strong-margin {
    font-weight: bold;
    margin: 10px 0;
    color: black;
  }
}
</style>
//亲人 爱人 朋友