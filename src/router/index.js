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
    path:'/redirect/:path(.*)',
    // 直接写 redirect:'/:path' 会把 '/' 转义成 '%2F' 导致路径错误
    // 如果redirect的路径和当前路径相同是不会跳转到
    // 要真正进到path里面去再跳转才能真正刷新
    redirect:to => {
      console.log(to);
      return to.params.path;
    },
    hidden:true,
  },
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

// alwaysShow 只是影响显示效果 即当children.length === 1 时 是否显示成下拉菜单的样子 还是说直接覆盖父亲而显示成item
// 但是有一点 如果当前路由的children大于1 但是要跳转到默认路由没有权限访问 那么在点击当前路由的面包屑跳转到默认
// 路由的时候会出现404
export const asyncRoutes = [
  {
    path: '/nested',
    meta: { title: '嵌套路由', icon: 'nested' },
    component: Layout,
    redirect: 'nested/menu1',
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        meta: { title: '菜单1' },
        component: () => import('@/views/nested/menu1/Menu1'),
        redirect: 'menu1/menu1-1',
        alwaysShow:true,
        children: [
          {
            path:'menu1-1',
            redirect:'menu1-1/menu1-1-1',
            name: 'Menu1-1',
            meta: { title: '菜单1-1' },
            alwaysShow:true,
            component: () => import('@/views/nested/menu1/menu1-1/Menu1-1'),
            children:[
              {
                path: 'menu1-1-1',
                name: 'Menu1-1-1',
                meta: { title: '菜单1-1-1'},
                component: () =>
                  import('@/views/nested/menu1/menu1-1/Menu1-1-1'),
              },
               {
                path: 'menu1-1-2',
                name: 'Menu1-1-2',
                meta: { title: '菜单1-1-2' },
                component: () =>
                  import('@/views/nested/menu1/menu1-1/Menu1-1-2'),
              },
            ]
          },
          {
            
            path: '/absolute/menu1/menu1-2',
            name: 'Menu1-2',
            meta: { title: '菜单1-2'},
            component: () => import('@/views/nested/menu1/menu1-2/Menu1-2'), 
            redirect: '/absolute/menu1/menu1-2/menu1-2-1',
            children: [
              {
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1' },
                component: () =>
                  import('@/views/nested/menu1/menu1-2/Menu1-2-1'),
              },
              {
                path: 'menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: '菜单1-2-2' },
                component: () =>
                  import('@/views/nested/menu1/menu1-2/Menu1-2-2'),
              },
            ],
          },
          {
            path: 'menu1-3',
            name: 'Menu1-3',
            meta: { title: '菜单1-3' },
            component: () => import('@/views/nested/menu1/Menu1-3'),
          },
        ],
      },
      {
        path: 'menu2',
        name: 'Menu2',
        meta: { title: '菜单2' },
        component: () => import('@/views/nested/Menu2'),
      },
      {
        path: 'menu3',
        name: 'Menu3',
        meta: { title: '菜单3' },
        alwaysShow:true,
        component: () => import('@/views/nested/menu3/Menu3'),
        // 当有redirect时 目标路由的roles权限必须是当前路由权限相同!
        // 也就是说能看到当前页面的必定也能看到目标页面
        // 否则的话会导致点击跳转到401
        redirect: 'menu3/menu3-1',
        children: [
          {
            path: 'menu3-1',
            name: 'Menu3-1',
            meta: { title: '菜单3-1' },
            component: () => import('@/views/nested/menu3/Menu3-1'),
          },
        ],
      },
    ],
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    children: [
      {
        path:'/permission/page',
        component: () => import('@/views/permission/Permission'),
        meta: {
          title: '权限',
          icon:'lock',
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

let router = new VueRouter({
  routes: constantRoutes,
  mode: 'history',
});
export default router;
