<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { themeClass } from '@/settings';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['defaultTheme']),
  },
  mounted() {
    // 刷新后应用主题
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './theme/index.css';
    document.head.insertBefore(link, document.head.firstElementChild);
    themeClass[this.defaultTheme] &&
      document.body.classList.add(themeClass[this.defaultTheme]);
    document.addEventListener('click', (e) => {
      if (document.activeElement.nodeName.toLowerCase() === 'button') {
        console.log(e.target);
      }
    });
  },
  watch: {
    $route() {
      console.log(this.$route);
    },
  },
};
</script>

<style>
</style>
