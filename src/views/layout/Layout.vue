<template>
  <div class="layout-container">
    <!-- 在上面的先设置iscollapsing就能看到关菜单了 否则的话看不到 -->
    <AsideNav class="asidenav-sticky" />
    <AsideNav :placeholder="true" />
    <div
      class="main-container"
    >
      <Header />
      <Main />
    </div>
    <PageSettings />
  </div>
</template>

<script>
import Header from './Header';
import Main from './MainRouter';
import AsideNav from './AsideNav';
import PageSettings from '@/views/pagesettings/PageSettings';

export default {
  name: 'Layout',
  components: {
    Header,
    Main,
    AsideNav,
    PageSettings,
  },
};
</script>

<style lang='scss' scoped>
.layout-container {
  height: 100%;
  display: flex;
}
.main-container {
  align-self: flex-start;
  height: 100%;
  flex-grow: 1;
  // 给个初始宽度能解决溢出问题
  width: 0;
}

.asidenav-sticky {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
</style>
//亲人 爱人 朋友