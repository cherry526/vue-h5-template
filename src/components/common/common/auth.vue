<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yesong
 * @Date: 2020-08-07 19:44:47
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-07 20:01:31
-->
<template>
  <div>
    <div @click="auth">
      <slot></slot>
    </div>
    <!-- 手机号 -->
    <auth-phone :show.sync="phoneShow" @success="success"></auth-phone>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    name: 'auth',
    components: {},
    data() {
      return {
        phoneShow: false
      }
    },
    computed: {
      ...mapGetters(["wxUser"])
    },
    watch: {
    },
    methods: {
      auth() {
        if (this.phone == '') {
          this.phoneShow = true
        } else {
          this.$emit('authSuccess')
        }
      },
      success() {
        this.$emit('authSuccess')
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