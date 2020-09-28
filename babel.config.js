/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-06 19:40:38
 */ 
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant',
  ],
  // '@babel/plugin-syntax-dynamic-import'
  "syntax-dynamic-import"
  // "dynamic-import-node"
]

// 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
if (process.env.NODE_ENV === 'production') {
  plugins.push([
    'transform-remove-console',
    {
      // 保留 console.error 与 console.warn
      exclude: ['error', 'warn']
    }
  ])
}

module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset"
  ],
  plugins
};
