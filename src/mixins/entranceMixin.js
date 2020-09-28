/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-27 15:54:29
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-10 11:50:13
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
      'SET_VIPCARDINFO'
    ]),
    checkAuth(queryData) {
      this.$api.checkAuth().then(res => {
        // 第三方小程序入口首次授权
        if(res.state && res.info.needAuth && !res.info.token) {
          this.initAuth(queryData)
        } else {
          this.$save.set('session', 'token', res.info.token)
          this.getAppInit()
        }
      })
    },
    initAuth(queryData) {
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
    initPage() {
      let queryData
      if(window.$mode === 'hash') {
        queryData = utils.getData()
      } else {
        queryData = utils.formatUrlParams()
      }
      const sessionToken = this.$save.get('session', 'token')
      console.log(sessionToken, JSON.stringify(queryData) + '====================='+ window.location.href, !~window.location.href.indexOf("token") )
      if (!sessionToken && queryData && queryData.entryType === 'HAINA_H5' && !queryData.token) {
        this.checkAuth(queryData)
      } else {
        this.initAuth(queryData)
      }
    },
    getWxInit() {
      setTimeout(() => {
        getWXSign().then(wx => {
          console.log(wx, '-----------wx')
          window.$wx = wx
        }).catch(res => {
          console.log(res, '---------getWXSignError')
        })
      }, 500);
    },
    // 获取初始化信息
    getAppInit() {
      // 处理路由token
      let lasturl
      if(window.$mode === 'hash') {
        lasturl = utils.delData()
        history.replaceState(null,null,lasturl)
      } else {
        lasturl = utils.deleteUrlParams()
      }
      this.getWxInit()
      console.log(window.location.href, '处理路由token')
      this.$api.appInit().then(res => {
        console.log(res, '获取初始化信息-cherry')
        // 处理入口逻辑
        if(res.state) {
          let {vipCardInfo = {}, wxUser, target, param} = res.info
          this.SET_WXUSER(wxUser)
          this.SET_VIPCARDINFO(vipCardInfo)
          // 储存会员卡信息
          if (vipCardInfo.onceVip && !vipCardInfo.vipUser) {
            vipCardInfo.isExpiration = true
          }
          param.entrance = true
          console.log(res.info, param, '999999999999999999999999')
          linkPage.linkPage(target, param)
        }        
      })
    }
  },
  mounted() {
    // this.initPage()
  },
}
export default entranceMixin 