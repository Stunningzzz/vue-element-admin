<template>
  <div>
    <div
      class="model"
      v-show="settingsDrawerVisible"
      @click="settingsDrawerVisible = false"
    >
    </div>
    <div
      class="drawer-wrapper"
      ref="wrapper"
      :style="wrapperStyle"
    >
      <el-button
        id="page-settings-button"
        type="primary"
        @click="settingsDrawerVisible = !settingsDrawerVisible"
        :icon="drawerSwitchIcon"
      >
      </el-button>
      <div class="drawer-content" ref="content">
        <h4>
          Page style setting
        </h4>
        <div
          v-for="(item) in settingItems"
          :key="item.desc"
          class="setting-item"
        >
          <span>
            {{item.desc}}
          </span>
          <el-switch
            :value="_self[item.storeName]"
            :active-value="1"
            :inactive-value="0"
            @change="(newVal) => switchChange(item.storeName,newVal)"
          ></el-switch>
        </div>
        <div class="setting-item theme-picker-item">
          <span>
            Theme Color
          </span>
          <ThemePicker />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ThemePicker from './ThemePicker';
export default {
  name: 'PageSetting',
  components: {
    ThemePicker,
  },
  data() {
    return {
      contentWidth:'',
      settingsDrawerVisible: false,
      settingItems: [
        {
          desc: 'Fixed Header',
          storeName: 'fixedHeader',
        },
        {
          desc: 'Sidebar Logo',
          storeName: 'sidebarLogo',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['fixedHeader', 'sidebarLogo']),
    drawerSwitchIcon() {
      let icon = this.settingsDrawerVisible ? 'close' : 'setting';
      return `el-icon-${icon}`;
    },
    wrapperStyle() {
      return this.settingsDrawerVisible
        ? {
            width: this.contentWidth,
          }
        : {
            width: 0,
          };
    },
  },
  methods: {
    ...mapMutations('settings', ['setFixedHeader', 'setSidebarLogo']),
    switchChange(storeName, newVal) {
      let mutationName = `set${storeName[0].toLocaleUpperCase()}${storeName.slice(
        1
      )}`;
      this[mutationName](newVal);
    },
  },
  mounted(){
    this.contentWidth = this.$refs.content.getBoundingClientRect().width + 'px';
  },
};
</script>

<style lang='scss' scoped>
.drawer-content {
  width: 260px;
  padding: 24px;
}
.setting-item {
  padding: 12px 0;
  color: #595959;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  &.theme-picker-item {
    line-height: 36px;
  }
}
.drawer-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  transition: all 0.25s ease-in-out;
  z-index: 2001;
}

.el-button {
  position: absolute;
  width: 48px;
  height: 48px;
  font-size: 25px;
  padding: 0;
  top: 250px;
  left: 0;
  margin-left: -48px;
}
.model {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba($color: #000000, $alpha: 0.2);
}
</style>
//亲人 爱人 朋友