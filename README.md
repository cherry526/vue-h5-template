<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-12 16:22:07
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-29 09:18:58
--> 
 基于 vue-cli4.0 + webpack 4 + vant ui + sass+ rem 适配方案+axios 封装，构建手机端模板脚手架

 ###  **启动项目**
  本地环境： npm run dev  
  测试环境： npm run test
  沙箱环境： npm run sandbox
  线上环境： npm run build
  
 ### **项目结构**
├── src
│   ├── api
│   ├── assets
│   ├── components
│   │   └── common            // 全局组件
│   ├── config                // 环境配置
│   ├── filters               // 过滤器
│   ├── mixins                // 混入
│   ├── plugins               // 第三方插件
│   ├── router
│   │   ├── index.js          // 路由管理
│   │   └── permission.js     // 路由导航
│   ├── store                 // vuex
│   ├── styles                // 样式
│   ├── utils
│   │   ├── directives.js     // 指令
│   │   ├── importModules.js  // 自动化方法
│   │   ├── md5.js            
│   │   ├── request.js        // 请求封装
│   │   ├── utils.js          // 工具函数
│   │   └── wx.js             // wxSDK
│   ├── views 
│   ├── App.vue
│   └── main.js
├── .env.development
├── .env.production
├── .env.sandbox
├── .env.test
├── babel.config.js
├── package-lock.json
├── package.json
├── README.md
└── vue.config.js

#### 1.配置多环境变量,统一管理，引入index自动导出对应环境配置

**`package.json` 里的 `scripts` 配置 `test` `sandbox` `build`，通过 `--mode
xxx` 来执行不同环境**

启动项目：

  本地运行： `npm run dev`
  
  测试环境打包： `npm run test`
  
  沙箱环境打包： `npm run sandbox`
  
  线上环境打包： `npm run build`

![](http://192.168.5.51:8081/server/../Public/Uploads/2020-06-23/5ef19e9cb4bc9.png)
```javascript
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./' + process.env.NODE_ENV)
module.exports = config
```
#### 2.rem适配
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值
```javascript
      postcss: {
        plugins: [
          // 把px单位换算成rem单位
          require("postcss-pxtorem")({
            rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
            unitPrecision: 5, // 最小精度，小数点位数
            // selectorBlackList: [".van"],// 要忽略的选择器并保留为px。
            propList: ["*"], //可以从px更改为rem的属性。
            minPixelValue: 2 // 设置要替换的最小像素值。
          })
        ]
      }
```

####3.VantUI 组件按需加载

[VantUI按需加载](https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian "VantUI按需加载")

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款babel插件，它会在编译过程中将import的写法自动转换为按需引入的方式，配置文件写在`babel.config.js`
```javascript
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins
};
```
#### 4.自动化注册全局组件
对应代码配置在`components/common/index.js`，组件代码name自动注册为组件名
```javascript
import Vue from 'vue'

const requireComponent = require.context(
	'./',// 想要全局注册的组件父文件夹
	true, // 遍历文件夹（如果你的组件是被一个个文件夹包裹的话）
	/\w+\.vue$/     // 匹配vue后缀的文件
)
requireComponent.keys().forEach((fileName) => {
  // 获取组件
  const componentConfig = requireComponent(fileName)
  // 全局注册组件（componentConfig.default.name：组件的名称，componentConfig.default：组件本身）
	Vue.component(componentConfig.default.name, componentConfig.default || componentConfig) 
})
```
#### 5.sass全局样式
```javascript
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "assets/css/index.scss";
          @import "assets/css/mixin.scss";
          @import "assets/css/variables.scss";
          $cdn: "${defaultSettings.$cdn}";
          `
      }
    }
  },
```
设置 js 中可以访问 `$cdn`,`.vue` 文件中使用`this.$cdn`访问

```javascript
	// 设置 js中可以访问 $cdn
	import {$cdn} from '@/config'
	Vue.prototype.$cdn = $cdn
	在 css 和 js 使用
	<script>
	  console.log(this.$cdn)
	</script>
	<style lang="scss" scoped>
	.logo {
	  width: 300px;
	  height: 120px;
	  background: url($cdn+'vip_mini_apply/v1.4.1/bg_xsxl.png') center /    contain no-repeat;
	}
	</style>
```

#### 6.Vuex 状态管理多模块
![](http://192.168.5.51:8081/server/../Public/Uploads/2020-06-23/5ef1a3be8b66a.png)


#### 7.Axios 封装及接口管理
自动集成一个api对象，全局挂载，无需多处引入
```javascript
// 全局注册
Vue.prototype.$api = api
   
// js调用
this.$api.home.login({})

//关键代码
import asyncImportModules from '@utils/importModules'

const api = asyncImportModules(require.context('./', false, /\.js$/), 'index.js')

export default api
```

#### 8.图片懒加载
```javascript
	Vue.use(VueLazyLoad,{
		preLoad: 1.3,                               // 预加载
		error:require(""),   // 错误时显示
		loading:require(""), // 加载时显示
		attempt: 1                                  // 每次加载多少张
	})

```

#### 9.设置title
```javascript

	import VueWechatTitle from 'vue-wechat-title'
	Vue.use(VueWechatTitle)

```
![](http://192.168.5.51:8081/server/../Public/Uploads/2020-06-23/5ef1a8a080091.png)

#### 10.Lockr管理存储
[lockr插件让本地存储localstorage更加简单的api](https://www.npmjs.com/package/lockr "lockr插件让本地存储localstorage更加简单的api")

#### 11.Moment日期处理类库
[格式化日期更简单](http://momentjs.cn/ "格式化日期")
已配置进全局filter `formatTime` 直接使用

#### 12.wx-SDK引入
```javascript
import getWXSign from "@/utils/wx"

// 使用(根据自己的业务场景)
	getWXSign().then(wx => {
	 window.$wx = wx
	})
```
#### 13.配置 alias 别名
```javascript
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@styles', resolve('src/styles'))
      .set('@api', resolve('src/api'))
```

#### 14. 配置 打包分析
```javascript

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
```
[参考地址](https://www.npmjs.com/package/webpack-bundle-analyzer "参考文档地址")
![](http://192.168.5.51:8081/server/../Public/Uploads/2020-06-23/5ef1a66b883d3.png)

#### 15.splitChunks 单独打包第三方模块
`这部分内容配置根据项目业务修改，实现项目的优化`
```javascript
      // 公共代码抽离
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 10, // 优先级
            chunks: "initial" // 只打包初始时依赖的第三方
          },
          components: {
            name: "chunk-components",
            test: resolve("src/components"), // 可自定义拓展你的规则
            minChunks: 2, // 最小共用次数
            priority: 5,
            reuseExistingChunk: true
          },
          common: {
            name: 'chunk-common',
            test: /[\\/]src[\\/]js[\\/]/,
            minChunks: 2,
            priority: 6
          },
          styles: {
            name: 'chunk-styles',
            test: /\.(sa|sc|c)ss$/,
            enforce: true
          },
          vantUI: {
            name: 'vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          },
        }
      })
```



