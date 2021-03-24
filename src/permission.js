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
      // 在登录完成后 点击后退按钮去/login就会来这里 因为next的路径'/'含redirect 且redirect的最终路径就是当前路径
      // 所以后面的步骤会取消后面的步骤 也就不会触发afterEach
      next('/');
      NProgress.done();
    } else {
      const roles = store.getters.roles;
      if (roles && roles.length > 0) {
        next();
      } else {
        try {
          // 拉取用户信息
          let { roles } = await store.dispatch('user/getInfo');
          let accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          );

          router.addRoutes(accessRoutes);
          // 怎么确保next执行时addRoutes已完成?
          // next({ ...to, replace: true });
          next(to.path);
        } catch (error) {
          // 需要重新登录的操作一般都需要重新设置token
          store.dispatch('user/clearToken').then(() => {
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
      next(`/login?redirect=${to.path}`);
      NProgress.done();
      // 当点击logout按钮退出后 再点回退按钮要回去时会触发这里 这时候刚好next(当前路径)
      // 那么就会直接取消下面的全部步骤 所以afterEach不会被触发 要手动触发done
    }
    // 要保证调用一次beforeEnter函数只触发一次next函数 所以这里要放在else里面
  }
});

router.afterEach(() => {
  console.log('Nprogress.done()');
  NProgress.done();
});
