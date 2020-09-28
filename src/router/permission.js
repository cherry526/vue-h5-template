/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-17 14:20:28
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-06 19:27:42
 */ 
import router from '@/router/index.js'

// 不重定向白名单
const whiteList = ['/error'] 
let routeHisotry = []
router.beforeEach((to, from, next) => {
  let token = $save.get('session', 'token')
  // routeHisotry.push(to.path)
  // if(routeHisotry.length > 1 ) {
  //    if(routeHisotry[routeHisotry.length - 3] === to.path) {
  //     routeHisotry.splice(routeHisotry.length - 2, 2)
  //    }
  // }
  // console.log(to.path, from.path, '路由管理', token, routeHisotry, routeHisotry[routeHisotry.length - 3])
  // 处理异常进入入口路由
  if(token && to.path === '/') {
    next({
      path: '/index/home'
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  window.scrollTo(0,0);
})