import { setItem, getItem } from '@/common/storage';
export default {
  namespaced: true,
  state: {
    // 对象数组 对象里面是面包屑导航的path和title
    breadCrumbs: [],
    // 被覆盖的el-menu 不会显示在面包屑上
    breadCrumbsExcludePath: [],
    // 页面是否在加载
    isLoading: true,
    // 侧边栏是否正在打开或关闭
    asideNavIsCollapsing: false,
    // 侧边栏当前是打开还是关闭
    asideNavStatus: getItem('asideNavStatus') === 'true',
  },
  actions: {
    setBreadCrumbsExcludePath({ commit }, payload) {
      payload
        ? commit('appendBreadCrumbsExcludePath', payload)
        : commit('resetBreadCrumbsExcludePath');
    },
  },
  mutations: {
    setBreadCrumbs(state, payload) {
      state.breadCrumbs = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setAsideNavIsCollapsing(state, payload) {
      state.asideNavIsCollapsing = payload;
    },
    toggleAsideNavStatus(state) {
      state.asideNavStatus = !state.asideNavStatus;
      setItem('asideNavStatus', state.asideNavStatus);
    },
    resetBreadCrumbsExcludePath(state, payload) {
      state.breadCrumbsExcludePath = [];
    },
    appendBreadCrumbsExcludePath(state, payload) {
      state.breadCrumbsExcludePath.push(payload);
    },
  },
};
