<template>
  <el-container class="layout-container">
    <!-- 在上面的先设置iscollapsing就能看到关菜单了 否则的话看不到 -->
    <AsideNav class="asidenav-sticky"/>
    <AsideNav :placeholder="true"/>
    <el-container
      direction="vertical"
      class="main-container"
    >
      <Header />
      <Main />
    </el-container>
    <PageSettings/>
  </el-container>
</template>

<script>
import Header from './Header';
import Main from './MainRouter';
import AsideNav from './AsideNav';
import PageSettings from '@/views/PageSettings/PageSettings';

export default {
  name: 'Layout',
  
  components: {
    Header,
    Main,
    AsideNav,
    PageSettings
  },
};
</script>

<style lang='scss' scoped>
.el-container {
  height: 100%;
}
.main-container{
  align-self: flex-start;
}

.asidenav-sticky{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}

</style>
//亲人 爱人 朋友