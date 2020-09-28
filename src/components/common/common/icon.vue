<!--
 * @Description: svg字体图标
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-21 18:38:54
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-22 09:12:49
--> 
<template>
  <div>
    <svg class="icon" :style="iconStyle" aria-hidden="true">
      <use :xlink:href="'#' + icon"></use>
    </svg>
  </div>
</template>
<script>
  export default {
    name: 'icon',
    components: {},
    props: {
      icon: {
        type: String,
        default: ''
      },
      iconStyle: {
        type: Object,
        default: function() {
          return {}
        }      
      }
    },
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
  .icon {
    width: 1em; 
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>