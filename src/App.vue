<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-04 14:15:58
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-11 16:34:55
--> 
<template>
  <div id="app">
    <!-- <transition :name="transitionName">  -->
      <keep-alive :include="cachedViews">
        <router-view class="child-view" v-wechat-title="$route.meta.title"> </router-view>  
      </keep-alive>
    <!-- </transition> -->
    <!-- 返回首页 -->
    <back-icon></back-icon>
  </div>
</template>
<script>
import getWXSign from "@/utils/wx"
import { mapGetters, mapActions, mapMutations } from "vuex";
const { AUTH_API }= require('@/config/index.js')
import utils from '@utils/utils'

export default {
  name: "App",
  data() {
    return {
      transitionName: 'transition-page'
    }
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {  
    '$route' (to, from) {  
      if(to.path == '/'){  
        this.transitionName = '';  
      }else{  
        this.transitionName = 'transition-page';  
      }  
      const { name } = this.$route
      if (name) {
        this.ADD_CACHED_VIEWS(this.$route)
      }
    }
  },
  computed: {
    ...mapGetters(['cachedViews'])
  },

  methods: {
    ...mapActions('index', [
      // 获取当前位置经纬度信息
      'setLocationCityInfo'
    ]),
    ...mapMutations('index', [
      'SET_WXUSER',
      'ADD_CACHED_VIEWS'
    ]),

    // 处理路由
    tokenLink() {
      let queryData
      if(window.$mode === 'hash') {
        queryData = utils.getData()
        history.replaceState(null,null,lasturl)
      } else {
        queryData = utils.formatUrlParams()
      }
      // console.log(queryData, '==000=====0000', window.location.href)
      if(queryData && queryData.token) {
        this.$save.set('session', 'token', queryData.token)
        this.$api.appInit().then(res => {
          // 处理入口逻辑
          if(res.state) {

          }        
        })
      }
    }
  },
  created() {
  },
  mounted() {
    // if(!this.$save.get('session', 'token')) {
    //   this.setLocationCityInfo()
    // }
  },
  destroyed() {

  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1);  
}  
.transition-page-enter {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.transition-page-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  

</style>
