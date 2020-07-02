<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-28 10:46:34
--> 
<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view v-wechat-title="$route.meta.title"> </router-view>  
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" v-else> </router-view>
  </div>
</template>
<script>
// import getWXSign from "@/utils/wx"
const defaultSettings = require('@/config/index.js')
const { AUTH_API } = defaultSettings
export default {
  name: "App",
  data() {
    return {
    }
  },
  created() {
    console.log(this, 'router')
    // getWXSign().then(wx => {
    //   window.$wx = wx
    // })
    // this.$api.home.login({})
  },
  methods: {
    // 场景：进入项目自动授权
    initPage() {
      var session = window.sessionStorage.getItem('token')
      var queryData = utils.getData(window.location)
      // 首次授权
      if (!session) {
        console.log(JSON.stringify(queryData) + '====================='+ window.location.href)
        // alert(JSON.stringify(queryData)+'====================='+window.location)
        // 公众号入口 核销入口 保存参数 ！！！！！！
        // if (window.location.href.indexOf("public") > -1 || window.location.href.indexOf("qrcode") > -1 || ~window.location.href.indexOf("cancel")) {
        //   this.$save.session('public', queryData)
        // }
        // 获取授权
        if (window.location.href.indexOf("token") == -1) {
          this.$save.session('publicUrl', window.location.href)
          window.location.href = AUTH_API
          console.log(AUTH_API,defaultSettings, '------defaultSettings' )
        } else {
          // console.log(token+'--------------'+JSON.stringify(publicData)+'参数',window.location.href)
          // let lasturl = this.delData()
          // history.replaceState(null,null,lasturl)
          this.$save.session('publicUrl', window.location.href)
          let token = queryData["token"]
          if (token) {
            window.sessionStorage.setItem('token', token)
            console.log(window.sessionStorage.getItem('token'))
          }
        }
      } else {

      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
#app {
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

</style>
