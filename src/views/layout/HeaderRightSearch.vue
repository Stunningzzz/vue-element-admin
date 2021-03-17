<template>
  <div
    :class="{'show':isShow}"
    class="header-search"
  >
    <svg-icon
      class="search-icon"
      icon-class="search"
      @click.native.stop="searchClick"
    />
    <transition name="select">
      <el-select
        v-show="isShow"
        ref="headerSearchSelect"
        v-model="selectValue"
        placeholder="Search"
        :remote-method="querySearch"
        filterable
        remote
        default-first-option
        class="header-search-select"
        @change="selectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.path"
          :value="item"
          :label="item.title.join(' > ')"
        />
      </el-select>
    </transition>
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import path from 'path';
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderRightSearch',
  data() {
    return {
      isShow: false,
      // 用户输入的字符串
      selectValue: null,
      // searchPool: [],
      fuse: null,
      options: [],
    };
  },
  computed: {
    // routes() {
    //   return this.$store.getters.accessRoutes;
    // }
    ...mapGetters(['accessRoutes']),
  },
  watch: {
    accessRoutes(newAccessRoutes) {
      this.initFuse(this.generateRoutes(newAccessRoutes));
    },
    // routes() {
    //   // 将可访问的路由进一步筛选 用于搜索结果
    //   this.searchPool = this.generateRoutes(this.routes)
    // },
    // searchPool(list) {
    //   this.initFuse(list)
    // },
    isShow(newValue) {
      // 在body内除文本框中的点击都要让select菜单收起
      // 一展开就把事件添加到body上面 一收起就移除监听
      console.log('isShow --- ', newValue);
      if (newValue) {
        document.body.addEventListener('click', this.searchClose);
      } else {
        document.body.removeEventListener('click', this.searchClose);
      }
    },
  },
  mounted() {
    this.initFuse(this.generateRoutes(this.accessRoutes));
  },
  // mounted() {
  //   this.searchPool = this.generateRoutes(this.routes)
  // },
  methods: {
    // 文本框展开
    searchClick() {
      console.log('searchClick');
      this.isShow = !this.isShow;
      // 搜索框获取焦点异常 虽然关闭闪烁但是不能输入
      this.$nextTick(() => {
        this.$refs.headerSearchSelect?.focus();
      });
    },
    // 文本框关闭
    searchClose() {
      this.$refs.headerSearchSelect?.blur();
      this.options = [];
      this.isShow = false;
    },
    // change事件是在选择不同的选项的时候触发 而不是在输入搜索字符的时候触发
    selectChange(val) {
      this.$router.push(val.path);
      console.log(this.selectValue);
      this.selectValue = null;
      this.options = [];
      this.isShow = false;
    },
    // 初始化fuse
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'path',
            weight: 0.3,
          },
        ],
      });
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }
        // 用resolve比用join
        const data = {
          // 这里用join不好吗? 不太好 因为如果在嵌套的过程中有某个使用了绝对路径的话就乱套了
          // 用resolve的话 即使其中的某个子路由用了绝对路径也无妨
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle],
        };

        if (router.meta?.title) {
          data.title = [...data.title, router.meta.title];
          // direct = 'noRedirect' 表示在面包屑中变灰 初始的noRedirect是为了让
          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          );
          if (tempRoutes.length > 0) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.el-select {
  width: 250px;
}
.select-enter-active,
.select-leave-active {
  transition: all 0.2s linear;
}
.select-enter,
.select-leave-to {
  width: 0;
}
::v-deep.header-search {
  .el-select {
    margin-left: 10px;
    .el-input__inner {
      border: none;
      border-bottom: 1px solid black !important;
      border-radius: 0;
      padding: 0;
    }
  }
}
</style>
//亲人 爱人 朋友