<!--
 * @Description: 首页
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-10 16:38:41
 * @LastEditors: cherry
 * @LastEditTime: 2020-09-28 16:57:05
--> 
<template>
  <div class="home-page">
首页
  </div>
</template>
<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  export default {
    name: 'home',
    components:{
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(["locationInfo", "locationCity", "updatePage"])
    },
    methods: {
      ...mapMutations('index', [
        'SET_UPDATEPAGE',
        'GET_UPDATEPAGE'
      ]),
      ...mapActions('index', [
        'getUpdatePage'
      ]),
 
    },
    created() {

    }
  }
</script>

<style lang='scss'>
  .home-page {
    .act-list {
      .act-item:nth-of-type(2n) {
        margin-left: 18px;
      }
    }
  }
</style>

<style scoped lang='scss'>

</style>