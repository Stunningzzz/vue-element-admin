<template>
  <div class="post">
    <div class="post-header">
      <img
        class="header-avatar"
        :src="post.avatar"
      />
      <div class="header-right">
        <div class="header-username">
          {{post.username}}
        </div>
        <div class="header-desc text-muted">
          {{post.desc}}
        </div>
      </div>
    </div>
    <div class="post-body">
      <slot>
        {{post.body}}
      </slot>
    </div>
    <div class="post-footer">
      <a>
        <i class="el-icon-share"></i>
        Share
      </a>
      <a>
        <svg-icon icon-class="love"></svg-icon>
        Like
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileRightTabsActivityItem',
  props:{
    post:{
      type:Object,
      required:true,
    }
  },
};
</script>

<style lang='scss' scoped>
.post {
  border-bottom: 1px solid #d2d6de;
  padding-bottom: 25px;
  margin-bottom: 15px;
}
.post-body,
.post-footer {
  font-size: 14px;
}
.post-body {
  padding: 10px 0;
}
.header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header-right {
  display: inline-block;
  vertical-align: bottom;
  line-height: 20px;
  margin-left: 10px;
  .header-username {
    color: #303133;
  }
  .header-desc {
    font-size: 12px;
  }
}
</style>
//亲人 爱人 朋友