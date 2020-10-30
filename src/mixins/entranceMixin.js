/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-27 15:54:29
 * @LastEditors: cherry
 * @LastEditTime: 2020-10-30 12:11:50
 */ 
import { mapGetters, mapActions,  mapMutations } from "vuex";
import utils from '@utils/utils'
import linkPage from '@/router/linkPage'
import { AUTH_API } from '@/config/index.js'
import getWXSign from "@/utils/wx"

// 首页相关
const entranceMixin = {
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapMutations('index', [
      'SET_WXUSER',
    ]),

    initAuth() {
      let queryData
      if(window.$mode === 'hash') {
        queryData = utils.getData()
      } else {
        queryData = utils.formatUrlParams()
      }
      const sessionToken = this.$save.get('session', 'token')
      // 首次授权
      if (!sessionToken) {
        // 获取授权
        // console.log(window.location.href, ' window.location.href' )
        if (!~window.location.href.indexOf("token")) {
          this.$save.set('local', 'initPath', window.location.href)
          this.$save.set('local', 'queryData', queryData)
          console.log('跳转授权')
          // return false
          window.location.href = AUTH_API
        } else {
          let token = queryData.token
          if (token) {
            this.$save.set('session', 'token', token)
            this.getAppInit()
          }
        }
      }
    },
  },
  mounted() {
  },
}
export default entranceMixin 