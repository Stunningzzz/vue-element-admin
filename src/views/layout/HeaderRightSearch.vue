<template>
  <div
    :class="{'show':isShow}"
    class="header-search"
  >
    <svg-icon
      class="search-icon"
      icon-class="search"
      @click.native="searchClick"
    />
    <!-- <input style="height:100px"/> -->
    <transition name="select">
      <el-select
        v-show="isShow"
        ref="headerSearchSelect"
        v-model="inputText"
        placeholder="Search"
        :remote-method="querySearch"
        filterable
        remote
        default-first-option
        class="header-search-select"
        @change="inputTextChange"
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

export default {
  name: 'HeaderRightSearch',
  data() {
    return {
      isShow: true,
      // 用户输入的字符串
      inputText: '',
      searchPool: [],
      fuse: null,
      options: [],
    };
  },
  computed: {
    routes() {
      return this.$store.getters.accessRoutes;
    }
  },
  watch: {
    routes() {
      // 将可访问的路由进一步筛选 用于搜索结果
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    isShow(value) {
      // 在body内除文本框中的点击都要让select菜单收起
      // 一展开就把事件添加到body上面 一收起就移除监听
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    // 文本框展开
    searchClick() {
      console.log('searchClick');
      this.isShow = !this.isShow;
      // 搜索框获取焦点
    },
    // 文本框关闭
    searchClose() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.isShow = false
    },
    querySearch() {},
    inputTextChange() {},
    // change事件是在选择不同的选项的时候触发 而不是在输入搜索字符的时候触发
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      // 为什么要用nextTick?
      this.$nextTick(() => {
        this.show = false
      })
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
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      // 该搜索的功能只是输入路由标题然后提供内容跳转 并不能搜索内容
      // 首先res是个对象数组 每个对象包含两个属性: 
      //   path:点击跳转的目标路径
      //   title:显示在搜索框中的标题 
      // 比如Menu1下面的Menu1-1 就需要显示成 Menu1 > Menu1-1

      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) { continue }
        // 因为
        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.el-select {
  width: 200px;
}
.select-enter-active,
.select-leave-active {
  transition: all 0.2s;
}
.select-enter,
.select-leave-to {
  width: 0;
}
::v-deep.header-search {
  // 直接给最外层设置
  display: inline-block;
  .search-icon {
    cursor: pointer;
    font-size: 20px;
    color: #5a5e66;
    vertical-align: middle;
  }
  .el-input__inner {
    border: none;
    border-bottom: 1px solid black !important;
    border-radius: 0;
    padding: 0;
    margin-left: 10px;
  }
}
</style>
//亲人 爱人 朋友