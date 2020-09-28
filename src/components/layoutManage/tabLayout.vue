<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-09 17:49:19
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-08 15:06:06
--> 
<template>
  <div>
    <main>
      <keep-alive>
        <router-view> </router-view>
      </keep-alive>
      <!-- <router-view v-if="!$route.meta.keepAlive"> </router-view> -->
    </main>
    <footer class="footer">
      <van-tabbar v-model="active" @change="onChange" active-color="#CD7B00" inactive-color="#4D4C4B">
        <van-tabbar-item v-for="(item, index) in tabList" :key="index">
          <span>{{item.title}}</span>
          <template #icon="props">
            <img class="active-icon" :src="props.active ? item.active : item.normal" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>
<script>
  export default {
    name: 'tabLayout',
    components:{},
    data() {
      return {
        active: 0,
        tabList: [
          { 
            title: '优惠特卖',
            active: 'http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_h5/tab_sale_selct.png',
            normal: 'http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_h5/tab_sale.png',
            path: '/index/home'
          },
          { 
            title: '会员中心',
            active: 'http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_h5/tab_my_selct.png',
            normal: 'http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_h5/tab_my.png',
            path: '/index/center'
          }
        ],
      }
    },
    watch: { //监听路由变化
      $route(to, from) {
        this.active = this.$route.path === '/index/home' ? 0 : 1
      }
    },
    mounted() {
      this.active = this.tabList.findIndex(item => {
        return this.$route.path === item.path
      })
    },
    methods: {
      onChange(index) {
        if(this.$route.path === this.tabList[index].path ) return
        this.$router.push({
          path: this.tabList[index].path
        })
      },
    },
    created() {

    }
  }
</script>
<style scoped lang='scss'>
  main {
    background-color: #F4F4F4;
    width: 100vw;
    min-height: 100%;
    // overflow-y: scroll;
    padding-bottom: 100px;
    box-sizing: border-box;
  }
  .logo {
    width: .67rem;
    height: .67rem;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0px;
    width: 100%;
    background-color: #F7F7FA;
    &.bot{
      bottom: 1.33rem !important;
    }
  }
  .active-icon {
    width: 48px;
    height: 48px;
  }
</style>