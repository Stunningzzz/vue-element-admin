<template>
  <div class="aside-nav">
    <!-- <div
      class="wrapper"
      :style="{marginTop:marginTop+'px'}"
      @mousewheel="scroll"
      @transitionend="actionEnd"
    >
      <el-menu
        background-color="#304156"
        text-color="#BFCBD9"
        active-text-color="#409EFF"
        :default-active="defaultActive"
        :collapse="asideNavStatus"
        ref="menu"
        :router='true'
      >
      
      </el-menu>
    </div> -->
    <el-menu
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#409EFF"
      ref="menu"
      :router='true'
      :collapse="asideNavStatus"
    >
      <AsideNavRecurItem
        v-for="item in accessRoutes"
        :key="item.path"
        :cur-route="item"
      />
    </el-menu>
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
  },
  methods: {
    ...mapMutations('app',['setAsideNavIsCollapsing', 'toggleAsideNavStatus']),
  },
  created(){
    this.$bus.$on('toggleAsideNavStatus',() => {
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
    })
  },
 
};
</script>
<style lang="scss" scoped>
.aside-nav {
  height: 100vh;
  // 
  // overflow: hidden;
  flex-shrink: 0;
  background-color: #304156;
  padding-bottom: 20px;
  .wrapper {
    float: left;
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 180px;
}
</style>
