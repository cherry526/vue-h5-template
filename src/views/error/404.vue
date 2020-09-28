<!--
 * @Description: 404
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-10 17:11:47
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-05 20:32:08
--> 
<template>
  <div class="flex-col-c">
    <img class="err-logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594982699465&di=168d58dbdb6cedcfdcfb58c8a52e7ee2&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3537650853%2C3173206206%26fm%3D214%26gp%3D0.jpg" alt="">
    <div class="err-btn ft32 c1A mt20">
      啊哦，这个页面一边儿凉快去了~~
    </div>
    <button class="err-back mt20" @click="back">返回上一页</button>
  </div>
</template>
<script>
  export default {
    name: 'empty',
    components:{},
    data() {
      return {
      }
    },
    methods: {
      back() {
        this.$router.go(0)
      }
    },
    created() {
    }
  }
</script>
<style scoped lang='scss'>
  .err-logo {
    width: 400px;
    height: 400px;
  }
  .err-back {
    color: #8C4B00;
    padding: 0 20px;
    height: 60px;
    line-height: 1;
    background-image: linear-gradient(90deg, #FFE6B7 0%, #FFE6B7 0%, #FFCF94 100%);
    border-radius: 30px;
  }
</style>