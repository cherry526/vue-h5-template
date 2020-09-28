/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-11 16:37:24
 * @LastEditors: cherry
 * @LastEditTime: 2020-09-28 17:03:37
 */ 
import wxRequest from '@utils/request'
import { VIP_APP_COMM } from '@/config/index.js'

const api = {
  // 初始化
  appInit(data) {
    return wxRequest(`${VIP_APP_COMM}/v1/h5/entrance`, data)
  },
}

export default api