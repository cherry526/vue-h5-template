
import Moment from 'moment'
const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//处理时间
const formatTime = (date, type = 'YYYY-MM-DD HH:mm:ss') => {
  if (date) {
    date = typeof date === 'object' ? date : new Date(date)
  } else {
    date = new Date()
  }
  return Moment(date).format(type)
}
//倒计时格式
const countDown = (time, type)  => {
  var time = time > 0?time / 1000 : 0;
  var day = parseInt(time / (3600 * 24));
  var hour = parseInt(time / 3600 - day * 24);
  var minute = parseInt((time - hour * 60 * 60 - day * 24 * 60 * 60) / 60);
  var second = parseInt((time - hour * 60 * 60) % 60);
  var str = [hour, minute, second].map(formatNumber).join(':');
  if (type == 1) { // 完整倒计时时间
    let fullHour = day * 24 + hour
    str = [fullHour, minute, second].map(formatNumber).join(':');
    return str
  } else if (type == 2) {
    str = [minute, second].map(formatNumber).join(':');
    return str
  } else {
    return str
  }
}
// 倒计时格式
const countDown3 = (time, hasms = false) => {
  var ms = parseInt(time % 1000);
  var time = time > 0 ? time / 1000 : 0;
  var day = parseInt(time / (3600 * 24));
  var hour = parseInt(time / 3600 - day * 24);
  var minute = parseInt((time - hour * 60 * 60 - day * 24 * 60 * 60) / 60);
  var second = parseInt((time - hour * 60 * 60) % 60);
  var lastHour = hour
  if(day) {
    lastHour = 24 * day + hour
  }
  if(hasms) {
      ms = parseInt(ms / 100)
      return  {
        hour: formatNumber(lastHour)+'',
        minute: formatNumber(minute) + '',
        second: formatNumber(second) + '',
        ms:  ms
      }
  } else {
    return  {
      hour: formatNumber(lastHour)+'',
      minute: formatNumber(minute) + '',
      second: formatNumber(second) + ''
    }
  }
}
// 处理空格
const trim = s => {
  return s.replace(/(^\s*)|(\s*$)/g, "")
}

// 验证姓名（中英文数字）限制15个字 可输入 中 英 文 数字 字母 
const isName = name => {
  if(name) { 
    let reg= /^[\u4e00-\u9fa5A-Za-z0-9]{1,15}$/
    if(name === 'null' || name === 'undefined'){
      return false
    }
    return !!reg.test(name)
  }
}

// 验证手机号码13-19的11位手机号码
const isCellphone = phone => {
  if(phone) { 
    let reg= /^1[3456789][0-9]{9}$/
    return !!reg.test(phone)
  }
}

// 验证电话号码
const isPhone = phone => {
  if(phone) { 
    let reg= /^[0-9\-]+$/
    return !!reg.test(phone)
  }
}

const verifyPhone = value => {
  let reg = /^(?:(?:\+|00)86)?1[1-9]\d{9}$/;
  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}

const verifyEmail = (value) => {
  let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}
// 验证输入的验证码（6位的正数字）
const isAuthcode = num => {
  if(num) { 
    let reg= /^\d{6}$/
    return !!reg.test(num)
  }
}

// 验证正整数
const isNumber = num => {
  let reg= /^[0-9]\d*$/
  return !!reg.test(num)
}

// 验证用户密码（必须字母数字组合，6-16个字符）
const isPassword = pass => {
  if(pass) { 
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    return !!reg.test(pass)
  }
}

// 一位小数的正实数
const isApoint = num => {
  if(num) { 
    let reg= /^[0-9]+(.[0-9]{1})?$/
    return !!reg.test(num)
  }
}

// 正数或一位小数
const decimals = num => {
  if(num) { 
    let reg= /^[0-9]+([.][0-9]{1}){0,1}$/
    return !!reg.test(num)
  }
}

//验证一个对象是否有值为空
const emptyObj = obj => {
  let res = true       
   for(var key in obj){
     if(!obj[key]){
      res = false
     }
   }
   return res
}


// 禁止为空、undefined和null
const textNormal = str => {
  if (!str || str == 'undefined' || str == 'null') {
    return false
  }else{
    return true
  }
}

const NumSplit = (num = 0, split = 1) => {
  var num2 = num/100 
  if (num % 10 == 0 && split == 1) {
    return num2.toFixed(1).split('.')
  } else {
    return num2.toFixed(2).split('.')
  }
}

//截取路由参数 参数格式在#之后
const getDatas = (url = window.location) => {
  var args = {}
  url = url.slice(url.indexOf('?') + 1)
  if (url.length > 0) {
    var nameValueArr = url.split("&") // 多参数
    nameValueArr.forEach(v => {
      let temp = v.split('=')
      let key = temp[0]
      let val = temp[1]
      args[key] = val
    })
    return args
  }
}

//获取路由参数 参数格式在# 之前
const getData = (url = window.location) => {
  var args = {}
  var argsStr = url.search; //获取URL参数字符串
  if (argsStr.length > 0) {
    argsStr = argsStr.substring(1);
    var nameValueArr = argsStr.split("&"); //多参数
    for (var i = 0; i < nameValueArr.length; i++) {
      var pos = nameValueArr[i].indexOf("=");
      if (pos == -1) continue; //如果没有找到就跳过
      var argName = nameValueArr[i].substring(0, pos); //提取name
      var argVal = nameValueArr[i].substring(pos + 1); //提取value
      args[argName] = argVal
    }
    return args
  }
}

// 去除链接上的token
const delData = () => {
  if (window.location.href.indexOf('token') > -1 && window.location.href.indexOf('?') > -1 && window.location.href.indexOf('#') > -1) {
    let tokenstr = window.location.href.match(/\?(\S*)#/)[1]
    let lastarr = window.location.href.split('?' + tokenstr)
    let lasturl = lastarr[0] + lastarr[1] + ''
    return lasturl
  } else if(window.location.href.indexOf('token') > -1 && window.location.href.indexOf('?') > -1){
    let num = window.location.href.indexOf('?')
    let labelurl = window.location.href.substring(num, window.location.href.length -1 )
    return labelurl
  }else if(window.location.href.indexOf('token') > -1 ){
    let last = window.location.href.split('token=')
    return last
  } else {
    return window.location.href
  }
}

// 获取url中的参数 history模式下
const formatUrlParams = () => {
  let url = window.location.href
  let obj = {}
  if (url.indexOf('?') !== -1) {
    let startIndex = url.indexOf('?') + 1
    let str;
    if(url.indexOf('#') !== -1) {
      let endIndex = url.indexOf('#')
      str = url.substring(startIndex, endIndex)
    } else {
      str = url.substring(startIndex)
    }
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      obj[strs[i].split('=')[0]] = strs[i].split('=')[1]
    }
    return obj
  }
}

// 去除url中指定参数
const deleteUrlParams = (paramKey = 'token') => {
  var url = window.location.href;    //页面url
  var urlParam = window.location.search.substr(1);   //页面参数
  var beforeUrl = url.substr(0, url.indexOf("?"));   //页面主地址（参数之前地址）
  var nextUrl = "";

  var arr = new Array();
  if (urlParam != "") {
    var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
    for (var i = 0; i < urlParamArr.length; i++) {
      var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
      //如果键与要删除的不一致，则加入到参数中
      if (paramArr[0] != paramKey) {
          arr.push(urlParamArr[i]);
      }
    }
  }
  if (arr.length > 0) {
      nextUrl = "?" + arr.join("&");
  }
  url = beforeUrl + nextUrl;
  return url
}

// 获取项目运行环境
const getJRE = () => {
  // 事先和安卓约定userAgent为android，和ios约定userAgent为ios
  var envType = 'wx'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    // ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
    if($wx) {
      console.log($wx, '-------------wx-------------')
      $wx.miniProgram.getEnv((res)=>{
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
  return envType
}

const validityTime = (info, num) => {
  // 1：固定有效期；2：指定日期,3：选定日当天有效；4：选定日延后X天有效；5选定日期到指定日期有效；6：游客预订日期截至到指定日期有效；7：游客预订日期延后x有效; 8:立即生效(直充)；9:(领取后多少小时生效)
  
  let newTime = +new Date(), surplusTime=99999, state = false
  let  {endTime, validityDays, selDate}= info
  let oneDay = 24*60*60*1000 - 1
  // let endTime = info.endTime, validityDays = info.validityDays, selDate = 
  if (info.validityType == 1) {
    // 1：固定有效期；2：指定日期
    surplusTime = (endTime - newTime) / 1000 / 60 / 60
  } else if (info.validityType == 2) {
    surplusTime = Number(validityDays)*24
  } else if (info.validityType == 3) {
    // 选定日当天有效；
    // surplusTime = 24
    surplusTime = (selDate.startTime + oneDay - newTime) / 1000 / 60 / 60
  } else if (info.validityType == 4 || info.validityType == 7) {
    // 选定日延后X天有效；游客预订日期延后x有效；
    surplusTime = Number(validityDays)*24
  } else if (info.validityType == 5 || info.validityType == 6) {
    // 选定日期到指定日期有效；游客预订日期截至到指定日期有效；
    surplusTime = (endTime - newTime) / 1000 / 60 / 60
  } else if (info.validityType == 9) {
    // 游客预订日期延后x有效
    surplusTime = validityDays
  }
  surplusTime = Math.ceil(surplusTime)
  surplusTime = surplusTime <= 0 ? 0 : surplusTime
  if (surplusTime <= num) {
    state = true
  }
  return {
    state,
    surplusTime
  }
}

const utils = {
    trim,
    emptyObj,
    formatTime,
    isNumber,
    NumSplit,
    isApoint,
    decimals,
    isName,
    isCellphone,
    isPhone,
    verifyPhone,
    verifyEmail,
    isAuthcode,
    isPassword,
    textNormal,
    getDatas,
    getData,
    delData,
    formatUrlParams,
    deleteUrlParams,
    getJRE,
    validityTime,
    countDown,
    countDown3
}

export default utils
