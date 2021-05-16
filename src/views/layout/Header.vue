<template>
  <div
    class="header-wrapper"
    :style="wrapperStyle"
  >
    <div
      id="header"
      ref="header"
      :style="headerStyle"
    >
      <div class="burger-crumb">
        <HamburgerButton
          id="hamburger-container"
          :default-state="asideNavStatus ? 'flip' : 'normal'"
          :disabled="asideNavIsCollapsing"
          @burger-click="burgerClick"
        />
        <HeaderBreadCrumb
          id="breadcrumb-container"
          class="header-crumb"
          :bread-crumbs="breadCrumbs"
        />
      </div>
      <HeaderRight />
    </div>
  </div>

</template>
<script>
import HamburgerButton from '@/components/common/HamburgerButton';
import HeaderBreadCrumb from './HeaderBreadCrumb';
import HeaderRight from './HeaderRight';
import { mapGetters } from 'vuex';
import path from 'path';

export default {
  name: 'Header',
  components: {
    HamburgerButton,
    HeaderBreadCrumb,
    HeaderRight,
  },
  props: {
    fixed: Boolean,
  },
  data() {
    return {
      headerHeight: '',
    };
  },
  computed: {
    ...mapGetters([
      'asideNavStatus',
      'asideNavIsCollapsing',
      'breadCrumbsExcludePath',
      'fixedHeader',
    ]),
    wrapperStyle() {
      return {
        height: this.headerHeight,
      };
    },
    headerStyle() {
      let { asideNavStatus, fixedHeader } = this;
      return fixedHeader
        ? {
            position: 'fixed',
            width: asideNavStatus ? 'calc(100% - 64px)' : 'calc(100% - 200px)',
            zIndex: 1,
            top: 0,
            right: 0,
            transition: 'width .3s ease-in-out',
          }
        : {};
    },
    breadCrumbs() {
      let matched = [...this.$route.matched];
      // 跳转到unAccessPath的会变灰
      let unAccessPath = [this.$route.path];
      // 如果重定向的目标路径没有访问权限的话 面包屑不能点击
      for (let i = matched.length - 1; i >= 0; i--) {
        let { redirect, path: routePath, parent } = matched[i];
        if (redirect) {
          // 用resolve比用join好的地方是 不需要自己去判断是绝对路径还是相对路径了
          let redirectPath = path.resolve(parent ? parent.path : '/', redirect);

          // 说明无权限访问或跳转到当前页面
          if (
            unAccessPath.includes(redirectPath) ||
            this.$router.getMatchedComponents(redirectPath).length === 1
          ) {
            unAccessPath.push(routePath);
            matched[i] = { ...matched[i], redirect: 'noRedirect' };
          }
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
          .map(({ path, meta: { title }, redirect }, index) => {
            return {
              path,
              title,
              redirect,
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
        breadCrumbs[breadCrumbs.length - 1] = {
          ...breadCrumbs[breadCrumbs.length - 1],
          class: 'crumb-item-last',
          redirect: 'noRedirect',
        };

        return breadCrumbs;
      }
    },
  },
  mounted() {
    this.headerHeight = this.$refs.header.getBoundingClientRect().height + 'px';
  },
  methods: {
    burgerClick() {
      this.$bus.$emit('toggleAsideNavStatus');
    },
  },
};
</script>
<style lang="scss" scoped>
#header {
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.burger-crumb {
  height: 100%;
  display: flex;
  width: 600px;
  align-items: center;
  justify-content: space-between;
}
</style>
