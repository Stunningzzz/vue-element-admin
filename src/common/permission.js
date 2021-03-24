import store from '@/store';
export default function(accessRoles) {
  // value是 v-permission = xxx 后面的xxx 表示可看到该节点的角色
  // 那么如果当前角色roles中有包含在value中的 那么就可访问 否则不能访问
  let roles = store.getters.roles;
  if (typeof accessRoles === 'string') {
    accessRoles = [accessRoles];
  }
  if (Array.isArray(accessRoles)) {
    return roles.some(role => {
      return accessRoles.includes(role);
    });
  } else {
    throw new Error('the data type of v-permission is invalid');
  }
}
