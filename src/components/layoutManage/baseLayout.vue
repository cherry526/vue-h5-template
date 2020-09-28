<!--
 * @Description: 灰底背景
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-17 15:05:11
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-08 15:04:02
--> 
<template>
  <div class="base-container">
    <keep-alive :include="cachedViews">
      <router-view> </router-view>
    </keep-alive>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'baseLayout',
    components: {},
    computed: {
      ...mapGetters(['cachedViews'])
    },
    props: {},
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
 .base-container {
    background-color:#F6F6F6;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    // overflow-x: hidden;
  }
</style>