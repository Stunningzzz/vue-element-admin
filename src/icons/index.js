import Vue from 'vue';
import SvgIcon from './SvgIcon'; // svg component

// 全局注册
Vue.component('svg-icon', SvgIcon);
const req = require.context('./svg', false, /\.svg$/);

const requireAll = requireContext =>
  requireContext.keys().forEach(requireContext);
requireAll(req);

