import Vue from 'vue'
 
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/icons';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/assets/css/base.scss';
import '@/permission';

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: store.getters.globalSize, // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.prototype.$bus = new Vue();
// Vue.prototype.$set = Vue.$set;

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

