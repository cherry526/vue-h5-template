/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-11 16:35:03
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-04 17:56:39
 */ 
import asyncImportModules from '@utils/importModules'

const api = asyncImportModules(require.context('./', false, /\.js$/), 'index.js')

let apiObj = {}
Object.keys(api).forEach(item => {
  apiObj = Object.assign(apiObj, api[item])
})

export default apiObj