/*
 * @Description: 交互二次封装
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-13 15:10:05
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-16 10:01:05
 */ 
import getWXSign from "@/utils/wx"
var wx = null
if(window.$wx) {
  wx = window.$wx
} else {
  getWXSign().then(res => {
    wx = res
  })
}
// 事先和安卓约定userAgent为android，和ios约定userAgent为ios
var envType = 'wx'
const ua = navigator.userAgent.toLowerCase()
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  // ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
  if(wx) {
    console.log(wx, '-------------wx-------------')
    wx.miniProgram.getEnv((res)=>{
      if (res.miniprogram) { // 小程序端
        envType = 'mini'
      } else {   // 微信浏览器
        envType = 'wx'
      }
    })
  }

} else {
  if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 ) {
    envType = 'Android'
  } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    envType = 'ios'
  } else if ( u.indexOf('iPhone') > -1) {
    envType = 'iPhone'
  }  else if ( u.indexOf('iPad') > -1) {
    envType = 'iPad'
  } else {
    envType = 'app'
  }
}

// 处理分享路由上敏感参数
const delData = (urlData = 'token') => {
  // let lasturl = window.location.href
  // const initUrl = window.location.href
  // if(initUrl.indexOf(urlData) > -1 && initUrl.indexOf('?') > -1 && initUrl.indexOf('#') > -1){
  //   let tokenstr = initUrl.match(/\?(\S*)#/)[1]
  //   let lastarr = initUrl.split('?'+tokenstr)
  //   lasturl = lastarr[0]+lastarr[1]+''
  // }else if(initUrl.indexOf(urlData) > -1 && initUrl.indexOf('?') > -1){
  //   let num = initUrl.indexOf('?')
  //   lasturl = initUrl.substring(num, initUrl.length -1 )
  // }else if(initUrl.indexOf(urlData) > -1 ){
  //   lasturl = initUrl.split(`${urlData}=`)
  // } 
  // return lasturl
  if(window.location.href.indexOf('token') > -1 && window.location.href.indexOf('?') > -1 && window.location.href.indexOf('#') > -1){
    let tokenstr = window.location.href.match(/\?(\S*)#/)[1]
    let lastarr = window.location.href.split('?'+tokenstr)
    let lasturl = lastarr[0]+lastarr[1]+''
    return lasturl
  }else if(window.location.href.indexOf('token') > -1 && window.location.href.indexOf('?') > -1){
    let num = window.location.href.indexOf('?')
    let labelurl = window.location.href.substring(num, window.location.href.length -1 )
    return labelurl
  }else if(window.location.href.indexOf('token') > -1 ){
    let last = window.location.href.split('token=')
    return last
  }
  else{
    return window.location.href
  }
}

export default class actions {
  constructor() {}

  static share(options) {
    console.log(envType, '-----------envType', options)
    const queryString = Object.keys(options.data).map(key => key + '=' + options.data[key]).join('&');
    console.log(queryString, '-----------queryString')
    if(envType == 'mini' && wx) {
      // 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。
      // e.detail = { data }，data是多次 postMessage 的参数组成的数组
      // 使用 wx.miniProgram.navigateBack 必须要小程序的界面栈大于等于2，不清楚界面栈的看文档（小程序界面栈链接），因为如果没有上级界面你是不能通过navigateBack去返回的，**需要特别注意，得先返回再去postMessage
      wx.miniProgram.navigateBack({
        delta: 1
      })
      wx.miniProgram.postMessage({
        // data: options
        data: {
          title: options.title,
          desc: options.desc,
          path: `/pages/doydShare/doydShare?${queryString}`    
          // path: `/pages/doydShare/doydShare?data=`+JSON.stringfy({url:encodeURIComponent(options.url)}) //重点，vipShare是小程序的页面中，从分享进入的h5的落地页    
        }
      })
    } else {
      if(!wx) return false
      console.log(delData() + queryString, '-----------------delData() + queryString')
      return new Promise((reslove, reject ) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        wx.onMenuShareAppMessage({
          title: options.title || '潮级VIP', // 分享标题
          desc: options.desc || "",
          // link: window.location.href.split('#')[0],
          link: delData() + queryString,
          imgUrl: options.imgUrl || "http://doyd-test.oss-cn-shenzhen.aliyuncs.com/jkb/wxmedia/20180910/1536573577108.png", // 分享图标
          type: options.type || '', // 分享类型,music、video或link，不填默认为link
          dataUrl: options.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
          ...options,
          success: function () { 
            // 用户确认分享后执行的回调函数
            reslove('true')
          },
          cancel: function () { 
            // 用户取消分享后执行的回调函数
            reslove('false')
          }
        })
      })
    }
  }
  
}