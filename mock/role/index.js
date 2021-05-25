let Mock = require('mockjs');
// 因为@/router 是通过import 导出的 所以不能通过require导入 但是现在这里又只能用require
// 所以只能copy一份
let routes = require('./router');
let util = require('util');

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: 'views/login/Login',
        hidden: true,
      },
      {
        path: '/',
        component: 'Layout',
        name: 'Layout',
        redirect: '/dashboard',
        children: [
          {
            // 这个在matched对象的path属性里面是'/home'
            path: '/dashboard',
            component: 'views/dashboard/DashBoard',
            name: 'DashBoard',
            meta: {
              title: '首页',
              icon: 'dashboard',
            },
          },
        ],
      },
      {
        path: '/nested',
        meta: { title: '嵌套路由', icon: 'nested' },
        component: 'Layout',
        redirect: 'nested/menu1',
        children: [
          {
            path: 'menu1',
            name: 'Menu1',
            meta: { title: '菜单1' },
            component: 'views/nested/menu1/Menu1',
            redirect: 'menu1/menu1-1',
            alwaysShow: true,
            children: [
              {
                path: 'menu1-1',
                redirect: 'menu1-1/menu1-1-1',
                name: 'Menu1-1',
                meta: { title: '菜单1-1' },
                alwaysShow: true,
                component: 'views/nested/menu1/menu1-1/Menu1-1',
                children: [
                  {
                    path: 'menu1-1-1',
                    name: 'Menu1-1-1',
                    meta: { title: '菜单1-1-1', roles: ['admin'] },
                    component: 'views/nested/menu1/menu1-1/Menu1-1-1',
                  },
                  {
                    path: 'menu1-1-2',
                    name: 'Menu1-1-2',
                    meta: { title: '菜单1-1-2' },
                    component: 'views/nested/menu1/menu1-1/Menu1-1-2',
                  },
                ],
              },
              {
                path: 'menu1-2',
                name: 'Menu1-2',
                meta: { title: '菜单1-2' },
                component: 'views/nested/menu1/menu1-2/Menu1-2',
                redirect: 'menu1-2/menu1-2-1',
                // children的length为0
                children: [
                  {
                    path: 'menu1-2-2',
                    name: 'Menu1-2-2',
                    meta: { title: '菜单1-2-2' },
                    component: 'views/nested/menu1/menu1-2/Menu1-2-2',
                  },
                ],
              },
              {
                path: 'menu1-3',
                name: 'Menu1-3',
                meta: { title: '菜单1-3' },
                component: 'views/nested/menu1/Menu1-3',
              },
            ],
          },
          {
            path: 'menu2',
            name: 'Menu2',
            meta: { title: '菜单2' },
            component: 'views/nested/Menu2',
          },
          {
            path: 'menu3',
            name: 'Menu3',
            meta: { title: '菜单3' },
            // alwaysShow: true,
            component: 'views/nested/menu3/Menu3',
            redirect: 'menu3/menu3-1',
            children: [
              {
                path: 'menu3-1',
                name: 'Menu3-1',
                meta: { title: '菜单3-1' },
                component: 'views/nested/menu3/Menu3-1',
              },
            ],
          },
        ],
      },
      {
        path: '/permission',
        component: 'Layout',
        redirect: 'permission/page',
        meta: {
          title: '权限',
          icon: 'lock',
        },
        alwaysShow: true,
        children: [
          {
            path: 'page',
            component: 'views/permission/PagePermission',
            meta: {
              title: '页面权限',
              roles: ['admin'],
            },
          },
          {
            path: 'directive',
            component: 'views/permission/DirectivePermission',
            meta: {
              title: '指令权限',
            },
          },
          {
            path: 'roles',
            component: 'views/permission/RolesPermission',
            meta: {
              title: '角色权限',
            },
          },
        ],
      },

      {
        path: '*',
        component: 'components/NotFoundPage',
        name: 'NotFoundPage',
        hidden: true,
      },
    ],
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission'), // just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description:
      'Just a visitor. Can only see the home page and the document page',
    routes: [
      {
        path: '',
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard' },
          },
        ],
      },
    ],
  },
];

module.exports = [
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: routes,
      };
    },
  },
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: roles,
      };
    },
  },
  // 添加角色
  {
    url: '/add-role',
    type: 'post',
    response: {
      code: 200,
      data: {
        key: Mock.mock('@integer(300, 5000)'),
      },
    },
  },
  // 更新角色
  {
    url: '/role/[A-Za-z0-9]+$',
    type: 'put',
    response: (request) => {
      console.log(util.inspect(request.body.routes,{depth:null}));
      return {
        code: 200,
        data: {
          status: 'success',
        },
      };
    },
  },
  // 删除角色
  {
    url: '/role/[A-Za-z0-9]+$',
    type: 'delete',
    response: {
      code: 200,
      data: {
        status: 'success',
      },
    },
  },
];
