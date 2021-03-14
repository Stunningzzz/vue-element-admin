import { constantRoutes, asyncRoutes } from '@/router';

function hasPermission(roles,{meta}){
  return !(meta?.roles) || roles.some(role => meta.roles.includes(role));
}

function getAccessAsyncRoutes(asyncRoutes, roles) {
  // 为什么是一个数组呢? 因为对于最外层而言是一个数组 对于子路由而言也是一个数组
  const res = []
  asyncRoutes.forEach(route => {
    // 浅克隆 为什么不直接用呢? 因为这里会改变route对象的children属性
    const tmp = { ...route }
    // 如果具有访问权限的话 把该路由添加到结果数组里面
    if (hasPermission(roles, tmp)) {
      // 如果该路由还有子路由的话 进一步筛选留下可访问的子路由
      if (tmp.children) {
        tmp.children = getAccessAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export default {
  namespaced:true,
  state: {
    accessRoutes: [],
    addRoutes: [],
  },
  mutations: {
    SET_ACCESSROUTES(state, accessRoutes) {
      state.accessRoutes = accessRoutes;
    },
    SET_ADDROUTES(state, addRoutes) {
      state.addRoutes = addRoutes;
    },
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise((resolve, reject) => {
        let accessAsyncRoutes;
        if (roles.includes('admin')) {
          accessAsyncRoutes = asyncRoutes || [];
        } else {
          accessAsyncRoutes = getAccessAsyncRoutes(asyncRoutes, roles);
        }
        commit('SET_ADDROUTES', accessAsyncRoutes);
        commit('SET_ACCESSROUTES', [...constantRoutes,...accessAsyncRoutes]);
        console.log('accessAsyncRoutes --- ',accessAsyncRoutes);
        resolve(accessAsyncRoutes);
      });
    },
  },
};
