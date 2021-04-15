<template>
<!-- 只能更换主色调 那既然只能更换主色调为什么还要用styleCluster生成一系列颜色呢???
  因为主色调还有不同情况下的主色调 比如hover下的 active下的等等 所以要将他们一并替换 -->
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    size="medium"
  />
</template>

<script>
const version = require('element-ui/package.json').version; // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF'; // default color
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      chalk: '', // content of theme-chalk css
      theme: '',
    };
  },
  computed: {
    ...mapGetters(['defaultSettingsColor']),
  },
  mounted() {
    this.theme = this.defaultSettingsColor || ORIGINAL_THEME;
  },
  watch: {
    async theme(newVal, oldVal) {
      if (typeof newVal !== 'string') return;
      const preTheme = this.chalk ? oldVal : ORIGINAL_THEME;
      const newValCluster = this.getThemeCluster(newVal.replace('#', ''));
      const oldValCluster = this.getThemeCluster(preTheme.replace('#', ''));

      const $message = this.$message({
        message: '  Compiling the theme',
        customClass: 'theme-message',
        type: 'success',
        duration: 0,
        iconClass: 'el-icon-loading',
      });

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        await this.getCSSString(url, 'chalk');
      }
      // 像原来那样替换所有style标签不好的地方在于 有可能把我们自定义的颜色给修改了
      this.updateStyle(oldValCluster, newValCluster);
      let styleTag = document.getElementById('chalk-style');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.setAttribute('id', 'chalk-style');
        document.head.appendChild(styleTag);
      }

      styleTag.innerText = this.chalk;
      this.$emit('change', newVal);
      $message.close();
    },
  },

  methods: {
    updateStyle(oldCluster, newCluster) {
      let newStyle = this.chalk;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
      });
      this.chalk = newStyle;
    },

    getCSSString(url, variable) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
            resolve();
          }
        };
        xhr.open('GET', url);
        xhr.send();
      });
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(',');
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },
  },
};
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}


.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
