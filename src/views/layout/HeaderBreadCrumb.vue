<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group
      name="bread"
      tag="div"
    >
      <el-breadcrumb-item
        v-for="item in breadCrumbs"
        :key="item.path"
        :to="item.path"
        :class="item.class"
        @click="itemClick(item.path)"
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
  methods: {
    itemClick() {
      return false;
    },
  },
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
  // 设置最后一个的颜色
  .crumb-item-last {
    .el-breadcrumb__inner {
      font-weight: 400 !important;
      color: #97a8be !important;
    }
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
}
</style>