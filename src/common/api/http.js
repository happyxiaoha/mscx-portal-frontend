/* 全局http处理 */
import axios from 'axios'
// import { Loading, MessageBox } from 'element-ui';

// var loadingInstance;
// 设置超时时间 默认10s;
axios.defaults.timeout = 10 * 1000
axios.defaults.withCredentials = true
axios.defaults.baseURL = ''

axios.interceptors.request.use(function (config) {
  // config.url = config.url
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    config.cache = false
  }
  // loadingInstance = Loading.service({ fullscreen: true })
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // loadingInstance.close();
  if (response.data.code === '500800') {
    var currentUrl = window.location.href;
    location.href = '/login.html' + '?service='+ encodeURIComponent(currentUrl);
    return Promise.reject(response.data)
  // 全局错误信息的提示，建议各自页面处理，全局弹层提示错误体验不佳
  } else if (response.data.status === 'ERROR') {
    
    // 未授权的情况
    if (response.data.code === '500900' || response.data.code === '500910') {
      location.href = '/userInfo.html#user/auth';
    }
    return Promise.reject(response.data)
  }
  return response.data
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

export default axios
