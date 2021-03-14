<template>
  <!-- <transition name="router"
    mode="out-in"
    @before-leave="beforeLeave"
    @before-enter="beforeEnter">
    <router-view>
    </router-view>
  </transition>  -->
  <transition
    name="router"
    mode="out-in"
  >
    <router-view :key="$route.path">
    </router-view>
  </transition>
</template>

<script>
export default {
  name: 'RouterTransition',
  // methods: {
  //   beforeLeave(el) {
  //     console.log('beforeLeave');
  //     this.hasLeave = true;
  //     let commit = this.$store.commit;
  //     let timer = setInterval(() => {
  //       commit('setLoading', true);
  //       let percent = (1 - getComputedStyle(el).opacity) * 100;
  //       commit('setPercentage', percent);
  //       console.log(percent);
  //       if (percent === 100) {
  //         clearInterval(timer);
  //       }
  //     }, 100);
  //   },

  //   beforeEnter(el) {
  //     console.log('beforeEnter');
  //     let commit = this.$store.commit;
  //     if (!this.hasLeave) {
  //       let timer = setInterval(() => {
  //         commit('setLoading', true);
  //         let percent = getComputedStyle(el).opacity * 100;
  //         commit('setPercentage', percent);
  //         console.log(percent);
  //         if (percent === 100) {
  //           clearInterval(timer);
  //         }
  //       }, 100);
  //     }
  //   },
  // },
};
</script>

<style lang='scss' scoped>
.router-enter-active,
.router-leave-active {
  transition: all .3s;
}

.router-leave-to
{
  opacity: 0;
  transform: translateX(30px);
}
.router-enter {
   opacity: 0;
  transform: translateX(-30px);
}
</style>
//亲人 爱人 朋友