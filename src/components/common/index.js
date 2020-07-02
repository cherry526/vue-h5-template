/*
 * @Description: 公共组件全局注册
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-12 14:41:15
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-23 16:52:13
 */ 
import Vue from 'vue'
const requireComponent = require.context(
	'./',// 想要全局注册的组件父文件夹
	true, // 遍历文件夹（如果你的组件是被一个个文件夹包裹的话）
	/\w+\.vue$/     // 匹配vue后缀的文件
)

export default (Vue) => { 
	requireComponent.keys().forEach((fileName) => {
		// 获取组件
		const componentConfig = requireComponent(fileName)
		// 全局注册组件（componentConfig.default.name：组件的名称，componentConfig.default：组件本身）
		Vue.component(componentConfig.default.name, componentConfig.default || componentConfig) 
	})
}