import Vue from 'vue';
import VueRouter from 'vue-router';

// // 解决页面路由重复点击报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

// alwaysShow 只是影响显示效果 即当children.length === 1 时 是否显示成下拉菜单的样子 还是说直接覆盖父亲而显示成item
// 但是有一点 如果当前路由的children大于1 但是要跳转到默认路由没有权限访问 那么在点击当前路由的面包屑跳转到默认
// 路由的时候会出现404

import Layout from '@/views/layout/Layout';
import Theme from '@/views/theme/Theme';
import nested from './modules/nested';
import permission from './modules/permission';
import componentlibs from './modules/componentlibs';

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
    hidden: true,
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/Profile'),
        meta: {
          title: 'Profile',
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        // 这个在matched对象的path属性里面是'/home'
        path: '/dashboard',
        component: () => import('@/views/dashboard/DashBoard'),
        name: 'DashBoard',
        meta: {
          title: '首页',
          icon: 'dashboard',
        },
      },
    ],
  },
];
export const asyncRoutes = [
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import('@/views/guide/Guide'),
        meta: {
          title: '引导页',
          icon: 'guide',
        },
      },
    ],
  },
  nested,
  permission,
  componentlibs,
  {
    path: '/theme',
    component: Layout,
    redirect: '/theme/index',
    children: [
      {
        path: 'index',
        name:'Theme',
        component: Theme,
        meta:{
          title:'Theme',
          icon:'theme',
        }
      },
    ],
  },
  {
    path: '/icons',
    component: Layout,
    redirect: '/icons/index',
    children: [
      {
        path: 'index',
        name: 'Icons',
        component: () => import('@/views/icons/Icons'),
        meta: {
          title: '图标库',
          icon: 'icon',
        },
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/components/common/NotFoundPage'),
    name: 'NotFoundPage',
    hidden: true,
  },
];

function createRouter() {
  return new VueRouter({
    routes: constantRoutes,
  });
}
let router = createRouter();
export function resetRouter() {
  let newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
