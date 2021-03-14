<template>
  <el-container>
    <AsideNav/>
    <el-container direction="vertical"
      class="container-right">
      <Header />
      <Main />
    </el-container>
  </el-container>
</template>

<script>
import Header from './Header';
import Main from './MainRouter';
import AsideNav from './AsideNav';


export default {
  name: 'Layout',
  components: {
    Header,
    Main,
    AsideNav,
  },
};
</script>

<style lang='scss' scoped>
.container-right {
  height: 100vh;
  overflow: auto;
}
</style>
//亲人 爱人 朋友