<!--
 * @Description: 授权组件
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-08-03 20:02:49
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-07 20:03:52
--> 
<template>
  <div>
    <van-dialog v-model="phoneShow" title="手机验证" show-cancel-button confirm-button-color="#CD7B00" @confirm="submit">
      <div class="phone-content">
        <div class="form">
          <div class="item flex-v">
            <input class="w"  type="text" v-model.trim="phone"  maxlength="11" placeholder="请输入手机号码">
          </div>
          <div class="item flex-v">
            <input class="flex-1 code-input"  type="text"  maxlength="6" v-model.trim="code"  @input="code = code.replace(/[^\d\.]/g, '')" placeholder="请输入验证码">
            <div class="num ft30 c8C" v-if="time"><span class="cCD">{{ codeNun }}s</span>后重发</div>
            <div class="num ft30" :class="phone.length === 11 ? 'cCD' : 'c8C'" v-else @click="getCode">获取验证码</div>
          </div>
          <!-- <button class="active" @click="submit">确认</button> -->
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from "vuex";
  import utils from '@utils/utils'
  export default {
    name: 'authPhone',
    components: {},
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        phoneShow: false,
        codeNun: 60,
        phone: '',
        code: '',
        time: false
      }
    },
    computed: {
      ...mapGetters(["wxUser"])
    },
    watch: {
      'show': function(val) {
        this.phoneShow = val
      },
      'phoneShow': function(val) {
        this.$emit('update:show', val)
      },
    },
    methods: {
      ...mapMutations('index', [
        'SET_WXUSER'
      ]),
      // 获取验证码
      getCode () {
        if (!this.phone) {
          this.$Toast('手机号不能为空')
          return
        } else if (!utils.isCellphone(this.phone)) {
          this.$Toast('手机号格式不正确')
          return
        }
        if (this.time) return
        this.$api.phone_send_message({
          phone: this.phone,
          template: 33,
          senceType: 'PHONE_AUTH'
        }).then(res=> {
          if (res.state) {
            setTimeout(()=> {
              this.$Toast('短信已发送~')
            })
            this.time = true
            let Interval = setInterval(()=> {
              let codeNun = this.codeNun
              codeNun = codeNun-1
              if (codeNun <= 0) {
                codeNun = 60
                this.time = false
                clearInterval(Interval)
              }
              this.codeNun = codeNun
            }, 1000)
          } else {
            this.$Toast(res.message)
          }
        })
      },
      submit() {
        this.$api.phone_msg_check({
          phone: this.phone,
          code: this.code,
          senceType: 'PHONE_AUTH'
        }).then(res => {
          if (res.state) {
            if (this.wxUser.phone) {
              this.$Toast('手机号修改成功~')
            } else {
              this.$Toast('手机号授权成功~')
            }
            let wxUser = this.wxUser
            wxUser.phone = this.phone
            this.SET_WXUSER(wxUser)
            this.$emit('success')
          } else {
            this.$Toast(res.message)
          }
        })
      }
    },

    mounted() {
    },
    created() {
      this.phone = this.wxUser.phone || ''
    }
  }
</script>
<style scoped lang='scss'>
  .phone-content {
    padding-bottom: 70px;
  }
  .phone-content .form {
    padding: 0 30px;
  }
  .phone-content  .item {
    height: 102px;
    border-bottom: 1px solid #F6F6F6;
  }
  .phone-content .item input {
    font-size: 32px;

  }
  .phone-content .item  .code-input {
    width: 340px;
  }
  .phone-content  .item .lable {
    display: inline-block;
    width: 150px;
  }
  .phone-content  .item .num {
    width: 240px;
    padding-left: 20px;
    border-left: 1px solid #F6F6F6;
  }
  .phone-content button {
    margin-top: 60px;
    background-color: #EAEAEA !important;
    line-height: 96px;
    font-size: 32px;
    color: #B5B5B5;
    border-radius: 96px;    
  }
  .phone-content button.active {
    background-color: transparent !important;
    background-image: linear-gradient(-14deg, #FBCA8F 0%, #FFE5B7 100%);
    box-shadow: inset 0 -1px 3px 0 rgba(251,202,143,0.65);
    color: #994514;
  }

</style>