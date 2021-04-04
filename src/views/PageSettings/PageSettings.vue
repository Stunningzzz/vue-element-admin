<template>

  <div class="drawer-wrapper">
    <el-button
      type="primary"
      @click="settingsDrawerVisible = !settingsDrawerVisible"
      :icon="drawerSwitchIcon"
      class="fixed-button"
    >
    </el-button>
    <!-- <el-drawer
      title="Page style setting"
      :visible.sync="settingsDrawerVisible"
      :with-header="false"
      :modal-append-to-body='false'
    > -->

    </el-drawer>
  </div>

</template>

<script>
export default {
  name: 'PageSetting',
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
};
</script>

<style lang='scss' scoped>
.drawer-wrapper{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #bfa;
}
.el-button {
  position: absolute;
  width: 48px;
  height: 48px;
  font-size: 25px;
  padding: 0;
  top: 250px;
  margin-left: -48px;
}
</style>
//亲人 爱人 朋友