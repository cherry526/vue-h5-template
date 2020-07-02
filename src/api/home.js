/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-11 16:37:24
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-11 16:38:20
 */ 
import request from '@utils/request'
export default {
  login(data) {
    return request({
      url: '/login',
      method: 'POST',
      data
    })
  }
}