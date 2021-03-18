<template>
  <el-container>
    <AsideNav/>
    <el-container direction="vertical">
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
.el-container{
  height: 100%;
  overflow: auto;
}

</style>
//亲人 爱人 朋友