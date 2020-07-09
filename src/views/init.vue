<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-07 15:36:32
--> 
<template>
  <div>
    loading
    <div class="box">哈哈哈哈哈</div>
    <span @click="theme('iview')">默认</span>
    <span @click="theme('light')">浅色</span>
    <span @click="theme('dark')">深色</span>
    <footer-btn>底部按钮</footer-btn>
  </div>
</template>
<script>
  import utils from '@utils/utils'
  import { AUTH_API } from '@/config/index.js'
  export default {
    name: 'init',
    components:{},
    data() {
      return {
      }
    },
    methods: {
      theme(type) {
        // this.$store.commit('upDate', {themeType: type});
        window.document.documentElement.setAttribute( "data-theme", type );
      },
      // 场景：进入项目自动授权
      initPage() {
        var sessionToken = this.$save.get('session', 'token')
        var queryData = utils.getData(window.location)
        console.log(JSON.stringify(queryData) + '====================='+ window.location.href)
        // 首次授权
        if (!sessionToken) {
          // 获取授权
          if (!~window.location.href.indexOf("token")) {
            this.$save.set('local', 'initPath', window.location.href)
            window.location.href = AUTH_API
          } else {
            // 处理路由token
            // console.log(token+'--------------'+JSON.stringify(publicData)+'参数',window.location.href)
            // let lasturl = utils.delData()
            // history.replaceState(null,null,lasturl)
            this.$save.set('local', 'initPath', window.location.href)
            let token = queryData["token"]
            if (token) {
              this.$save.set('session', 'token', token)
              console.log(this.$save.get('session', 'token'))
              
            }
          }
        } else {

        }
      }
    },
    created() {
      // this.initPage()
    }
  }
</script>
<style scoped lang='scss'>
  .box {
    width: 100%;
    height: 300px;
    font-size: 18px;
    @include font_color("font_color1");
    @include background_color("background_color1");
    @include border_color("border_color1");
  }
</style>