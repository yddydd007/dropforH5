import axios from 'axios';
import qs from 'qs';
import md5 from './md5'
import sortObj from './sort'
import { Toast } from 'vant'
var baseHost = 'http://api.dropstore.cn';
const originUrl = window.location.origin;


axios.defaults.withCredentials = false;
axios.defaults.baseURL = baseHost;
axios.defaults.timeout = '60000';

var userHeader = {};

// 添加一个(请求)拦截器
axios.interceptors.request.use(function (config) {
  let url = config.url;
  if (url.indexOf("login") > -1) {
    localStorage.setItem('token','')
    config.headers['Authorization'] = "";
  } else if(url.indexOf("do_add_activity_user") > -1){
    config.headers["Authorization"] = localStorage.getItem('token') || '';
  }
  return config;
  // Do something before request is sent
})
// // 添加一个响应拦截器
axios.interceptors.response.use(function (response) {

  if (response.status >= 200 && response.status < 400) {
    if (response.data.callbackCode === 1) {
      return response.data;
    }

    Toast(response.data.callbackMsg);
    throw new Error(response.data.callbackMsg);
  }
  // Do something with response data
  return response;
}, function (error) {
  // 获取到响应拦截器里返回的的error
  if (error.response) {
    Toast(error.response.data.callbackMsg);
    return error.response.data;
  }
  // 请求超时
  if (error.code === 'ECONNABORTED' && error.request._response === 'timeout') {
    // Toast(Strings.connectTimeout);
    throw new Error(`CONNECT TIMEOUT------URL:${url}------ERROR:${error}`);
  }
  throw new Error(`ERROR TO REQUEST------URL:${url}------ERROR:${error}`);
  // Do something with response error
  return Promise.reject(error);
});

export default {
  baseHost: baseHost,
  // userHeader: JSON.parse(sessionStorage['userHeader']),
  /**
   * post请求
   * @param url
   * @param data
   * @param successCallback
   * @param errorCallback
   * @param type 参数类型 默认from
   */
  post(url, data, successCallback, errorCallback, type = 'form') {
    const parmas = { ...data, timestamp: Date.now() };
    if (type == 'json') {
      // 发送json格式数据到后台
      axios({
        method: 'post',
        url: url,
        data: { ...parmas, token: md5(encodeURIComponent(sortObj(parmas))) },
        headers: {'Content-Type': 'application/json'},
      }).then(function (res) {
        successCallback(res);
      }.bind(this)).catch(function (err) {
        errorCallback(err);
      })
    } else if (type == 'form') {
      // 发送formDate数据到后台
      axios({
        method: 'post',
        url: baseHost + url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify({ ...parmas, token: md5(encodeURIComponent(sortObj(parmas))) })
      }).then(function (res) {
        successCallback(res);
      }.bind(this)).catch(function (err) {
        errorCallback(err);
      })
    } else if (type == 'parmes') {
      // 在post方式下 但是像Get方式一样
      // 将参数拼接到url后面发送到后台
      axios({
        method: 'post',
        url: baseHost + url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        params: { ...parmas, token: md5(encodeURIComponent(sortObj(parmas))) },
        paramsSerializer(params) {
          return qs.stringify(params, {arrayFormat: 'repeat'})
        },
      }).then(function (res) {
        successCallback(res);
      }.bind(this)).catch(function (err) {
        errorCallback(err);
      })
    }
  },
  get(url, data, Callback, errorback) {
    axios({
      method: 'get',
      params: { ...parmas, token: md5(encodeURIComponent(sortObj(parmas))) },
      url: baseHost + url,
    }).then(function (res) {
      Callback(res);
    }.bind(this)).catch(function (err) {
      errorback(err);
    })
  },
}
