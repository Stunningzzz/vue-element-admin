const Layout = () => import('@/views/layout/Layout');
export default {
  path: '/componentlibs',
  meta: { title: '组件库', icon: 'component' },
  component: Layout,
  redirect: '/componentlibs/tinymce',
  alwaysShow:true,
  children: [
    {
      path: 'richtext',
      name: 'RichText',
      meta: { title: 'RichText' },
      component: () => import('@/views/componentlibs/RichText/RichText.vue'),
    },
    {
      path: 'markdown',
      name: 'Markdown',
      meta: { title: 'Markdown' },
      component: () => import('@/views/componentlibs/Markdown/Markdown.vue'),
    },
  ],
};
