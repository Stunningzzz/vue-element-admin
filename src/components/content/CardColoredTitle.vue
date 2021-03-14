<template>
  <el-card :header="header"
    :body-style="bodyStyle"
    :shadow="shadow">
    <slot name="body"></slot>
  </el-card>
</template>

<script>
export default {
  name: "CardColoredTitle",
  props: {
    header: {
      type: String,
      default: "",
    },
    bodyStyle: {
      type: Object,
      default() {
        return { padding: "20px" };
      },
    },
    shadow: {
      type: String,
      default: "never",
    },
  },
};
</script>
  
<style lang='scss' scoped>
.el-card {
  border-color: #dcdfe6;
}
::v-deep {
  .el-card__header {
    background: #f2f6fc;
    color: #606266;
    font-weight: bold;
  }
  .el-card__body {
    font-size: 17px;
  }
}
</style>
// 亲人 爱人 朋友