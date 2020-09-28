<!--
 * @Description: 返回首页按钮
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-08-05 10:56:10
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-10 11:23:44
--> 
<template>
  <div>
    <div class="back-box flex-cc" @click="backHome" v-show="backShow">
      <span class="back-icon iconfont iconnav_home"></span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'backIcon',
    components: {},
    props: {},
    data() {
      return {
        backShow: false
      }
    },
    computed: {},
    watch: {  
      '$route' (to, from) {  
        console.log(to, from, '--------back')
        if(to.query.entrance && (to.name !== 'home' && to.name !== 'center' && to.path !== '/')) {
          this.backShow = true
        } else {
          this.backShow = false
        }
      }
    },
    methods: {
      backHome() {
        this.$router.push({
          name: 'home'
        })
      }
    },
    mounted() {
    },
    created() {
      // console.log(this.$route, 'this.$route.query---------back', window.location.href)
      // if(this.$route.query.entrance && (this.$route.name !== 'home' || this.$route.name !== 'center')) {
      //   this.backShow = true
      // }
    }
  }
</script>
<style scoped lang='scss'>
.back-box {
  position: fixed;
  bottom: 240px;
  right: 18px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.20);
  .back-icon {
    font-size: 40px;
  }
}
</style>