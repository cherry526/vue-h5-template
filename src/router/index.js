/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-17 14:29:16
 */ 
import Vue from "vue";
import VueRouter from "vue-router";

let _import = null
if (process.env.NODE_ENV === 'development') {
  _import = file => require('@/views/' + file + '.vue').default
} else {
  _import = file => () => import('@/views/' + file + '.vue')
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/error",
    name: "error",
    component: _import('error'),
    meta: { 
      title: '404'
     }
  },
  {
    path: "/",
    name: "init",
    component: _import('init'),
    meta: { 
      title: 'h5'
     }
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes
})


// 全局路由守卫
router.beforeEach((to, from, next) => {
  next();
})

router.afterEach((to, from, next) => {
  window.scrollTo(0,0);
})
export default router;
