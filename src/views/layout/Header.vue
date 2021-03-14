<template>
  <el-header
    id="header"
    height="50px"
  >
    <div class="burger-crumb">
      <HamburgerButton
        :default-state="asideNavStatus ? 'flip' : 'normal'"
        :disabled="asideNavIsCollapsing"
        @burger-click="burgerClick"
      />
      <!-- <HeaderBreadCrumb class="header-crumb" :bread-crumbs="breadCrumbs" /> -->
    </div>
    <!-- <HeaderLogoDropdown /> -->
  </el-header>
</template>
<script>
import HamburgerButton from '@/components/common/HamburgerButton';
import HeaderBreadCrumb from './HeaderBreadCrumb';
import HeaderLogoDropdown from './HeaderLogoDropdown';
import { mapGetters,mapMutations } from 'vuex';

export default {
  name: 'Header',
  components: {
    HamburgerButton,
    HeaderBreadCrumb,
    HeaderLogoDropdown,
  },
  computed: {
    // ...mapGetters(['asideNavStatus', 'isCollapsing','breadCrumbs']),
    ...mapGetters(['asideNavStatus','asideNavIsCollapsing']),
  },
  methods: {
    ...mapMutations('app',['setBreadCrumbs']),
    burgerClick() {
      this.$bus.$emit('toggleAsideNavStatus');
    },
    // getBreadCrumbs() {
    //   let matched = this.$route.matched;
    //   // 必须长度大于1 因为'*'不会经过过滤
    //   if (matched.length > 1) {
    //     let breadCrumbs = matched
    //       .filter((item) => item.meta.title)
    //       .map(({ path, meta: { title } }, index) => {
    //         return {
    //           path,
    //           title,
    //           class: 'crumb-item',
    //         };
    //       });
    //     breadCrumbs[breadCrumbs.length - 1].class = 'crumb-item-last';
    //     this.setBread(breadCrumbs);
    //   }
    // },
  },
  // watch: {
  //   $route() {
  //     this.getBreadCrumbs();
  //   },
  // },
  // created() {
  //   // 刷新或者从登录页面进入时 因为header组件还没生成 所以不会调用watch:$route方法
  //   // 所以在这样要额外调用一次
  //   this.getBreadCrumbs();
  // },
};
</script>
<style lang="scss" scoped>
#header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.burger-crumb {
  display: flex;
  width: 600px;
  align-items: center;
  justify-content: space-between;
}
</style>
