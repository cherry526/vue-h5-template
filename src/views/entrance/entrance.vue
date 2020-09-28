<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-16 14:41:45
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-05 10:02:03
--> 
<template>
  <div>

  </div>
</template>
<script>
  import linkPage from '@/router/linkPage'
  import { AUTH_API } from '@/config/index.js'
  import utils from '@utils/utils'
  import entranceMixin from '@/mixins/entranceMixin'

  export default {
    name: 'entrance',
    mixins: [ entranceMixin ],
    computed: {},
    components:{},
    data() {
      return {
      }
    },
    methods: {
      // 刷新页面
      reloadPage() {
        
      }
    },
    mounted() {
      this.initPage()
    },
    created() {
    }
  }
</script>
<style scoped lang='scss'>
</style>