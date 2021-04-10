import axios from 'axios';
import {Message,MessageBox} from 'element-ui';
import store from '../store';


// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
});

instance.interceptors.request.use = (config => {
  if (store.getters.token) {
    config.headers['Authorization'] = store.getters.token;
  }
  return config;
},error => {
  console.log('send request error --- ',error);
  return Promise.reject(error);
})

instance.interceptors.response.use( ({data}) => {
  let {code,message} = data;
  if (code && code !== 200) {
    // token(登录)过期
    if (code === 401) {
      MessageBox.confirm('您已经登出，您可以取消留在此页面，或重新登录', '确认登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/clearToken').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message:message || `Error status code ${code}`,
        type:'error',
        duration:3 * 1000
      })
    }
    return Promise.reject(`Error status code ${code}`)
  } else {
    return data;
  }
},error => {
  console.log(`get response error --- ${error}`);
  Message({
    message:error.message,
    type:'error',
    duration:3 * 1000
  })
  return Promise.reject(error)
})

export default instance;
