/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-23 16:26:18
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-06 11:43:26
 */ 
import Vue from 'vue'
import commonFiter from '@/filters/index'
import commonComponents  from '@components/common/index.js'
import commonDirectives from '@utils/directives'
import VueClipboard from 'vue-clipboard2';

// 日期插件
import Moment from 'moment'
//手动引入所需要的语言包
import 'moment/locale/zh-cn';
// 指定使用的语言
Moment.locale('zh-cn');
// 全局引入 按需引入UI库 vant
import './vant'

Vue.use(commonComponents)
   .use(commonFiter)
   .use(commonDirectives)
   .use(VueClipboard)

