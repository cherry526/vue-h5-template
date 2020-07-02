<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-02 16:05:12
--> 
<template>
  <div>
    loading
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
      this.initPage()
    }
  }
</script>
<style scoped lang='scss'>

</style>