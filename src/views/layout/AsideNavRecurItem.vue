<template>
  <!-- 如果当前children的长度为0 那么不会显示成空的下拉菜单 (注意这和没有chilren属性不同!!!) -->
  <div v-if="curRoute.hidden || (curRoute.children && curRoute.children.length === 0)">
  </div>
  <!-- 一定是非hidden 要么chilren属性为空 要么有children属性而且长度大于0 -->
  <!-- 不能只单纯判断children不为空就认定有子路由 因为经过筛选后 即使有children属性 子路由的长度也可能为0 -->
  <el-submenu
    v-else-if="curRoute.children && (curRoute.children.length > 1 || curRoute.alwaysShow)"
    :index="getFullPath(curRoute)"
    :popper-append-to-body="false"
    background-color="#304156"
    text-color="#BFCBD9"
    active-text-color="#409EFF"
    :router='true'
  >
    <template slot="title">
      <svg-icon :icon-class="curRoute.meta.icon"></svg-icon>
      <span slot="title">
        {{curRoute.meta.title}}
      </span>
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
    <svg-icon :icon-class="curRouteItem.meta.icon"></svg-icon>
    <span slot="title">
      {{curRouteItem.meta.title}}
    </span>
  </el-menu-item>

  <!-- <div v-if="!curRoute.hidden">
    <el-submenu
      v-if="curRoute.children && (curRoute.alwaysShow || curRoute.children.length > 1)"
      :index="curRoute.path"
      :abc="curRoute.path"
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#409EFF"
      :router='true'
    >
      <template slot="title">
        <svg-icon :icon-class="curRoute.meta.icon"></svg-icon>
        <span slot="title">
          {{curRoute.meta.title}}
        </span>
      </template>
      <AsideNavRecurItem
        v-for="item in curRoute.children"
        :key="item.path"
        :cur-route="item"
      >
      </AsideNavRecurItem>
    </el-submenu>
    <el-menu-item
      v-else
      :index="curRoute.path"
      :abc="curRoute.path"
    >
      <template v-if="curRoute.children">
        <svg-icon :icon-class="curRoute.children[0].meta.icon"></svg-icon>
        <span slot="title">
          {{curRoute.children[0].meta.title}}
        </span>
      </template>
      <template v-else>
        <svg-icon :icon-class="curRoute.meta.icon"></svg-icon>
        <span slot="title">
          {{curRoute.meta.title}}
        </span>
      </template>
    </el-menu-item> 
  </div> -->

</template>

<script>
import { mapActions } from 'vuex';
import path from 'path';

export default {
  name: 'AsideNavRecurItem',
 
  props: {
    curRoute: {
      type: Object,
      required: true,
    },
    basePath:String,
  },
  computed: {
    curRouteItem() {
      let {curRoute} = this;
      // 如果有children的话 它的alwaysShow一定是false 且长度一定为1
      return curRoute.children ? curRoute.children[0] :curRoute;
    },
  },
  created(){
    let {curRoute} = this;
    if (curRoute.children?.length === 1 && !curRoute.alwaysShow) {
      this.setBreadCrumbsExcludePath(curRoute.path);
    }
  },
  methods: {
    ...mapActions('app', ['setBreadCrumbsExcludePath']),
    getFullPath(route){
      return path.resolve(this.basePath,route.path);
    }
  },
  // data() {
  //   return {
  //     marginTop: 0,
  //   };
  // },
  // computed: {
  //   ...mapGetters(['isCollapse']),
  //   defaultActive() {
  //     let { breadCrumbs } = this.$store.getters;
  //     return  breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].path : null;
  //   },
  // },
  // methods: {
  //   ...mapMutations(['setCollapsing', 'toggleCollapse']),
  //   componentRoute(route) {
  //     return route.filter((curRoute) => curRoute.component);
  //   },
  //   scroll({ wheelDeltaY }) {
  //     let menuHeight = this.$refs.menu.$el.offsetHeight,
  //       wrapperHeight =
  //         window.innerHeight -
  //         parseInt(getComputedStyle(this.$el).paddingBottom),
  //       { marginTop } = this;
  //     // 往上滑为正
  //     if (wheelDeltaY > 0) {
  //       // 如果当前marginTop 小于0 肯定要往上滑
  //       if (marginTop < 0) {
  //         // 往上滚了
  //         this.marginTop = Math.min(0, this.marginTop + wheelDeltaY);
  //       } // 0 + 700 < 800
  //     } else if (-marginTop + wrapperHeight < menuHeight) {
  //       // 0 - 180 = -180 和 700 - 800
  //       this.marginTop = Math.max(
  //         marginTop + wheelDeltaY,
  //         wrapperHeight - menuHeight
  //       );
  //     }
  //   },
  //   actionEnd({ propertyName }) {
  //     // 理论上只要监听width就行了 但是有时候width会不触发...?
  //     if (propertyName === 'width' || propertyName === 'opacity') {
  //       this.$store.commit('setCollapsing', false);
  //     }
  //   },
  // },
  // mounted() {
  //   this.$bus.$on('burgerClick', () => {
  //     this.setCollapsing(true);
  //     let menu = this.$refs.menu,
  //       submenus = menu.submenus;
  //     this.marginTop = 0;
  //     for (let key in submenus) {
  //       menu.close(key);
  //     }
  //     setTimeout(() => {
  //       this.toggleCollapse();
  //     }, 300);
  //   });
  // },
};
</script>

<style lang='scss' scoped>
.svg-icon {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 12px;
}
::v-deep {
  // 如果写成.is-active > .el-submenu__title 的话 第一层的submenu不会亮
  // 原因是 第一层恰好是匹配::v-deep的 写在里面只选择子元素而不会选择自身
  &.is-active > .el-submenu__title {
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
  .is-opened > .el-submenu__title .el-icon-arrow-right {
    transform: rotateZ(180deg) !important;
  }
}
</style>
//亲人 爱人 朋友