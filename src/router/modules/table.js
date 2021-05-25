const Layout = () => import('@/views/layout/Layout');

export default {
  path: '/table',
  meta: { title: '表格', icon: 'table' },
  component: Layout,
  redirect: '/table/dynamic-table',
  alwaysShow: true,
  children: [
    {
      path: 'dynamic-table',
      name: 'Dynamic Table',
      meta: { title: '动态表格' },
      component: () => import('@/views/table/DynamicTable'),
    },
    {
      path: 'drag-table',
      name: 'Drag Table',
      meta: { title: '可拖拽表格' },
      component: () => import('@/views/table/DragTable'),
    },
    {
      path: 'edit-table',
      name: 'Edit Table',
      meta: { title: '可编辑表格' },
      component: () => import('@/views/table/EditTable'),
    },
    {
      path: 'complex-table',
      name: 'Complex Table',
      meta: { title: '综合表格' },
      component: () => import('@/views/table/ComplexTable'),
    }
  ],
};
