/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:39:46
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-04 14:40:24
 */ 
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./' + process.env.NODE_ENV)
module.exports = config

