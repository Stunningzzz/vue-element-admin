import router from '@/router';
import store from '@/store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/common/storage'; // get token from cookie
import { getPageTitle } from '@/common/utils';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  document.title = getPageTitle(to.meta.title);

  const token = getToken();

  if (token) {
    // 说明已经登录 不需要重定向到/login
    if (to.path === '/login') {
      next('/');
    } else {
      const roles = store.getters.roles;
      if (roles && roles.length > 0) {
        next();
      } else {
        try {
          // 拉取用户信息
          let { roles } = await store.dispatch('user/getInfo');
          let accessRoutes = await store.dispatch('permission/generateRoutes', roles);

          router.addRoutes(accessRoutes);
          // 怎么确保next执行时addRoutes已完成?
          // next({ ...to, replace: true });
          next(to.path);
        } catch (error) {
          // 需要重新登录的操作一般都需要重新设置token
          store.dispatch('user/resetToken').then(() => {
            Message.error(error || 'Has Error');
            next(`/login?redirect=${to.path}`);
          });
        }

      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // /被转义成了 => '%2F'
      console.log('/login.to.path', to.path);
      next(`/login?redirect=${to.path}`);
    }
    // 要保证调用一次beforeEnter函数只触发一次next函数 所以这里要放在else里面
  }
});

router.afterEach(() => {
  NProgress.done();
});
