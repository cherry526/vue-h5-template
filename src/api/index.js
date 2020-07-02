/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-11 16:35:03
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-11 16:38:36
 */ 
import asyncImportModules from '@utils/importModules'

const api = asyncImportModules(require.context('./', false, /\.js$/), 'index.js')

export default api