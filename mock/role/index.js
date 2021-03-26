let Mock = require('mockjs');
// 因为@/router 是通过import 导出的 所以不能通过require导入 但是现在这里又只能用require
// 所以只能copy一份
let routes = require('./router');

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

module.exports =  [
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: routes
      }
    }
  },
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: roles
      }
    }
  },
  // 添加角色
  {
    url: '/add-role',
    type: 'post',
    response: {
      code: 200,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  // 更新角色
  {
    url: '/role/[A-Za-z0-9]+$',
    type: 'put',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  },
  // 删除角色
  {
    url: '/role/[A-Za-z0-9]+$',
    type: 'delete',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  }
]
