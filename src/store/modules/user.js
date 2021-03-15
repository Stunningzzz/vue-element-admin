import { login as userLogin, getInfo as userGetInfo, logout as userLogout } from '@/network/user';
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  removeUserInfo,
} from '@/common/storage';
export default {
  namespaced:true,
  state: {
    // token表示用户是否登录 有登录就有token
    token: getToken(),
    username: '',
    avatar: '',
    // 对于roles 因为roles不存cookie 所以每次刷新页面roles都会重置 所以在permission.js中
    // 需要重新判断roles是否为空 为空则拉取
    roles: [],
    introduction: '',
  },
  mutations: {
    SET_TOKEN(state, tokenValue) {
      state.token = tokenValue;
    },
    SET_USERNAME(state, username) {
      state.username = username;
    },
    SET_AVATAR(state, avatar) {
      state.avatar = avatar;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
  },
  actions: {
    login({ commit }, userInfo) {
      let { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        userLogin({ username: username.trim(), password })
          .then(({ token }) => {
            setToken(token);
            commit('SET_TOKEN', token);
            // setUserInfo(userInfo, { expires: 7 });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userGetInfo(state.token)
          .then(data => {
            
            if (!data) {
              reject('验证失败 请重新登录!');
            }
            const { roles, username, avatar, introduction } = data;
            if (roles && roles.length > 0) {
              commit('SET_ROLES', roles);
            } else {
              reject('getInfo: roles必须为数组且不为空');
            }
            commit('SET_USERNAME', username);
            commit('SET_AVATAR', avatar);
            commit('SET_INTRODUCTION', introduction);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    logout({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        userLogout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            removeToken();
            commit('SET_ROLES', []);

            // resetRouter()

            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      });
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        commit('SET_ROLES', []);

        resolve();
      });
    },
    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
      const token = role + '-token';

      commit('SET_TOKEN', token);
      setToken(token);

      const { roles } = await dispatch('user/getInfo');

      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true,
      });
      // dynamically add accessible routes
      router.addRoutes(accessRoutes);

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true });
    },
  },
};
