import Cookies from 'js-cookie';

// 如果value为对象 那么以JSON字符串的形式存储
export function setItem(key, value, option) {
  Cookies.set(key, value, option);
}
export function getItem(key) {
  return Cookies.get(key);
}

export function removeItem(key) {
  Cookies.remove(key);
}
let tokenKey = 'loginToken';
// 注意这里是故意不设置 为了让用户关闭浏览器即清除Item
export function setToken(tokenValue, option) {
  setItem(tokenKey, tokenValue, option);
}

export function getToken() {
  return getItem(tokenKey);
}

export function removeToken() {
  removeItem(tokenKey);
}

let userInfoKey = 'userInfo';
export function setUserInfo(userInfo, option) {
  console.log('setItem --- ', userInfo);
  setItem(userInfoKey, userInfo, option);
}

export function getUserInfo() {
  let userInfo = getItem(userInfoKey);
  return userInfo ? JSON.parse(userInfo) : userInfo;
}

export function removeUserInfo() {
  for (let key in user) {
    removeItem(key);
  }
}
