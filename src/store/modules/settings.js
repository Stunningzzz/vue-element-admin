import { getItem, setItem } from '@/common/storage';
import {fixedHeader,sidebarLogo,primaryColor} from '@/settings';
export default {
  namespaced: true,
  state: {
    // Page Style Setting
    fixedHeader: parseInt(getItem('fixedHeader')) || fixedHeader,
    sidebarLogo: parseInt(getItem('sidebarLogo')) || sidebarLogo,
    // 只是从配置文件中读取的默认主题 不提供修改选项
    primaryColor:getItem('primaryColor') || primaryColor,
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
    setPrimaryColor(state,payload){
      state.primaryColor = payload;
      setItem('primaryColor',payload);
    }
  },
};
