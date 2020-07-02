/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-23 16:26:18
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-28 15:27:59
 */ 
import Vue from 'vue'
import commonFiter from '@/filters/index'
import commonComponents  from '@components/common/index.js'
import commonDirectives from '@utils/directives'
// 全局引入 按需引入UI库 vant
import '@/plugins/vant'

Vue.use(commonComponents)
   .use(commonFiter)
   .use(commonDirectives)

