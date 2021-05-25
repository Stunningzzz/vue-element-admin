module.exports = [
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
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1', roles: ['admin'] },
                component: 'views/nested/menu1/menu1-2/Menu1-2-1',
              },
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
];
