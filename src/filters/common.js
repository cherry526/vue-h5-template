/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-17 14:46:34
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-08 11:21:52
 */ 
import Moment from 'moment'

const formatFloat =  (num, digit) => {
  const lastDigit = digit || 2
  const m = Math.pow(10, lastDigit);
  return Math.round(num * m, 10) / m
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export default {
  //处理姓名**
  hideName: function(val){
    if(val){
      return  val = val.substr(0, 1) + new Array(val.length).join('*')
    }
  },
  //处理银行账号**
  hideBank: function(val){
    if(val){
      let reg = /^(\d{4})(\d*)(\d{4})$/;
      return  val.replace(reg, function(a, b, c, d) {
          return b + c.replace(/\d/g, "*") + d
      })
    }
  },
  // 处理时间  格式默认2018/02/27 19:56:40  type = 1 2018/02/27 19:56  type = 2  2018/02/27
  formatTime: function(date, type = 'YYYY-MM-DD HH:mm:ss'){
    return Moment(date).format(type)
    // let formatNumber = n => {
    //   n = n.toString()
    //   return n[1] ? n : '0' + n
    // }
    // if (date) {
    //   date = typeof date === 'object' ? date : new Date(date)
    // } else {
    //   date = new Date()
    // }

    // let year = date.getFullYear()
    // let month = date.getMonth() + 1
    // let day = date.getDate()
    // let hour = date.getHours()
    // let minute = date.getMinutes()
    // let second = date.getSeconds()
    // let result = [year, month, day].map(formatNumber).join('/')
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
    // if(type == 4){
    //   result += ' ' + [hour, minute].map(formatNumber).join(':')
    //   return result
    // }
    // if(type == 5){
    //   result = [year, month, day].map(formatNumber).join('-')
    //   return result
    // }
  },
  // 倒计时格式
  countDown: function(time) {
    var time = time > 0?time / 1000 : 0;
    var day = parseInt(time / (3600 * 24));
    var hour = parseInt(time / 3600 - day * 24);
    var minute = parseInt((time - hour * 60 * 60 - day * 24 * 60 * 60) / 60);
    var second = parseInt((time - hour * 60 * 60) % 60);
    var str = formatNumber(hour) + '小时' + formatNumber(minute) + '分' + formatNumber(second) + '秒'
    if(day > 0) {
      return day + '天' + str
    } else {
      return str
    }
    
  },
  // 倒计时格式
  countDown2: function(time, type) {
    var time = time > 0?time / 1000 : 0;
    var day = parseInt(time / (3600 * 24));
    var hour = parseInt(time / 3600 - day * 24);
    var minute = parseInt((time - hour * 60 * 60 - day * 24 * 60 * 60) / 60);
    var second = parseInt((time - hour * 60 * 60) % 60);
    var str = [hour, minute, second].map(formatNumber).join(':');
    if(type == 2) {
      let strArr = []
      return str
    } else if (type == 1) {
      return  [minute, second].map(formatNumber).join(':')
    } else if (day > 0) {
      return day + '天 ' + str
    } else {
      return str
    }
  },

  // 适配苹果7
  activeTime: function(date,type){
    function GetDateDiff(DiffTime) {
      var Time
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
      if(typeof DiffTime === "string"){
        Time = DiffTime.replace(/\-/g, "/");
      }
      return Time;
    }

    // console.log(date,'date1')
    if (date) {
      // date = typeof date === 'object' ? date : new Date(GetDateDiff(date))
      if(typeof date === 'number'){
        date = new Date(date)
      }else {
        date = typeof date === 'object' ? date : new Date(GetDateDiff(date))
      }

    } else {
      date = new Date()
    }
    // console.log(date,'date2')
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let result = [year, month, day].map(formatNumber).join('-')
    if(type){
      result = [year, month, day].map(formatNumber).join('/')
    }
    return result
  },

  // 前后去空格
  trim: function (str='') {
    return str?str.replace(/(^\s*)|(\s*$)/g, ''):''
  },
  // 所有去空格
  trimA: function (str='') {
    return str?str.replace(/\s+/g, ''):''
  },
  // 处理大数据数字
  dataNumber: function(val) {
    return val > 10000 ? (val/10000) + 'w' : val
  },
  // 保留n位小数
  toFixed: function (num,n) {
    num = Number(num)
    return num.toFixed(n)
 },
  // 保留n位小数
  formatFloat: formatFloat,
  
  // 字符串转数组
  split: function (str, sep = ',') {
    if (str) {
      return str.split(sep)
    }
  },
  // 格式距离
  formatDistance: function (num) {
    if(!num) return '0km';
    var distance = '';
    if(num <= 500){
      distance = '<500m'; 
    } else if (num > 500 && num < 1000) {
      distance = Math.ceil(num) + 'm';
    }else if(num >= 1000 && num < 50000){
      distance = formatFloat(num/1000,1) + 'km';
    }else{
      distance = '>50km';
    }
    return distance
  },
  // 字符串截取4位数后面加空格
  cardReplace: function(str, sqp=' '){
    if (!str) {
      return ""
    }
    str = str+''
    sqp = "$1"+sqp
  
    if (str.indexOf('http') > -1) {
      return str
    }
    var reg = new RegExp("(.{4})", "g");
    str = str.replace(reg, sqp);
    return str
  },
  //格式阅读人数
  formatReadNum: function(num) {
    var num = parseInt(num) || 0;
    if (num >= 10000 && num < 100000) {
      num = (num / 10000).toFixed(2) + 'w';
    } else if (num > 100000) {
      num = '10w+';
    } 
    return num
  },
  // 加密手机号
  formatPhone: function (str) {
    if(!str) {
      return ''
    }
    return str.replace(str.slice(3,7),"****")
  },
  NumSplit: function (num = 0, split = 2, index) {
    num = num ? num : 0
    var num2 = num/100 
    let strArr 
    if (num % 10 == 0 && split == 1) {
      strArr = num2.toFixed(1).split('.')
    } else {
      strArr = num2.toFixed(2).split('.')
    }
    if(index) {
      return strArr[index-1]
    } else {
      return strArr
    }
  },
  // 保留几位小数
  fixedNum: function (num = 0, split = false) {
    num = num ? num : 0
    var num2 = num/100 
    if (num % 100 == 0) {
      if (split) {
        return [num2]
      } else {
        return num2
      }
    } else if (num % 10 == 0) {
      if (split) {
        var num3 = num2.toFixed(1) + ''
        num3 = num3.split('.')
        return num3
      } else {
        return num2.toFixed(1)
      }
    } else {
      if (split) {
        var num3 = num2.toFixed(2) + ''
        num3 = num3.split('.')
        return num3
      } else {
        return num2.toFixed(2)
      }
    }
  }
}
