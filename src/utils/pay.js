/*
 * @Description: 
 * @Version: 1.0
 * @Autor: yesong
 * @Date: 2020-05-15 17:17:21
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-08 14:06:05
 */
import api from '@/api'
import router from '@/router'
import utils from './utils'
import getWXSign from './wx'
import { Dialog, Toast} from 'vant'
const orderPay = {
   /**
    * @description: 活动下单
    * @param {Object} dealData 活动下单参数
    * @return: Promise
    * @author: yesong
    */   
  actDeal(dealData, actInfo = {}) {
    Toast.loading({
      message: '下单中...',
      forbidClick: true,
      duration: 0
    });
    if (this.isCanClick) return
    this.isCanClick = true
    return api.actDeal({
      ...dealData
    }).then(res => {
    
      if (res.code == 510 || res.code == 511 || res.code == 1150){
        Dialog.alert({
          message: res.message
        }).then(() => {
          router.push('/index/home')
        })
      } else if (res.code == 1250) {
        // 下单价格与第三方价格不一致
        Dialog.alert({
          message: '订单信息已调整，请刷新页面重新下单'
        }).then(() => {
          router.go(-1)
        })
      } else if (res && res.desc && (res.desc.indexOf('产品已经下架或者价格已经过期') > -1 || res.desc.indexOf('已经销售完毕') > -1)) {
        // 自我游卡券已售罄提示
        Dialog.alert({
          title: '已售罄',
          message: '已经卖完啦，下次要抢快一点哦~'
        })
      } else if (res && res.desc && res.desc.indexOf('联系人不正确') > -1) {
        Toast('联系人不正确, 不能进行预订!')
      } else if (res.code != 22 || res.code != 23) {
        // code 22 || 23 为重复提交
        Toast(res.message)
      }
      return res
    }).finally(()=> {
      setTimeout(()=> {
        Toast.clear()
        this.isCanClick = false
      }, 300)
    })
   
  },

  /**
   * @description: 活动支付
   * @param {String} tradeId 订单ID
   * @return: Promise
   * @author: yesong
   */
  async actPay(tradeId, payInfo='') {
    if (this.isCanOrder) return
    let $wx;
    try {
      $wx = await getWXSign()
    } catch (error) {
      console.log(error)
    }
    this.isCanOrder = true
    Toast.loading({
      message: '准备支付...',
      forbidClick: true,
      duration: 0
    });
    if (utils.getJRE() === 'mini') {
      return new Promise((resolve, reject) => {
        // 跳转小程序支付
        $wx.miniProgram.navigateTo({
          url: `/pages/doydPay/doydPay?tradeId=${tradeId}`
        })
        setTimeout(()=> {
          Dialog.alert({
            title: '确认支付',
            message: '是否确认已支付完成！',
          }).then(() => {
            resolve()
          });
        }, 300)
      })
      
    } else if (utils.getJRE() === 'wx') {
      // 微信h5支付
      return new Promise((resolve, reject) => {
        if (payInfo == '') { 
          // 订单继续支付
          api.actPay({
            tradeId,
            payType: 'PAY_Applet'
          }).then(res => {
            if (res.state) {
              $wx.chooseWXPay({
                timestamp: res.info.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: res.info.nonceStr, // 支付签名随机串，不长于 32 位
                package: res.info.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: res.info.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: res.info.paySign, // 支付签名
                success: function (res) {
                  if(res.errMsg == "chooseWXPay:ok" ) {
                    // 支付成功后的回调函数
                    resolve(tradeId) // 支付成功
                  } else {
                    res.cancelPay = true // 取消支付
                    reject(res) // 支付失败
                  }
                },
                fail (res) {
                  res.cancelPay = true // 取消支付
                  reject(res) // 支付失败
                  Toast('支付失败')
                },
                complete: (res)=> {
                  if (res.errMsg == 'chooseWXPay:cancel') {
                    // 取消支付
                    res.cancelPay = true // 取消支付
                    reject(res) // 支付失败
                    Toast('取消支付')
                  }
                }
              });
      
            } else if (res.code == "508" || res.code == "509" || res.code == "1412") {
              // 508 会员过期时，无法支付订单，订单自动取消。 509订单已过期
              reject(res)
            } else {
              setTimeout(() => {
                Toast(res.message)
              }, 100)
            }
          }).finally(() => {
            Toast.clear()
            setTimeout(()=> {
              this.isCanOrder = false
            }, 300)
          })
        } else {
          $wx.chooseWXPay({
            timestamp: payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: payInfo.nonceStr, // 支付签名随机串，不长于 32 位
            package: payInfo.package || payInfo.package1, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: payInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: payInfo.paySign || payInfo.againSign, // 支付签名
            success: function (res) {
              if(res.errMsg == "chooseWXPay:ok" ) {
                // 支付成功后的回调函数
                resolve(tradeId) // 支付成功
              } else {
                res.cancelPay = true // 取消支付
                reject(res) // 支付失败
              }
            },
            fail (res) {
              res.cancelPay = true // 取消支付
              reject(res) // 支付失败
              Toast('支付失败')
            },
            complete: (res)=> {
              if (res.errMsg == 'chooseWXPay:cancel') {
                // 取消支付
                res.cancelPay = true // 取消支付
                reject(res) // 支付失败
                Toast('取消支付')
              }
              setTimeout(()=> {
                this.isCanOrder = false
                Toast.clear()
              }, 300)
            }
          });
        }
      })
    }
  },

  /**
   * @description: 活动订单检验查询
   * @param {string} tradeId 订单ID
   * @return: 
   * @author: yesong
   */
  orderQuery(tradeId) {
    if (this.isQuery) return
    Toast.loading({
      message: '下单成功，校验订单...',
      forbidClick: true,
      duration: 0
    });
    this.isQuery = true
    return api.order_query({
      tradeId
    }).then(res => {
      if (res.state) {

      } else {
        setTimeout(() => {
          Toast(res.message)
        }, 100)
      }
      return res
    }).finally(() => {
      Toast.clear()
      setTimeout(()=> {
        this.isQuery = false
      }, 300)
    })
  }

}
export default orderPay