/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-08-11 16:54:29
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-11 20:27:46
 */

import getWXSign from "@/utils/wx"
import utils from '@utils/utils'
import { mapGetters } from "vuex";

// 首页相关
const shareMixin = {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(["wxUser", 'vipCardInfo'])
  },
  methods: {
    // 获取分享配置
    shareConfig() {
      this.$api.getShareInfo({
        actSn: this.options.actSn,
        enumKey: this.enumKey,
        timeId: this.options.timeId || 0,
        marketActId: this.options.marketActId || ''
      }).then(res => {
        if(res.state) {
          this.shareInfo = res.info
          let shareInfo  = this.$save.get('session', 'shareInfo') || {}
          shareInfo[this.shareInfoOnlyVlaue] = res.info
          this.$save.set('session', 'shareInfo', shareInfo)
          console.log('获取分享配置', this.shareInfo)
          this.setPageShare()
        }
      })
    },
    setShareInfo() {
      let shareInfo  = this.$save.get('session', 'shareInfo') || {}
      let shareInfoData = shareInfo[this.shareInfoOnlyVlaue] || {}
      if (shareInfoData == this.options.actSn) {
        setTimeout(()=> {
          this.setShareInfo()
        }, 1000)
      } else {
        this.shareInfo = shareInfoData
      }

    },
    setPageShare(res, ext={}) {
      // let sType = (res.from === 'button' && this.shareInfo.configPoster) ? 'POSTER_APPLET_CODE' : 'ACT_SHARE'
      // app.shareRecord(this.options.actSn, this.options.enumKey, this.pType, ext.launchRecordId || 0)
      let shareInfo  = this.$save.get('session', 'shareInfo') || {}
      let shareInfoData = shareInfo[this.shareInfoOnlyVlaue] || {}
      let params = {
        // "sType": sType,
        "sType": 'ACT_SHARE',
        "sId": "ACT_SHARE",
        "pType": (!this.shareInfo.configShare || this.shareInfo.targetType == 1) ? (this.pType || this.options.enumKey) : this.shareInfo.targetEnumKey,
        "pId": this.options.actSn,
        "rId": this.wxUser.unionId,
        "rType": "1",
        "share": "",
        "ext": {
          shareWuId: this.vipCardInfo.wuId,
          code: this.shareInfo.code || '',
          // ...ext
          qrCode: this.options.qrCode || '',
          channelType: this.channelType || this.options.channelType || ''
        }
      }
      console.log(JSON.stringify(params))
      let link = process.env.NODE_ENV === 'development' ? window.location.origin : window.location.origin + '/vip_inline_h5'
      let shareData = {
        title: '潮级VIP',
        link: `${link}?params=${JSON.stringify(params)}`
      }
      if (this.shareInfo && this.shareInfo.configShare) {
        shareData.imgUrl = shareInfoData.sharePic
        shareData.desc = this.shareInfo.shareTitle
      } else {
        shareData.imgUrl = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2475314098,1324594906&fm=27&gp=0.jpg'
        shareData.desc = '潮级VIP'
      }
      if(this.shareInfoSelf) {
        shareData = { ...shareData, ...this.shareInfoSelf}
      }
      // let url = utils.delData()
      console.log(link, '------------要分享的路由', shareData)
      getWXSign().then(wx => {
        // wx.onMenuShareAppMessage({
        //   title: '潮级VIP', // 分享标题
        //   desc: `${this.store.shopName}店铺管理员邀请你成为该店铺的成员`, // 分享描述
        //   link:  that.delData() + 'public=true&shopSn=shop_49lj1YTPNBL', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2475314098,1324594906&fm=27&gp=0.jpg', // 分享图标
        //   type: '', // 分享类型,music、video或link，不填默认为link
        //   dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //   success: function () {
        //     // 用户点击了分享后执行的回调函数
            
        //   }
        // });
        wx.onMenuShareAppMessage({
          ...shareData,
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
            
          }
        });
      })
      return shareData
    },
    async sharePage() {
      return new Promise((resolve, reject) => {
        if (utils.getJRE() === 'mini') {
          resolve()
        } else if (utils.getJRE() === 'wx'){
          let shareInfo  = this.$save.get('session', 'shareInfo') || {}
          this.shareInfoOnlyVlaue = this.options.actSn+this.pType+this.options.enumKey+this.options.marketActId+this.options.timeId+this.topicId
          if (shareInfo[this.shareInfoOnlyVlaue]) {
            // 判断同一活动多个分享组件的情况下，只需要生成一次
            await this.setShareInfo()
            console.log('获取分享配置1', shareInfo[this.shareInfoOnlyVlaue])
          } else {
            shareInfo[this.shareInfoOnlyVlaue] = this.options.actSn
            this.$save.set('session', 'shareInfo', shareInfo)
            await this.shareConfig()
          }
          resolve()
        } else {
          
        }
      })
    }
  },
  created() {
    if(!this.shareClose) {
      this.sharePage()
    }
  },
}
export default shareMixin 