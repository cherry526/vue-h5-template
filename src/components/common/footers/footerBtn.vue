<!--
 * @Description: 测试
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-12 15:33:35
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-15 14:19:54
--> 
<template>
  <div class="fixed-footer" v-footers>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'footerBtn',
    components:{},
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
    }
  }
</script>
<style scoped lang='scss'>
  // .fixed_footers{
  //   width: 100%;
  //   overflow-x: hidden;
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   text-align: center;
  //   font-size: 24px;
  // }
  .fixed-footer {
    width: 100%;
    height: 300px;
    font-size: 18px;
    @include font_color("font_color1");
    @include background_color("background_color1");
    @include border_color("border_color1");
  }
</style>