const Layout = () => import('@/views/layout/Layout');
export default {
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
      alwaysShow: true,
      children: [
        {
          path: 'menu1-1',
          redirect: 'menu1-1/menu1-1-1',
          name: 'Menu1-1',
          meta: { title: '菜单1-1' },
          alwaysShow: true,
          component: () => import('@/views/nested/menu1/menu1-1/Menu1-1'),
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu1-1-1',
              meta: { title: '菜单1-1-1',roles:['admin'] },
              component: () => import('@/views/nested/menu1/menu1-1/Menu1-1-1'),
            },
            {
              path: 'menu1-1-2',
              name: 'Menu1-1-2',
              meta: { title: '菜单1-1-2' },
              component: () => import('@/views/nested/menu1/menu1-1/Menu1-1-2'),
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu1-2',
          meta: { title: '菜单1-2' },
          component: () => import('@/views/nested/menu1/menu1-2/Menu1-2'),
          redirect: 'menu1-2/menu1-2-1',
          children: [
            {
              path: 'menu1-2-1',
              name: 'Menu1-2-1',
              meta: { title: '菜单1-2-1',roles:['admin'] },
              component: () => import('@/views/nested/menu1/menu1-2/Menu1-2-1'),
            },
            {
              path: 'menu1-2-2',
              name: 'Menu1-2-2',
              meta: { title: '菜单1-2-2',roles:['admin']  },
              component: () => import('@/views/nested/menu1/menu1-2/Menu1-2-2'),
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
      // alwaysShow: true,
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
};
