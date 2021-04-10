<template>
  <div class="main">
    <transition
      name="router"
      mode="out-in"
    >
      <keep-alive v-if="isRouterAlive">
        <router-view
          :key="$route.path"
          class="route-view"
        >
        </router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Main',
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    this.$bus.$on('reload', this.reload);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
// 默认的overflow是auto 这会导致在main里面生成滚动条
.main {
  overflow: visible;
  padding: 0;
  .route-view {
    padding: 20px 40px;
    height: 100%;
    &.no-padding {
      padding: 0;
    }
    &::before {
      content: '';
      display: table;
    }
  }
  
}

.router-enter-active,
.router-leave-active {
  transition: all 0.3s;
}

.router-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.router-enter {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
//亲人 爱人 朋友