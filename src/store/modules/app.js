import {setItem,getItem} from '@/common/storage'
export default {
  namespaced:true,
  state: {
    // 对象数组 对象里面是面包屑导航的path和title
    breadCrumbs: [],
    percentage: 0,
    // 页面是否在加载
    isLoading: true,
    // 侧边栏是否正在打开或关闭
    asideNavIsCollapsing: false,
    // 侧边栏当前是打开还是关闭
    asideNavStatus:getItem('asideNavStatus') === 'true',
  },
  mutations: {
    setBreadCrumbs(state, payload) {
      state.breadCrumbs = payload;
    },
    setPercentage(state, payload) {
      state.percentage = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setAsideNavIsCollapsing(state, payload) {
      state.isCollapsing = payload;
    },
    toggleAsideNavStatus(state){
      state.asideNavStatus = !state.asideNavStatus;
      setItem('asideNavStatus',state.asideNavStatus)
    }
  },
};
