<template>
  <el-row>
    <el-col :span="12">
      <img src="~@/assets/img/notfound.gif" />
    </el-col>
    <el-col :span="12"
      class="col2">
      <div class="wrapper">
        <h1 class="right-row1">OOPS!</h1>
        <h2 class="right-row2">
          很抱歉,页面它不小心迷路了!
        </h2>
        <div class="right-row3">
          请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
        </div>
        <el-button type="primary" round @click="$router.replace('/')">
          返回首页
        </el-button>
      </div>
      
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style lang='scss' scoped>
.el-row {
  width: 85%;
  margin: 150px auto;
  img {
    width: 100%;
  }
  .wrapper {
    margin: 60px 0 0 73px;
    .right-row1 {
      color: #409eff;
      font-size: 35px;
    }
    .right-row2 {
      color: #606266;
      font-size: 30px;
    }
    .right-row3 {
      color: #9093b3;
      line-height: 55px;
    }
  }
}
</style>
//亲人 爱人 朋友