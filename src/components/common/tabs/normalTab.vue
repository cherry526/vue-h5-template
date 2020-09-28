<!--
 * @Description: 常规tab
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-14 10:59:11
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-31 16:52:10
--> 
<template>
  <div>
    <template v-if="styleBox == 1">
      <template v-if="fixed == 1">
        <div class="tab fixed flex-b">
          <div class="tac" v-for="(item, index) in tab"  :key="index" @click="tabClick(index)">
            <div class="tab-item  flex-co-s" :class="index == tabIndex ? 'tab-active' : ''">
              <div class="tab-text"> {{ itemName == '' ? item : item[itemName] }}  </div>
              <img class="tab-line" v-if="index == tabIndex" src="http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_mini_apply/v1.4.1/tabline_small.png"></img>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="tab flex-b" :class="fixed == 3 ? 'sticky' : 'fixed'">
          <div class="tac" v-for="(item, index) in tab"  :key="index" @click="tabClick(index)">
            <div class="tab-item  flex-co-s" :class="index == tabIndex ? 'tab-active' : ''">
              <div class="tab-text"> {{ itemName == '' ? item : item[itemName]  }}  </div>
              <img class="tab-line" v-if="index == tabIndex" src="http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_mini_apply/v1.4.1/tabline_small.png"></img>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="tab-scroll sticky">
        <div class="scroll-tab-item tac" v-for="(item, index) in tab" :key="index" @click="tabClick(index)">
          <div class="flex-co-s">
            <div class="ft32 c1A" :class="index == tabIndex ? 'tab-active' : ''">{{ temName == '' ? item : item[itemName] }}</div>
            <img class="tab-line" v-if="index == tabIndex" src="http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_mini_apply/v1.4.1/tabline_small.png"></img>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'normalTab',
    components:{},
    props: {
      tab:{
        type: Array,
        default: []
      },
      fixed: { // 1 层级最高定位 2 css定位 3 粘性定位
        type: Number,
        default: 1
      },
      styleBox: { // 展示样式 1 弹性布局  2 可左右滑动
        type: Number,
        default: 1
      },
      itemName: {
        type: String,
        default: ''
      },
      tabIndex: { // 默认选中
        type: Number,
        default: 0
      }
    },
    model: {
      prop: 'tabIndex',
      event: 'change'
    },
    data() {
      return {
        // tabIndex: 0,
        scrollLeft: 0,
      }
    },
    methods: {
      // 点击tab栏
      tabClick (index) {
        if (index == this.tabIndex) return
        this.$emit('change', index)
      }
    },
    created() {
    }
  }
</script>
<style scoped lang='scss'>
.tab {
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 0 0 #F5F3F0;
  padding: 10px 60px;
  box-sizing: border-box;
  z-index: 9;
}
.tab-item {
  font-size: 32px;
  color: #1A1919;
}
.tab-item .tab-text{
  padding: 0 6px;
  line-height: 56px;
}
.tab-line {
  height: 10px;
  width: 74px;
}
.tab-active {
  color: #D07D00;
  font-weight: bold;
}
.fixed {
  position: fixed;
  top: 0;
}
.sticky {
  width: 100%;
  position: sticky;
}
.tab-scroll {
  background: #fff;
}
.tab-scroll .scroll-tab-item {
  display: inline-block;
  margin-right: 54px;
}
.tab-scroll .scroll-tab-item {
  padding-top: 30px;
  display: inline-block;
  margin-right: 54px;
}
.tab-scroll .scroll-tab-item:first-child {
  margin-left: 24px;
}
.tab-scroll .scroll-tab-item:last-child {
  margin-right: 24px;
}
.tab-scroll {
  height: 86px;
  white-space: nowrap;
}
.tab-scroll .tab-line {
  margin-top: 12px;
}
</style>