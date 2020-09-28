/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-08-06 19:56:36
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-07 18:48:40
 */

let dev = !!process.env.NODE_ENV === 'development'

const common = {
  commonMap: dev ? require('@/views/common/commonMap').default : () => import('@/views/common/commonMap'),
}

// 首页
const home = {
  home: dev ?  require('@/views/home/home').default : () => import('@/views/home/home'),
}

// 会员中心
const center = {
  center: dev ? require('@/views/center/center').default : () => import('@/views/center/center'),
}

// 页面管理
const page = {
  // 入口
  entrance: dev ? require('@/views/entrance/entrance').default : () => import('@/views/entrance/entrance'),
  ...home,
  ...center,
  // 错误
  error: dev ? require('@/views/error/error').default : () => import('@/views/error/error'),
  '404': dev ? require('@/views/error/404').default : () => import('@/views/error/404'),
}

module.exports = page      