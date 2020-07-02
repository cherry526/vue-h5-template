<!--
 * @Description: 测试
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-06-12 15:33:35
 * @LastEditors: cherry
 * @LastEditTime: 2020-06-23 16:50:02
--> 
<template>
  <div class="fixed_footers" v-footers>
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
  .fixed_footers{
    width: 100%;
    overflow-x: hidden;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    font-size: 24px;
  }
</style>