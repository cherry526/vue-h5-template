/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-11 09:40:23
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-11 12:27:41
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import app from './modules/app'

// 动态引入模块js
const context = require.context('./modules', false, /\.js$/);
const moduleStores = {}
context.keys().forEach(key => {
  const fileName = key.slice(2, -3)
  const fileModule = context(key).default
  moduleStores[fileName] = {
    ...fileModule,
    namespaced: true,    //文件中有写可以省略；不过这样写可以不用给每个文件写入
  }
})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app
    ...moduleStores
  },
  getters
})

export default store
