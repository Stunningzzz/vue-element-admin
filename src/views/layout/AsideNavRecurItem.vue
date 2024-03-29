<template>
  <!-- 如果有children的话 children的length必须大于0 -->
  <div v-if="!curRoute.hidden && (!curRoute.children || curRoute.children.length > 0)">
    <!-- 一定是非hidden 要么chilren属性为空 要么有children属性而且长度大于0 -->
    <!-- 不能只单纯判断children不为空就认定有子路由 因为经过筛选后 即使有children属性 子路由的长度也可能为0 -->
    <el-submenu
      v-if="curRoute.children && (curRoute.children.length > 1 || curRoute.alwaysShow)"
      :index="getFullPath(curRoute)"
      popper-append-to-body
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#409EFF"
      :router='true'
    >
      <template slot="title">
        <AsideNavRecurItemTitle
          :icon="curRoute.meta.icon"
          :title="curRoute.meta.title"
        />
      </template>
      <AsideNavRecurItem
        v-for="item in curRoute.children"
        :key="item.path"
        :cur-route="item"
        :base-path="getFullPath(curRoute)"
      >
      </AsideNavRecurItem>
    </el-submenu>

    <el-menu-item
      v-else
      :index="getFullPath(curRouteItem)"
    >
      <AsideNavRecurItemTitle
        :icon="curRouteItem.meta.icon"
        :title="curRouteItem.meta.title"
      />
    </el-menu-item>
  </div>

  <!-- 如果当前children的长度为0 那么不会显示成空的下拉菜单 (注意这和没有chilren属性不同!!!)
  <div v-if="curRoute.hidden || (curRoute.children && curRoute.children.length === 0)">
  </div> -->
</template>

<script>
import { mapActions } from 'vuex';
import AsideNavRecurItemTitle from './AsideNavRecurItemTitle';
import path from 'path';

export default {
  name: 'AsideNavRecurItem',
  components: {
    AsideNavRecurItemTitle,
  },
  props: {
    curRoute: {
      type: Object,
      required: true,
    },
    basePath: String,
  },
  computed: {
    curRouteItem() {
      let { curRoute } = this,
        { isAbsolute, join, resolve } = path;
      // 如果有children的话 它的alwaysShow一定是false 且长度一定为1
      // 但是这种情况下 basePath还是爷路由的path 那么在下面的getFullPath中 如果子路由是相对路径的话
      // 它的basePath不对会出错 所以如果有children的话 加上当前的path
      let res;
      if (curRoute.children) {
        let childPath =
          isAbsolute(curRoute.path) || isAbsolute(curRoute.children[0].path)
            ? resolve(curRoute.path, curRoute.children[0].path)
            : join(curRoute.path, curRoute.children[0].path);
        res = { ...curRoute.children[0], path: childPath };
      } else {
        res = curRoute;
      }
      return res;
    },
  },
  created() {
    let { curRoute, basePath } = this;
    if (curRoute.children?.length === 1 && !curRoute.alwaysShow) {
      // 如果当前path属性是写的相对路径的话会出错
      this.setBreadCrumbsExcludePath(path.resolve(basePath, curRoute.path));
    }
  },
  methods: {
    ...mapActions('app', ['setBreadCrumbsExcludePath']),
    getFullPath(route) {
      return path.resolve(this.basePath, route.path);
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep {
  // 如果写成.is-active > .el-submenu__title 的话 第一层的submenu不会亮
  // 原因是 第一层恰好是匹配::v-deep的 写在里面只选择子元素而不会选择自身
  &.is-active > .el-submenu__title * {
    color: #409eff !important;
  }
  // 只要不是最外层的ul都会加上该类名
  .el-menu--inline {
    .el-menu-item,
    .el-submenu__title {
      background-color: #1f2d3d !important;
      min-width: 0;
      &:hover {
        background-color: #001528 !important;
      }
    }
  }
  // 添加箭头旋转效果 .is-opened表示鼠标移入的submenu 注意后面必须是 > .el-submenu__title 表示它自己的title
  // 而不包括它的子菜单还含有的el-submenu的title
  // 而且因为是鼠标移入submenu时旋转 所以不是给.el-icon-arrow-right:hover 设置
  // .is-opened > .el-submenu__title .el-icon-arrow-right {
  //   transform: rotateZ(180deg) !important;
  // }
}
</style>
//亲人 爱人 朋友