/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-11 09:31:49
 */ 
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
