<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group
      name="bread"
      tag="div"
    >
      <el-breadcrumb-item
        v-for="item in breadCrumbs"
        :key="item.path"
        :to="breadCrumbsItemPath(item)"
        :class="item.class"
      >
        {{item.title}}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'HeaderBreadCrumb',
  props:{
    breadCrumbs:Array,
  },
  methods:{
    breadCrumbsItemPath(item){
      return item.redirect === 'noRedirect' ?  '' : item.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.crumb-item,
.crumb-item-last {
  transition: all 0.5s;
}

.bread-enter {
  transform: translateY(-20px);
  opacity: 0;
}
.bread-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
::v-deep {
  // 设置最后一个不显示 ' > ' 这里不能用last-child 因为切换的时候会变成倒数第二个
  .crumb-item-last {
    .el-breadcrumb__separator {
      display: none;
    }
  }

  .bread-leave-active {
    position: absolute;
    .el-breadcrumb__inner.is-link {
      font-weight: 400;
      color: #97a8be;
    }
  }
  .el-breadcrumb__inner:not(.is-link){
    color:#97A8BE;
  }
}
</style>