import { setItem, getItem } from '@/common/storage';
export default {
  namespaced: true,
  state: {
    // 被覆盖的el-menu 不会显示在面包屑上
    breadCrumbsExcludePath: [],
    // 侧边栏是否正在打开或关闭 
    asideNavIsCollapsing: false,
    // 侧边栏当前是打开还是关闭 
    asideNavStatus: getItem('asideNavStatus') === 'true',
    globalSize:getItem('globalSize') || 'default',
  },
  actions: {
    setBreadCrumbsExcludePath({ commit }, payload) {
      payload
        ? commit('appendBreadCrumbsExcludePath', payload)
        : commit('resetBreadCrumbsExcludePath');
    },
  },
  mutations: {
    setGlobalSize(state,payload){
      state.globalSize = payload;
      setItem('globalSize', state.globalSize);
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
