<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yesong
 * @Date: 2020-07-29 16:08:49
 * @LastEditors: cherry
 * @LastEditTime: 2020-07-30 17:57:48
--> 
<template>
  <div class="sortTab">
    <div class="tabbar" id="tabbar" :style="{background:  isShowPanel ? '#fff' : '' }">
      <div class="nav flex-b">
        <div class="nav-item flex-v" @click="_tabCLick(0)">
          <span>{{business}}</span>
          <span class="nav-icon iconfont iconicon_spread"></span>
        </div>
        <div class="nav-item flex-v" @click="_tabCLick(1)">
          <span>{{category}}</span>
          <span class="nav-icon iconfont iconicon_spread"></span>
        </div>
        <div class="nav-item flex-v" @click="_tabCLick(2)">
          <span>{{sort}}</span>
          <span class="nav-icon iconfont iconicon_spread"></span>
        </div>
      </div>
      <div class="sort-list" v-show="isShowPanel" catchtouchmove="catchtouchmove">
        <div v-if="activeIndex == 0" class="scroll-div flex">
          <div class="cat-left scroll-box">
            <div
              :class="['sort-li', 'cat-li', curAreaIndex === -2 ? 'current': '']"
              @click="_selectArea(-2, '全城', 0)"
            >全城</div>
            <div
              :class="['sort-li', 'cat-li', curAreaIndex === -1 ? 'current': '']"
              @click="_selectArea(-1, '热门商圈', 0)"
            >热门商圈</div>
            <div v-for="(item, key) in areaList" :key="key">
              <div
                :class="['sort-li', 'cat-li', curAreaIndex == key ? 'current' : '']"
                @click="_selectArea(key, item.areaName, item.areaId)"
              >{{item.areaName}}</div>
            </div>
          </div>
          <div class="cat-right scroll-box">
            <!-- <div class=' sort-li cat-li' bindtap='changeList' data-name="附近" data-tabtype="0" data-type="1">附近</div> -->
            <div v-for="(item, key) in areaListSec" :key="key">
              <div
                class="sort-li cat-li"
                bindtap="changeList"
                :data-bid="item.busCircleId"
                :data-aid="currentAreaId"
                :data-name="item.busCircleName"
                :data-tabtype="0"
                :data-type="item.type"
                :data-range="item.range"
                @click="changeList(item.busCircleName, $event)"
              >{{item.busCircleName}}</div>
            </div>
          </div>
        </div>
        <div v-else-if="activeIndex == 1" class="scroll-div flex">
          <div class="cat-left scroll-box">
            <div
              :class="['sort-li', 'cat-li', curIndex == -1 ? 'current': '']"
              bindtap="changeList"
              data-cid="0"
              data-name="全部品类"
              data-tabtype="1"
              data-type="4"
              @click="changeList('全部品类', $event)"
            >全部品类</div>
            <div v-for="(item, key) in categoryListFirst" :key="key">
              <div
                :class="['sort-li', 'cat-li', curIndex == key ? 'current' : '']"
                :data-index="key"
                bindtap="_selectCate"
                :data-id="item.ctgId"
                :data-name="item.ctgName"
                @click="_selectCate(item.ctgId, key, item.ctgName)"
              >{{item.ctgName}}</div>
            </div>
          </div>
          <div class="cat-right scroll-box">
            <div
              class="sort-li cat-li"
              bindtap="changeList"
              :data-cid="currentCtgId"
              :data-pcid="currentCtgId"
              data-name="全部"
              data-tabtype="1"
              data-type="4"
              @click="changeList('全部', $event)"
            >全部</div>
            <div v-for="(item, key) in categoryListSec" :key="key">
              <div
                class="sort-li cat-li"
                bindtap="changeList"
                :data-cid="item.ctgId"
                :data-pcid="currentCtgId"
                :data-name="item.ctgName"
                data-tabtype="1"
                data-type="4"
                @click="changeList(item.ctgName, $event)"
              >{{item.ctgName}}</div>
            </div>
          </div>
        </div>
        <div v-else-if="activeIndex == 2" class="scroll-div scroll-box">
            <template>
              <div
                v-for="(item, key) in sortList"
                :key="key"
                class="sort-li act-li"
                bindtap="changeList"
                :data-name="item.name"
                :data-sorttype="item.sortType"
                data-tabtype="2"
                data-type="5"
                @click="changeList(item.name, $event)"
              >{{item.name}}</div>
            </template>
        </div>
      </div>
    </div>
    <van-overlay :show="isShowPanel" @click="_hidePanel" :lock-scroll="false" />
  </div>
</template>
<script>
export default {
  name: 'sortTab',
  props: {
    cityId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      business: '商圈·全城',
      category: '全部品类',
      sort: '综合排序',
      discount: '折扣筛选',
      type: 1,
      curAreaIndex: -3,
      curIndex: -2,
      activeIndex: -1,
      currentIndex: -1,
      areaList: [],
      areaListSec: [],
      categoryListFirst: [],
      currentCtgId: -1,
      categoryListSec: [],
      curCateName: '全部品类',
      // 距离
      distanceList: [
        {
          type: 1,
          range: '0',
          busCircleName: '全城'
        },
        {
          type: 1,
          range: '500',
          busCircleName: '500米'
        },
        {
          type: 1,
          range: '1000',
          busCircleName: '1000米'
        },
        {
          type: 1,
          range: '2000',
          busCircleName: '2000米'
        },
        {
          type: 1,
          range: '5000',
          busCircleName: '5000米'
        }
      ],
      // 综合排序下拉(精品特卖)
      sortList: [
        {
          sortType: '1',
          name: '综合排序'
        },
        {
          sortType: '2',
          name: '人气最高'
        },
        {
          sortType: '3',
          name: '距离优先'
        },
        {
          sortType: '4',
          name: '低价优先'
        },
        {
          sortType: '5',
          name: '高价优先'
        },
        {
          sortType: '6',
          name: '销量最高'
        }
      ],
      isShowPanel: false
    }
  },
  watch: {
    cityId (cityId, oldCityId) {
      if (cityId) {
        this.areaListFn(cityId)
        this.categoryFn(cityId)
      }
    }
  },
  methods: {
    // 获取城市区域列表
    areaListFn (cityId = 0) {
      this.$api.business_area({
        cityId,
        type: 2
      }).then(res => {
        this.areaList = res.info.areaList
      })
    },
    // 获取品类列表
    categoryFn (cityId = 0, ctgId = 0) { // ctgId: 父集品类Id，获取第一级品类时，传0
      this.$api.business_category({
        cityId,
        ctgId,
        type: 2
      }).then(res => {
        if (res.state) {
          let _list = res.info.categoryList
          if (ctgId) {
            this.categoryListSec = _list
          } else {
            this.categoryListFirst = _list
          }
        }
      })
    },
    // 展开面板
    _tabCLick (index) {
      if (this.isShowPanel && index === this.activeIndex) {
        this.activeIndex = -1
        this.isShowPanel = false
        this.$emit('changemask', false)
      } else {
        this.activeIndex = index
        this.isShowPanel = true
        this.$emit('changemask', true)
      }
    },
    // 筛选二级区域
    _selectArea (index, name, areaId = 0) {
      const curAreaIndex = this.curAreaIndex
      if (curAreaIndex === index) return
      if (name === '全城') {
        this.curAreaIndex = -2
        this.areaListSec = this.distanceList
      } else {
        let cityId = this.cityId || '27087'
        let hot = name === '热门商圈' ? 1 : 0
        this.$api.business_circle_v2({
          type: 2,
          cityId,
          areaId,
          hot
        }).then(res => {
          if (res.state) {
            let busCircleList = res.info.busCircleList || []
            let obj = {
              busCircleName: '全部'
            }
            busCircleList.unshift(obj)
            busCircleList.forEach(itme => {
              itme.type = 2
            })
            this.areaListSec = busCircleList
          }
        })
        this.curAreaIndex = index
      }
      this.curAreaName = name
      this.currentAreaId = areaId || 0
    },
    // 获取热门商圈
    _getHotCircle (cityId) {
      return new Promise((resolve, reject) => {
        if (this.busCircleList) {
          resolve(this.busCircleList)
        } else {
          this.$api.business_circle({
            cityId: this.cityId
          }).then(res => {
            if (res.code === 0) {
              let busCircleList = res.info.busCircleList || []
              this.busCircleList = busCircleList
              resolve(busCircleList)
            } else {
              reject(res)
            }
          })
        }
      })
    },
    // 筛选二级分类
    _selectCate (ctgId, index, curCateName) {
      let cityId = this.cityId
      this.currentCtgId = ctgId
      this.curIndex = index
      this.curCateName = curCateName
      this.categoryFn(cityId, ctgId)
    },
    _hidePanel () {
      this.activeIndex = -1
      this.isShowPanel = false
      this.$emit('changemask', false)
    },
    // 选定筛选条件
    changeList (name, event) {
      let activeIndex = this.activeIndex
      if (activeIndex === 0) {
        // 选择全部时将tabbar上显示为一级菜单
        if (name === '全部') {
          name = this.curAreaName
        }
        this.business = name
      } else if (activeIndex === 1) {
        // 【全部品类】增加选中样式
        if (name === '全部品类') {
          this.curIndex = -1
          this.categoryListSec = []
          this.curCateName = '全部品类'
          this.currentCtgId = 0
        }
        // 选择全部时将tabbar上显示为一级菜单
        if (name === '全部') {
          name = this.curCateName
        }
        this.category = name
      } else if (activeIndex === 2) {
        this.sort = name
      } else if (activeIndex === 3) {
        this.discount = name
      }
      this._hidePanel()
      // 将条件传给父组件
      this.$emit('changeList', event.target.dataset)
    }
  },
  created () {
    if (this.cityId) {
      this.areaListFn(this.cityId)
      this.categoryFn(this.cityId)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabbar {
  font-size: 28px;
  padding: 0 30px;
  color: #3C3F4D;
  position: relative;
  z-index: 100;
}

.nav {
  height: 80px;
  position: relative;
  z-index: 10;
}

.active {
  color: #D90634;
}

.nav-icon {
  font-size: 18px;
  margin-left: 6px;
}

.scroll-box {
  height: 810px;
  overflow: auto;
}

.sort-list {
  font-size: 28px;
  width: 100%;
  max-height: 810px;
  position: absolute;
  top: 80px;
  left: 0;
  background: #fff;
  z-index: 11;
}

.sort-li {
  padding-left: 30px;
  height: 90px;
  line-height: 90px;
}

.cat-left {
  width: 330px;
  background: #F7F8FA;
}

.cat-left .cat-li {
  background: #F7F8FA;
}

.cat-right {
  width: 420px;
}

.cat-left .current {
  background: #FFFFFF;
  border-left: 9px solid #FBCC93;
}
.sortTab {
  position: relative
}
.mask {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.5);
  z-index: 10;
}
</style>
