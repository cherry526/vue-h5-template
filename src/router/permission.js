/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-17 14:20:28
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-17 14:30:32
 */ 
import router from '@/router/index.js'

// 不重定向白名单
const whiteList = ['/error'] 

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  
})