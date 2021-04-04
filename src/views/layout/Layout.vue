<template>
  <el-container class="layout-container">
    <AsideNav />
    <el-container
      direction="vertical"
      class="main-container"
    >
      <Header />
      <Main />
      <div class="drawer-wrapper">
        <el-button
          type="primary"
          @click="settingsDrawerVisible = !settingsDrawerVisible"
          :icon="drawerSwitchIcon"
        >
        </el-button>
        <el-drawer
          title="Page style setting"
          :visible.sync="settingsDrawerVisible"
          :with-header="false"
          :modal-append-to-body='false'
        >
        </el-drawer>
      </div>
      <button @click="settingsDrawerVisible = !settingsDrawerVisible">
        按钮
      </button>
    </el-container>
  </el-container>
</template>

<script>
import Header from './Header';
import Main from './MainRouter';
import AsideNav from './AsideNav';

export default {
  name: 'Layout',
  data() {
    return {
      settingsDrawerVisible: false,
    };
  },
  computed: {
    drawerSwitchIcon() {
      return `el-icon-${this.settingsDrawerVisible ? 'close' : 'setting'}`;
    },
  },
  components: {
    Header,
    Main,
    AsideNav,
  },
};
</script>

<style lang='scss' scoped>
.el-container {
  height: 100%;
  overflow: auto;
}
.main-container{
  position: relative;
}
.el-button {
  position: absolute;
  top: 250px;
  right: 0;
  width: 48px;
  height: 48px;
  padding: 0;
  font-size: 24px;
  overflow: visible;
  text-align: center;
}
[class^='el-icon-'] {
  font-size: 25px;
}
</style>
//亲人 爱人 朋友