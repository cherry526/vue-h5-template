/*
 * @Description: 
 * @Version: 1.0
 * @Autor: yesong
 * @Date: 2020-04-22 10:32:02
 * @LastEditors: yesong
 * @LastEditTime: 2020-04-24 10:16:33
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-extra-semi": "off",
    // "no-trailing-spaces": "off",
    // "no-unused-vars": [2, {"vars": "all", "args": "after-used"}], //不能有声明后未被使用的变量或参数
    // "comma-style": "off",
    // "semi": [0, "always"]
    'prettier/prettier': 'off'
  }
};
