/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:44:03
 * @LastEditTime: 2020-08-20 10:59:46
 */ 
// 开启Gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')
// 代码压缩
const TerserPlugin = require("terser-webpack-plugin");
// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = process.env.NODE_ENV !== 'development'
const webpack = require('webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/vip_inline_h5',
  // publicPath: './',
  lintOnSave: false, // 关闭eslint
  assetsDir: 'static',
  outputDir: "dist",
  indexPath: "index.html",
  runtimeCompiler: true, //包含运行时编译器的 Vue 构建版本 
  productionSourceMap: false,
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8080, // 服务端口
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://36d.kdwaimai.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 优化moment 去掉国际化内容
    config
    .plugin('ignore')
    // 忽略/moment/locale下的所有文件
    .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)) 
    // 修复热更新失效
    config.resolve.symlinks(true)
    // 移除 preload 插件(针对生产环境首屏请求数进行优化)   preload 插件的用途：https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
    config.plugins.delete('preload') 
    // 移除 prefetch 插件(针对生产环境首屏请求数进行优化)
    config.plugins.delete('prefetch')
    // 添加别名
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@styles', resolve('src/styles'))
      .set('@api', resolve('src/api'))
    // 压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    //   .end()
    // 为了补删除换行而加的配置
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
    
    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    config
      .when(!IS_PROD, config => config.devtool('cheap-source-map'))

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
        
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
            // test: resolve("src/components"), // 可自定义拓展你的规则
            test: /[\\/]src[\\/]components[\\/]/,
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
      config.optimization.runtimeChunk('single')
    })
  },
  css: {
    // requireModuleExtension: false,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        prependData: `
          @import "@styles/index.scss";
        `
      },
      // postcss: {
      //   plugins: [
      //     // 把px单位换算成rem单位
      //     require("postcss-pxtorem")({
      //       rootValue: 75, // 换算的基数(设计图750的根字体为32)
      //       unitPrecision: 5, // 最小精度，小数点位数
      //       selectorBlackList: [".van"],// 要忽略的选择器并保留为px。
      //       propList: ["*"], //可以从px更改为rem的属性。
      //       minPixelValue: 2 // 设置要替换的最小像素值。
      //     })
      //   ]
      // }
    }
  },
  configureWebpack: config => {
    // // cdn资源引入
      // externals: {
      //   'vue':'Vue',
      //   'vuex': 'Vuex',
      //   'vue-router':'VueRouter'
      // }
      config.performance = {
        hints: 'warning', 
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
      }
   // 生产环境相关配置
   if (IS_PROD) {
     console.log('压缩配置',process.env.NODE_ENV)
    // 配置打包 js、css文件为.gz格式，优化加载速度  （参考：https://blog.csdn.net/qq_31677507/article/details/102742196）
    // gzip压缩 服务器上nginx也必须开启gzip才能生效
    const productionGzipExtensions = ['html', 'js', 'css', 'ttf', 'svg', 'json']
    config.plugins.push(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' + productionGzipExtensions.join('|') + ')$'
        ),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      })
    )
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,  //生产环境自动删除console
          },
          warnings: false,
        },
        sourceMap: false,
        parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        cache: true
      })
    );
    // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    config.optimization.minimizer = [
      new TerserPlugin({
				sourceMap:false,
				terserOptions:{
				  compress:{
				    drop_console : true
				  }
				}
			})
    ]
   }
  }
}