const Layout = () => import('@/views/layout/Layout');

export default {
  path: '/example',
  meta: { title: '综合实例', icon: 'el-icon-s-help' },
  component: Layout,
  redirect: '/example/article-list',
  alwaysShow: true,
  children: [
    {
      path: 'article-create',
      name: 'Create Article',
      meta: { title: '创建文章', icon: 'el-icon-edit' },
      component: () => import('@/views/example/CreateArticle'),
    },
    {
      path: 'article-list',
      name: 'Article List',
      meta: { title: '文章列表', icon: 'list' },
      component: () => import('@/views/example/ArticleList'),
    },
    {
      path: 'article-edit/:id',
      name: 'Edit Article',
      hidden: true,
      props: true,
      meta: {
        activeMenu: '/example/article-list',
        title:'编辑文章'
      },
      component: () => import('@/views/example/CreateArticle'),
    },
  ],
};
