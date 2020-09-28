/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-02 14:25:21
 * @LastEditors: yesong
 * @LastEditTime: 2020-07-31 11:09:57
 */ 

 // 存储数据变量名前缀 
const PREFIX = 'doyd'
const WAY = {
  'local': 'localStorage',
  'session': 'sessionStorage'
}

export default class storageData {
  constructor() {}
  /**
   * @description:  数据转化
   * @param {number|string|object|boolean|Array} data
   * @param {number|boolean}  type
   * @return: 数据
   * @Date: 2020-07-02 16:07:24
   * @author: cherry
   */
  static initData(data, type) {
    let lastData;
    if(type) { // 存储数据
      lastData = JSON.stringify({ data })
    } else {
      lastData = JSON.parse(data).data
    }
    return lastData
  }

  /**
   * @description: 设置本地/会话存储数据
   * @param {string}  type
   * @param {string}  name
   * @param {number|string|object|boolean|Array}  data
   * @return: 
   * @Date: 2020-07-02 16:14:07
   * @author: cherry
   */
  static set(type, name, data) {
    const lastData = this.initData(data, 1)
    window[WAY[type]].setItem(`${PREFIX}-${name}`, lastData)
  }

  /**
   * @description: 获取本地/会话存储数据
   * @param {string}  type
   * @param {string}  name
   * @return: 存储数据
   * @Date: 2020-07-02 16:14:14
   * @author: cherry
   */
  static get(type, name) {
    const lastData = window[WAY[type]].getItem(`${PREFIX}-${name}`)
    return lastData ? this.initData(lastData) : null
  }

  /**
   * @description: 删除某个本地/会话存储数据
   * @param {string}  type
   * @param {string}  name
   * @Date: 2020-07-02 16:16:19
   * @author: cherry
   */
  static remove(type, name) {
    window[WAY[type]].removeItem(`${PREFIX}-${name}`)
  }

  /**
   * @description: 批量清除本地/会话存储数据
   * @param {string}  type
   * @param {Array}  arr
   * @Date: 2020-07-02 16:17:15
   * @author: cherry
   */
  static removeArr(type, arr) {
    arr.forEach((name) => {
      window[WAY[type]].removeItem(`${PREFIX}-${name}`) 
    })
  }
  
  /**
   * @description: 清除所有缓存本地/会话存储数据
   * @param {string}  type
   * @Date: 2020-07-02 16:17:15
   * @author: cherry
   */
  static clear(type) {
    window[WAY[type]].clear()
  }
}
