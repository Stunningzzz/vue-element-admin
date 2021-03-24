<template>
  <div class="header-search">
    <el-tooltip
      :content="tooltipConent"
      placement="bottom"
      :key="key"
    >
      <svg-icon
        class="search-icon"
        icon-class="search"
        ref="icon"
        @click.stop="searchClick"
      />
    </el-tooltip>
    <transition
      name="select"
      @after-enter="toggleKey"
      @after-leave="toggleKey"
    >
      <el-select
        ref="headerSearchSelect"
        v-show="isShow"
        v-model="selectValue"
        placeholder="Search"
        :remote-method="querySearch"
        filterable
        remote
        default-first-option
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
  props: {
    comp: Object,
  },
  data() {
    return {
      isShow: false,
      selectValue: null,
      fuse: null,
      options: [],
      tooltipConent: '搜索',
      key: false,
      // 第一次点击 重新渲染 且 isShow还是false 这里的isShow应该为true才对
      // 第二次点击 不重新渲染 且 isShow 变true
      // 第三次点击 重新渲染 且 isShow为false
    };
  },
  computed: {
    ...mapGetters(['accessRoutes']),
  },
  watch: {
    accessRoutes(newAccessRoutes) {
      this.initFuse(this.generateRoutes(newAccessRoutes));
    },
    // 这里不能放在click里面 因为改变isShow的地方还有searchClick函数
    isShow(newValue) {
      // 在body内除文本框中的点击都要让select菜单收起
      // 一展开就把事件添加到body上面 一收起就移除监听
      if (newValue) {
        document.body.addEventListener('click', this.searchClose);
        this.$nextTick(() => {
          // 搜索框获取焦点异常 虽然关闭闪烁但是不能输入
          this.$refs.headerSearchSelect?.focus();
        });
      } else {
        document.body.removeEventListener('click', this.searchClose);
      }
    },
  },
  mounted() {
    this.initFuse(this.generateRoutes(this.accessRoutes));
  },
  methods: {
    toggleKey() {
      this.key = !this.key;
      this.tooltipConent = this.key ? '关闭搜索' : '搜索';
    },
    // 文本框展开
    searchClick() {
      // 通过点击按钮关闭的时候 因为搜索按钮还是hover状态
      this.isShow ? this.searchClose() : (this.isShow = true);
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
    vertical-align: baseline !important;
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