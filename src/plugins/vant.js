/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-12 14:44:21
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-03 15:46:09
 */ 
// 按需全局引入 vant组件
import Vue from 'vue'
import { ActionSheet, Picker, Popup, Skeleton, Dialog, Overlay, Sticky, Lazyload, Swipe, SwipeItem, List, Cell, Tabbar, TabbarItem, Tab, Tabs, Toast, Loading, PullRefresh } from 'vant'

[ ActionSheet, Picker, Popup, Skeleton, Dialog, Overlay, Sticky, Lazyload, Swipe, SwipeItem, List, Cell, Tabbar, TabbarItem, Tab, Tabs, Toast, Loading, PullRefresh].forEach( item =>{
  Vue.use(item)
})

Vue.prototype.$Toast = Toast