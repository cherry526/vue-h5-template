<!--
 * @Description: 顶部搜索tab
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-15 11:02:06
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-14 10:28:17
--> 
<template>
  <div>
    <div class="search-container flex-v" style="z-index: 12;">
      <div class="search-box flex-c-b">
        <span class="iconfont iconicon_searchbar c9E"></span>
        <input :placeholder="placeholder" class="flex-1"  v-model.trim="searchText" @focus="getFocus"  @input='getInput' />
        <img v-if="resultState" src="http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_h5/close_icon.png" class="search_clear" @click='clearSearch' alt="">
      </div>
      <span class="cancle" @click='rightClick' v-if="rightText">{{rightText}}</span>
      <slot v-else></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'searchTab',
    components:{},
    props: {
      placeholder: {
        type: String,
        default: '搜索你需要的活动名或卡券名'
      },
      rightText: {
        type: String,
        default: ''
      },
      keyWord: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        searchText: this.keyWord, //搜索的关键字
        resultState: false, //是否显示搜索结果
      }
    },
    watch: {
      'keyWord' (val) {
        this.searchText = val
        console.log(this.keyWord, 'this.keyWord')

      },
      'searchText' (val) {
        this.$emit('update:keyWord',val)
      }
    },
    methods: {
      // 输入框聚焦
      getFocus() {
        this.$emit('isFocus')
      },
      // 获取输入框的值
      getInput() {
        console.log(this.searchText, '------------this.searchText')
        this.resultState = !!this.searchText
        this.$emit('update:keyWord', this.searchText)
        this.$emit('change', this.searchText)
      },
      // 清空搜索框内容
      clearSearch() {
        this.searchText = '',
        this.resultState = false //隐藏搜索结果列表
      },
      // 点击取消/搜索/右边
      rightClick() {
        if (this.rightText === '取消') {
          this.$router.go(-1)
        } else if(this.rightText === '搜索'){
          this.$router.push({
            name: 'search',
            query: {
              keyword: this.searchText
            }
          })
        } else {
          this.$emit('right')
        }
        
      },
    },
    created() {
    }
  }
</script>
<style scoped lang='scss'>
  .search-container {
    padding: 18px 35px 22px 30px;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    z-index: 12;
  }

  .search-box {
    flex: 1;
    background:#F5F3F0;
    border-radius: 60px;
    height: 60px;
    input {
      background:#F5F3F0;
      font-size: 28px;
      color: #1A1919;
    }
  }

  .search-box .iconicon_searchbar {
    font-size: 30px;
    margin-left: 30px;
    margin-right: 12px;
  }
  .search-box .search_clear{
    margin: 0 30px;
    width: 36px;
    height: 36px;
  }
  .cancle {
    margin-left: 29px;
    font-size: 32px;
    color: #666564;
  }

</style>