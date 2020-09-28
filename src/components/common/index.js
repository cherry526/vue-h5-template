/*
 * @Description: 公共组件全局注册
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-12 14:41:15
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-08 11:58:46
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
	  // 处理文件名称
		let componentName;
		if (!componentConfig.default.name) {
			componentName = componentConfig.default.__file.replace(/\/$(.*)\.\w+$/, '$1')
		} else {
			componentName = componentConfig.default.name
		}
		// 全局注册组件（componentConfig.default.name：组件的名称，componentConfig.default：组件本身）
		Vue.component(componentName, componentConfig.default || componentConfig) 
	})
}