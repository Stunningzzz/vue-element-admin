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
      <HeaderBreadCrumb
        class="header-crumb"
        :bread-crumbs="breadCrumbs"
      />
    </div>
    <!-- <HeaderLogoDropdown /> -->
  </el-header>
</template>
<script>
import HamburgerButton from '@/components/common/HamburgerButton';
import HeaderBreadCrumb from './HeaderBreadCrumb';
import HeaderLogoDropdown from './HeaderLogoDropdown';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Header',
  components: {
    HamburgerButton,
    HeaderBreadCrumb,
    HeaderLogoDropdown,
  },
  computed: {
    ...mapGetters([
      'asideNavStatus',
      'asideNavIsCollapsing',
      'breadCrumbs',
      'breadCrumbsExcludePath',
    ]),
  },
  methods: {
    ...mapMutations('app', ['setBreadCrumbs']),
    burgerClick() {
      this.$bus.$emit('toggleAsideNavStatus');
    },
    getBreadCrumbs() {
      let matched = [...this.$route.matched];
      // 包括跳转到当前路径的也变黑
      console.log(this.$route.path);
      let unAccessPath = [this.$route.path];
      
      for (let i = matched.length - 1; i >= 0; i--) {
        let {redirect,path} = matched[i];
        if (
          redirect &&
          (unAccessPath.includes(redirect) ||
            this.$router.getMatchedComponents(redirect).length === 1)
        ) {
          unAccessPath.push(path);
          // 这样会影响到this.$route.matched 导致nodirect为true的永远变不了false
          // matched[i].nodirect = true
        }
      }

      // 因为404/401 没有title 一过滤再取[0]就会报错 而除他们之外的因为外层都有Layout 和 内层自己的组件
      // 所以length 一定大于 1
      if (matched.length > 1) {
        let breadCrumbs = matched
          .filter(
            (item) =>
              item.meta.title &&
              !this.breadCrumbsExcludePath.includes(item.path)
          )
          .map(({ path, meta: { title },nodirect }, index) => {
            return {
              path,
              title,
              nodirect,
              class: 'crumb-item',
            };
          });
        if (breadCrumbs[0].path !== '/dashboard') {
          breadCrumbs.unshift({
            path: '/',
            title: '首页',
            class: 'crumb-item',
          });
        }
        breadCrumbs[breadCrumbs.length - 1].class = 'crumb-item-last';

        this.setBreadCrumbs(breadCrumbs);
      }
    },
  },
  watch: {
    $route() {
      this.getBreadCrumbs();
    },
  },
  created() {
    // 刷新或者从登录页面进入时 因为header组件还没生成 所以不会调用watch:$route方法 所以在这样要额外调用一次
    this.getBreadCrumbs();
  },
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
