
import Moment from 'moment'

//处理时间
const formatTime = (date, type = 'YYYY-MM-DD HH:mm:ss') => {
  if (date) {
    date = typeof date === 'object' ? date : new Date(date)
  } else {
    date = new Date()
  }
  return Moment(date).format(type)
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  // var result = [year, month, day].map(formatNumber).join('/')
  // if(!type){
  //   result += ' ' + [hour, minute, second].map(formatNumber).join(':')
  //   return result
  // }
  // if(type == 1){
  //   result += ' ' + [hour, minute].map(formatNumber).join(':')
  //   return result
  // }
  // if(type == 2){
  //   return result
  // }
  // if(type == 3){
  //   result = [year, month, day].map(formatNumber).join('-')
  //   return result
  // }
  // return result

}


// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }



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

const lengthAstrict = (str,maxlength) => {
  if(str.length > maxlength){
    throw new Error('字符过长,限定' + maxlength + '个字符')
  }else{
    return true
  }
}

//截取路由参数 参数格式在#之后
const getDatas = (url) => {
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
const getData = (url) => {
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
  } else {
    return window.location.href
  }
}

const utils = {
    trim,
    emptyObj,
    formatTime,
    isNumber,
    isApoint,
    decimals,
    isName,
    isCellphone,
    isPhone,
    isAuthcode,
    isPassword,
    textNormal,
    getDatas,
    getData,
    delData
}

export default utils
