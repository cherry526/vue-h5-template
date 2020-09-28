<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yesong
 * @Date: 2020-07-29 14:11:44
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-08 11:53:39
--> 
<template>
  <div class="common-list">
    <!-- 开启下拉刷新 -->
    <van-pull-refresh :disabled="!dropDown" v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="act-list"
        v-model="loading"
        :finished="finished"
        :finished-text="dataList.length === 0 ? '' : '已经到底了~'"
        @load="getList()"
        :immediate-check="false"
      >
        <slot v-bind:list="dataList" />
        <div v-if="dataList.length === 0 && listLoading" class="tac empty-data">
          <img src="http://doyd.oss-cn-shenzhen.aliyuncs.com/vip_mini_apply/empty_state.png" alt="">
          <div>暂无数据</div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: 'commonList',
  props: {
    beforeSetList: { // 赋值list数据之前
      type: Function,
      default: (list) => {
        return list
      }
    },
    beforeRequest: { // 请求list数据之前
      type: Function,
      default: () => {
        return {}
      }
    },
    auto: { // 列表是否启动页面自执行
      type: Boolean,
      default: true
    },
    pageName: {
      type: String,
      default: 'page',
    },
    listName: {
      type: String,
      default: 'actList',
    },
    apiName: { // 请求接口名称
      type: String,
      default: '',
      required: true
    },
    filterData: { // 请求数据
      type: Object
    },
    list: { // 列表数据
      type: Array
    },
    refresh: { // 重置列表
      type: Boolean,
      default: false
    },
    dropDown: { // 是否开启上拉刷新
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 刷新列表
    refresh(newVal, oldVal) {
      if (newVal) {
      console.log(this.refresh, newVal, 'refresh执行')
        this.page = 1
        this.loading = true;
        this.getList()
        this.$emit('update:refresh', false)
      }
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      dataList: [],
      listLoading: false
    }
  },
  methods: {
    onRefresh() {
      console.log('onRefresh执行')

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.page = 1
      this.loading = true;
      this.listLoading = false
      this.getList();
    },

    // 处理请求数据
    handelList() {
      
    },

    // 请求列表数据
    async getList(event) {
      this.apiLoad = false
      if(this.apiLoad) return false
      if (this.refreshing) {
        this.dataList = [];
        this.refreshing = false;
        this.listLoading = false
      }
      
      let data = JSON.parse(JSON.stringify(this.filterData))
      let extra =  await this.beforeRequest(data) // 请求之前
      data = Object.assign({}, data, extra)
      data.page = this.page
      // console.log(data, 'data')
      
      this.$api[this.apiName](data).then(async res=> {
        this.apiLoad = true
        if(!res || !res.state) {
          this.finished = true
        }
        if (res.state) {
          let list = res.info[this.listName] || []
          let pageInfo = res.info[this.pageName] || {}
          list = await this.beforeSetList(list)
          if (this.page == 1) {
            this.totalPage = pageInfo.totalPage || 1
            this.listLoading = true
            this.finished = false
          } else {
            list = [...this.dataList, ...list]
          }
          if (this.page >= this.totalPage) {
            this.finished = true
          }
          this.dataList = list
          this.$emit('update:list', list)
          this.$emit('change', {
            page: this.page,
            totalPage: this.totalPage,
            finished: this.finished
          })
          this.page++
        }
      }).finally(() => {
        this.loading = false
      })
    },
  },
  created () {
    this.auto && this.getList();
    this.loading = true
  }
}
</script>
<style lang="scss" scoped>
.empty-data {
  img {
    width: 469px;
    height: 349px;
    margin: 178px auto 40px; 
  }
  div {
    font-size: 28px;
    color: #8C8E99;
  }
}
</style>


