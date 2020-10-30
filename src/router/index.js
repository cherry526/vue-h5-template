/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-10-30 12:19:21
 */ 
import Vue from "vue";
import VueRouter from "vue-router";
import baseLayout from '@components/layoutManage/baseLayout'
import Pages from './page'
// 解决路由异常报错问题
const original = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return original.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      name: "entrance",
      component: Pages.entrance,
      componentName: 'entrance/entrance',
      meta: { 
        title: '潮级VIP'
      }
    },
    {
      path: '/common',
      component: baseLayout,
      children: [
        {
          path: '/common/commonMap',
          name: 'commonMap',
          desc: '地图',
          component: Pages.commonMap,
          componentName: 'common/commonMap',
          meta:{
            title:'潮级VIP'
          }
        },
      ]
    },
    {
      path: "/error",
      name: "error",
      componentName: 'error/error',
      component: Pages.error,
      meta: { 
        title: '404'
       }
    },
    {
      path: '*',  // * 表示上面路径匹配不到的都显示这个页面
      name: '404',
      componentName: 'error/404',
      component: Pages['404'],
      meta: { 
        title: '404'
      }
    },
  ];
  


export default new VueRouter({
  // mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
