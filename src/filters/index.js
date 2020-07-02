/*
 * @Description: 过滤器
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-17 14:45:06
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-23 16:51:13
 */ 
import Vue from "vue"
import common from './common'

const filters = {
  ...common
}

export default (Vue) => {
  // 枚举值过滤
  for(let key in filters){
    Vue.filter(key, filters[key])
  }
}
