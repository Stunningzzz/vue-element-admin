import { getItem, setItem } from '@/common/storage';

export default {
  namespaced: true,
  state: {
    // Page Style Setting
    fixedHeader: parseInt(getItem('fixedHeader')) || 0,
    sidebarLogo: parseInt(getItem('sidebarLogo')) || 0,
    // 只是从配置文件中读取的默认主题 不提供修改选项
    defaultSettingsColor:'',
  },
  mutations: {
    setFixedHeader(state, payload) {
      state.fixedHeader = payload;
      setItem('fixedHeader', payload);
    },
    setSidebarLogo(state, payload) {
      state.sidebarLogo = payload;
      setItem('sidebarLogo', payload);
    },
 
  },
};
