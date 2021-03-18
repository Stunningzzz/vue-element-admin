<template>
  <div
    class="aside-nav-container"
    @transitionend="actionEnd"
  >

    <!-- 在这里 el-menu通过el-submenu的打开和关闭来改变高度 
          el-scrollbar通过监听视口高度和el-menu的高度的关系来调整是否出现滚动条和滚动条的长度 -->
    <el-scrollbar :wrap-style="scrollbarWrapStyle" ref="scrollbar">
      <el-menu
        background-color="#304156"
        text-color="#BFCBD9"
        active-text-color="#409EFF"
        ref="menu"
        :router='true'
        :collapse="asideNavStatus"
        :default-active="defaultActive"
        mode="vertical"
      >
        <AsideNavRecurItem
          v-for="item in accessRoutes"
          :key="item.path"
          :cur-route="item"
          base-path="/"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import AsideNavRecurItem from './AsideNavRecurItem';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AsideNav',
  components: {
    AsideNavRecurItem,
  },
 
  computed: {
    ...mapGetters(['asideNavStatus', 'asideNavIsCollapsing', 'accessRoutes']),
    defaultActive() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapMutations('app', ['setAsideNavIsCollapsing', 'toggleAsideNavStatus']),
    actionEnd({ propertyName }) {
      // 正常来说只需要监听width 就够了 但有时候展开的时候不会触发width!
      if (['width', 'opacity'].indexOf(propertyName) !== -1) {
        this.setAsideNavIsCollapsing(false);
      }
    },
  },
  created() {
    this.$bus.$on('toggleAsideNavStatus', () => {
      this.setAsideNavIsCollapsing(true);
      let menu = this.$refs.menu,
        submenus = menu.submenus;
      // this.marginTop = 0;
      for (let key in submenus) {
        menu.close(key);
      }
      setTimeout(() => {
        this.toggleAsideNavStatus();
      }, 300);
    });
  },
  mounted(){
    console.log(this.$refs.scrollbar);
  },
};
</script>
<style lang="scss" scoped>
.aside-nav-container {
  height: 100%;
  // overflow: hidden;
  flex-shrink: 0;
  background-color: #304156;
  .wrapper {
    float: left;
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 180px;
  padding-bottom: 20px;
}

::v-deep.el-scrollbar {
  height: 100%;
  // 去除默认的overflow-hidden
  overflow: visible;
  .el-scrollbar__wrap {
    // overflow-x: hidden;
    // 去除原先的overflow-scroll 
    overflow: visible;
    margin-right: 0px !important;
  }
}
</style>
