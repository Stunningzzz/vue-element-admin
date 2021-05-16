<template>
  <div class="aside-nav-container">
    <!-- 在这里 el-menu通过el-submenu的打开和关闭来改变高度 
          el-scrollbar通过监听视口高度和el-menu的高度的关系来调整是否出现滚动条和滚动条的长度 -->
    <el-scrollbar>
      <el-menu
        background-color="#304156"
        text-color="#BFCBD9"
        active-text-color="#409EFF"
        ref="menu"
        :router='true'
        :collapse="asideNavStatus"
        :default-active="defaultActive"
        mode="vertical"
        :style="menuStyle"
      >
        <AsideNavRecurItem
          v-for="item in accessRoutes"
          :key="item.path"
          :cur-route="item"
          base-path="/"
        />
      </el-menu>
      <div
        @click="$router.push('/')"
        class="sidebar-logo"
        v-show="sidebarLogo"
      >
        <img :src="sideBarLogo" />
        <span class="title">
          {{projectTitle}}
        </span>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import AsideNavRecurItem from './AsideNavRecurItem';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AsideNav',
  props: {
    placeholder: Boolean,
    default: false,
  },
  data() {
    return {
      sideBarLogo:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      projectTitle: 'Vue Element Admin',
    };
  },
  components: {
    AsideNavRecurItem,
  },
  computed: {
    ...mapGetters([
      'asideNavStatus',
      'asideNavIsCollapsing',
      'accessRoutes',
      'sidebarLogo',
    ]),
    defaultActive() {
      return this.$route.path;
    },
    menuStyle() {
      return this.sidebarLogo
        ? {
            paddingTop: '56px',
          }
        : {};
    },
  },
  methods: {
    ...mapMutations('app', ['setAsideNavIsCollapsing', 'toggleAsideNavStatus']),
  },
  created() {
    this.toggleCallback = () => {
      console.log('toggleCallback');
      // if (!this.asideNavIsCollapsing) {
      this.setAsideNavIsCollapsing(true);
      let menu = this.$refs.menu,
        openedMenus = menu.openedMenus,
        openedCount = openedMenus.length;
      if (!openedCount) {
        this.toggleAsideNavStatus();
        setTimeout(() => {
          this.setAsideNavIsCollapsing(false);
        }, 300);
      } else {
        for (let openedMenu of [...openedMenus]) {
          menu.close(openedMenu);
        }
        // 外层的300ms是展开的menu收起的过渡时间
        // 而内层的则是整个nav收起的过渡时间
        setTimeout(() => {
          this.toggleAsideNavStatus();
          setTimeout(() => {
            this.setAsideNavIsCollapsing(false);
          }, 300);
        }, 300);
      }
      // }
    };
    this.$bus.$on('toggleAsideNavStatus', this.toggleCallback);
  },
  beforeDestroy() {
    this.$bus.$off('toggleAsideNavStatus', this.toggleCallback);
  },
};
</script>
<style lang="scss" scoped>
::v-deep.aside-nav-container {
  height: 100%;
  flex-shrink: 0;
  background-color: #304156;
  .sidebar-logo {
    position: absolute;
    z-index: 1;
    width: 100%;
    top: 0;
    background-color: #2b2f3a !important;
    font-weight: bolder;
    font-size: 14px;
    color: #fff !important;
    // 因为字体和其font-size的原因 最终高度会比line-height稍高一点
    height: 56px;
    line-height: 56px;
    white-space: nowrap;
    cursor: pointer;
    * {
      vertical-align: middle;
    }
    // & > .el-tooltip为收缩时
    &,
    & > .el-tooltip {
      padding: 0 20px !important;
    }
    img {
      width: 30px;
      height: 25px;
      margin-right: 5px;
    }
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  padding-bottom: 20px;
}

::v-deep.el-scrollbar {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

::v-deep.el-menu--collapse {
  & + .sidebar-logo .title {
    display: none;
  }
  // 这里必须用 > 表示下一层 否则的话会设置所有的submenu
  > div > .el-submenu > .el-submenu__title {
    // 隐藏箭头
    .el-submenu__icon-arrow {
      display: none;
    }
    // 隐藏文本
    span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
  }
  > div > .el-menu-item {
    .el-submenu__icon-arrow {
      display: none;
    }
    span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
  }
}
</style>
