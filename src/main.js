/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-12 14:06:24
 */ 
import Vue from "vue"
import App from "./App.vue"
import router from "./router/index"
import store from "./store"
import './plugins'
import api from '@api/index.js'
import VueLazyLoad from "vue-lazyload"
import VueWechatTitle from 'vue-wechat-title'
import FastClick from 'fastclick'
import './router/permission'
import save from '@utils/save'
import vConsole from 'vconsole'
import '@/styles/iconfont'
import getWXSign from "@/utils/wx"
FastClick.attach(document.body)

// 开发环境下面使用vConsole进行调试 || process.env.NODE_ENV === 'development'
if (process.env.NODE_ENV === 'test' ) {
  new vConsole()
}

// if(window.$mode !== 'hash') {
//   getWXSign().then(wx => {
//     console.log(wx, '-----------wx')
//     window.$wx = wx
//   }).catch(res => {
//     console.log(res, '---------getWXSignError')
//   })
// }
// 全局挂载
window.$mode = router.mode
window.$eventBus = new Vue()
Vue.prototype.$api = api
Vue.prototype.$save = window.$save = save


// 图片懒加载
Vue.use(VueLazyLoad,{
    preLoad: 1.3,                               // 预加载
    error: 'https://toss.wbgj.cn/permission/15971270910001597127091489_516349.png',   // 错误时显示
    loading: 'https://toss.wbgj.cn/permission/15971270530001597127053388_111205.png', // 加载时显示
    attempt: 1                                 // 每次加载多少张
})

// 设置title
Vue.use(VueWechatTitle)

Vue.config.devtools = true;
Vue.config.productionTip = false;

var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vue