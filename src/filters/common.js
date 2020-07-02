/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-17 14:46:34
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-17 14:48:29
 */ 
import Moment from 'moment'

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
    let formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
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
    // return val > 10000 ? (val/10000).toFixed(2)+'w' : val
    return val > 10000 ? (val/10000) + 'w' : val
  }
}
