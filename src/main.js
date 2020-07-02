/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-02 16:22:20
 */ 
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import api from '@api/index.js'
import VueLazyLoad from "vue-lazyload"
import VueWechatTitle from 'vue-wechat-title'
import FastClick from 'fastclick'
import Lockr from 'lockr'
import './plugins'
import './router/permission'
import getWXSign from "@/utils/wx"
import save from '@utils/save'


// 移动端适配
import 'lib-flexible/flexible.js'
FastClick.attach(document.body)


// 全局挂载
Vue.prototype.$api = api
Vue.prototype.$lockr =  window.$lockr = Lockr
Vue.prototype.$save = window.$save = save
getWXSign().then(wx => {
  Vue.prototype.$wx = window.$wx = wx
})


// 图片懒加载
Vue.use(VueLazyLoad,{
    preLoad: 1.3,                               // 预加载
    // error:require("./assets/musicLogo.png"),   // 错误时显示
    // loading:require("./assets/musicLogo.png"), // 加载时显示
    attempt: 1                                  // 每次加载多少张
})

// 设置title
Vue.use(VueWechatTitle)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
