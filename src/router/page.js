/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-08-06 19:56:36
 * @LastEditors: cherry
 * @LastEditTime: 2020-10-30 12:14:10
 */

let dev = !!process.env.NODE_ENV === 'development'

const common = {
  commonMap: dev ? require('@/views/common/commonMap').default : () => import('@/views/common/commonMap'),
}

// 页面管理
const page = {
  // 入口
  entrance: dev ? require('@/views/entrance/entrance').default : () => import('@/views/entrance/entrance'),
  // 错误
  error: dev ? require('@/views/error/error').default : () => import('@/views/error/error'),
  '404': dev ? require('@/views/error/404').default : () => import('@/views/error/404'),
}

module.exports = page      