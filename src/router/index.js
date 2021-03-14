import Vue from 'vue';
import VueRouter from 'vue-router';

// // 解决页面路由重复点击报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

const Layout = () => import('@/views/layout/Layout');

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    name: 'Layout',
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
    path: '/nested',
    meta: { title: '嵌套路由', icon: 'nested' },
    component: Layout,
    redirect: '/nested/Menu1',
    children: [
      {
        // 把最后一个/menu1换成
        path: '/nested/menu1',
        name: 'Menu1',
        meta: { title: '菜单1' },
        component: () => import('@/views/nested/menu1/Menu1'),
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: '/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: '菜单1-1' },
            component: () => import('@/views/nested/menu1/Menu1-1'),
          },
          {
            path: '/nested/menu1/menu1-2',
            name: 'Menu1-2',
            meta: { title: '菜单1-2' },
            component: () => import('@/views/nested/menu1/menu1-2/Menu1-2'),
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            children: [
              {
                path: '/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1' },
                component: () =>
                  import('@/views/nested/menu1/menu1-2/Menu1-2-1'),
              },
              {
                path: '/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: '菜单1-2-2' },
                component: () =>
                  import('@/views/nested/menu1/menu1-2/Menu1-2-2'),
              },
            ],
          },
          {
            path: '/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: '菜单1-3' },
            component: () => import('@/views/nested/menu1/Menu1-3'),
          },
        ],
      },
      {
        path: '/nested/menu2',
        name: 'Menu2',
        meta: { title: '菜单2' },
        component: () => import('@/views/nested/Menu2'),
      },
      {
        path: '/nested/menu3',
        name: 'Menu3',
        meta: { title: '菜单3' },
        alwaysShow:true,
        component: () => import('@/views/nested/menu3/Menu3'),
        redirect:'/nested/menu3/menu3-1',
        children: [
          {
            path: '/nested/menu3/menu3-1',
            name: 'Menu3-1',
            meta: { title: '菜单3-1' },
            component: () => import('@/views/nested/menu3/Menu3-1'),
          },
        ],
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

let router = new VueRouter({
  routes: constantRoutes,
  mode: 'history',
});
export default router;
