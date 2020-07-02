/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-11 10:12:19
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-22 16:14:09
 */ 
// import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
// import get_sign from './md5'
// import qs from 'qs'
const defaultSettings = require('@/config/index.js')
const { VUE_APP_BASE_URL } = defaultSettings

// 创建axios实例
const service = axios.create({
  baseURL: VUE_APP_BASE_URL,
  timeout: 15000, // 请求超时时间
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
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
    return data
  }],
})

// request拦截器
service.interceptors.request.use(config => {
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
      if(!response.data){
        reject(res || 'error')
      }else{
        resolve(res)
      }
    })
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
