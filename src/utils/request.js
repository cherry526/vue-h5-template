/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-11 10:12:19
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-08 15:23:14
 */ 
// import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
const get_sign = require('./md5.js').get_param_sign
import { Toast, Loading } from 'vant'

const { VUE_APP_BASE_URL }  = require('@/config/index.js')

// 创建axios实例
const service = axios.create({
  baseURL: VUE_APP_BASE_URL,
  timeout: 15000, // 请求超时时间
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Cache-Control': 'max-age=60',
    'Visit-Type': 'vip-h5'
  },
  // 用于get
  paramsSerializer: params => {
    // return qs.stringify(params,{
    //   arrayFormat: 'indices'
    // })
    // 对数组的处理'a[0]=b&a[1]=c'
  },
  // 用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  transformRequest: [function (data) {
    // return qs.stringify(data,{ indices: false })
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      return data
    }
    data = JSON.stringify(data)
    // console.log(data,'--------------data')
    return data
  }],
})

// request拦截器
service.interceptors.request.use(config => {  
  // console.log(config, '-----------------请求头')
  return config
}, error => {
  console.log(error) 
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return new Promise((resolve, reject) => {
      const res = response.data
      // if(!res.state) {
      //   Toast(res.message)
      // }

      if (!res) {
        reject(res || 'error')
      } else {
        if (res.code === 9 && res.message === '未授权') {
          window.$eventBus.$emit('handleCode', res.code)
        } 
        resolve(res)
      }

    })
  },
  error => {
    return Promise.reject(error)
  }
)

const http = (config, data = {}, method = "post" ) => {
  if(Object.prototype.toString.call(config) === '[object Object]') {
    return service(config)
  } else { // 处理微信小程序的 请求一致性 封装成fromData对象  默认post请求  参数1：url 参数2：请求参数
    !data && (data = {}) 
    let lastData = get_sign(data)
    let formdata = new FormData();
    Object.keys(lastData).forEach((key) => {
      formdata.append(key, lastData[key]);
    });
    let wxConfig = {
      url: config,
      data: formdata,
      method: method
    }
    // console.log(wxConfig, 'wxConfig')
    return service(wxConfig)
  }
}

export default http
// export default service
