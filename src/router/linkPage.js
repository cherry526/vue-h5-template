/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-27 16:31:55
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-11 16:05:26
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
    [ ['首页', 'APP_INDEX', 'PAGE_INDEX', 'SPECIAL_SELL_LIST'], 'home'],
    [ ['大礼包', 'ACT_GIFT_PACKAGE', 'BANNER_OUTSIDE_BIG_GIFT_PAGE'], 'giftBag'],
    [ ['特卖', 'ACT_SPECIAL_OFFER', 'BANNER_SPECIAL_SELL_PAGE', 'BANNER_SELF_TRAVEL_SPECIAL_ACT'], 'specialSale'],
    [ ['特卖活动成功页', 'ACT_SUCCESS'], 'specialSaleSuccess'],
    [ ['会员中心', 'VIP_CENTER'], 'center'],
    [ ['会员权益', 'VIP_EQUITY', 'RECHARGE_VIP'], 'joinVip'],
    [ ['卡券详情', 'CARD_DETAIL'], 'couponDetail'],
    [ ['自我游卡券详情', 'TRAVEL_CARD_DETAIL'], 'travelCardDetails'],
    [ ['卡券列表', 'CARD_LIST'], 'couponList'],
    [ ['订单详情', 'ACT_ORDER_DETAIL'], 'orderDetail'],
    // [ ['拼团', 'ACT_ASSEMBLE', 'ACT_ASSEMBLE_QRCODE], 'spellGroup'],
    // [ ['拼团结果页', 'ASSEMBLE_JOIN_INFO'], 'spellGroupResult'],
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
  // // 首页
  // static jumpIndex = (query) => {
  //   this.jumpPage('home', query)
  // }
}

