/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-27 16:31:55
 * @LastEditors: cherry
 * @LastEditTime: 2020-10-30 12:13:49
 */ 
import App from "../main.js"
import { Dialog, Toast} from 'vant'
 
export default class linkPage {
  constructor() {}
    /**
   * @description: 路由数据  
   * @param key： 跳转类型
   * @param value：路由name值 若字符串携带jump即自定义跳转 ！！！
   * @return: 
   * @Date: 2020-08-11 15:23:24
   * @author: cherry
   */
  static pageMap =  new Map([
    // [ ['首页', 'APP_INDEX', 'PAGE_INDEX', 'SPECIAL_SELL_LIST'], 'home'],
  ])
  // 跳转页面方法
  static jumpPage = (name, query = {}, fn) => {
    fn && fn()
    let routerType = query && query.entrance ? 'replace' : 'push'
    App.$router[routerType]({ name , query })
  }
  // 跳转所有页面
  static linkPage = (initName, query = {}) => {
    this.pageMap.forEach((key, value) => {
      if(value.includes(initName)) {
        // 自定义跳转方法
        if(key.includes('jump')) {
          this[key](query)
        } else {
          this.jumpPage(key, query)
        }
      }
    })

    if (query.popup && query.message) {
      // 判断是否弹窗
      setTimeout(()=> {
        Dialog.alert({
          title: '提示',
          message: query.message
        }).then(() => {
          
        })
      }, 300)
    }
  }
}

