<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'SkillsAdapted',
};
</script>

<style lang='scss' scoped>
.el-progress {
  margin: 3px 0;
}
</style>
//亲人 爱人 朋友