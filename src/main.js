import Vue from 'vue';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import '@/assets/css/base.scss';
import '@/icons';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import '@/permission';

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: store.getters.globalSize,
});
Vue.prototype.$bus = new Vue();


if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}


new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
