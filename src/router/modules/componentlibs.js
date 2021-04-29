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
      component: () => import('@/views/componentlibs/richText/RichText.vue'),
    },
    {
      path: 'markdown',
      name: 'Markdown',
      meta: { title: 'Markdown' },
      component: () => import('@/views/componentlibs/markdown/Markdown.vue'),
    },
     {
      path: 'upload',
      name: 'Upload',
      meta: { title: 'Upload' },
      component: () => import('@/views/componentlibs/upload/Upload.vue'),
    },
    {
      path: 'dropzone',
      name: 'Dropzone',
      meta: { title: 'Dropzone' },
      component: () => import('@/views/componentlibs/dropzone/Dropzone.vue'),
    },
    {
      path: 'sticky',
      name: 'Sticky',
      meta: { title: 'Sticky' },
      component: () => import('@/views/componentlibs/sticky/Sticky.vue'),
    },
    {
      path:'count-to',
      name:'CountTo',
      meta:{title:'Count to'},
      component: () => import('@/views/componentlibs/count-to/CountTo'),
    },
    {
      path:'widget',
      name:'Widget',
      meta:{title:'Widget'},
      component: () => import('@/views/componentlibs/widget/Widget'),
    },
  ],
};
