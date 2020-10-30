/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-09 17:13:03
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-08 16:42:09
 */ 
import $save from '@utils/save'
import $api from '@api/index'

const state = {
  token: $save.get('session', 'token') || '',
  // 手机授权
  needAuth: $save.get('session', 'needAuth') || '',
  // 用户信息
  wxUser: $save.get('session', 'wxUser') || {},
  // 当前选中的城市信息
  locationCity: $save.get('session', 'locationCity') || {cityId: 27087, areaName: '深圳'},
  // 默认城市或定位城市
  oneLocationCity: $save.get('session', 'oneLocationCity') ||  { cityId: 27087 },
  // 定位信息
  locationInfo: $save.get('session', 'locationInfo') || {
    areaId: 27409,
    areaName: "深圳",
    city: "深圳市",
    cityId: 27087,
    district: "宝安区",
    latitude: 22.52175429,
    localState: true,
    longitude: 114.05799866,
    nation: "中国",
    province: "广东省",
    refreshVipCardInfo: false,
    street: "创业一路"
  },
  // 更新页面
  updatePage: $save.get('session', 'updateStore') || null,
  // 更新页面管理
  updateStore: {
    'home': false
  },
  // 缓存页面 tab页默认缓存 
  cachedViews: ['tabLayout']
}
const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
    $save.set('session', 'token', data) 
  },
  SET_CODE(state, data) {
    state.code = data
    $save.set('session', 'code', data) 
  },
  SET_NEEDAUTH(state, data) {
    state.needAuth = data
    $save.set('local', 'needAuth', data) 
  },
  SET_WXUSER(state, data) {
    state.wxUser = data
    $save.set('session', 'wxUser', data) 
  },
  SET_LOCATIONCITY(state, data) {
    state.locationCity = data
    $save.set('session', 'locationCity', data) 
  },
  SET_ONELOCATIONCITY(state, data) {
    state.oneLocationCity = data
    $save.set('session', 'oneLocationCity', data) 
  },
  SET_LOCATIONCITYINFO(state, data) {
    state.locationInfo = data
    $save.set('session', 'locationInfo', data) 
  },
  SET_ONE_LOCATIONCITY(state, data) {
    state.oneLocationCity = data
    $save.set('session', 'oneLocationCity', data) 
  },
  SET_UPDATEPAGE(state, data) {
    let updateStore = { ...state.updateStore, ...data }
    state.updateStore = updateStore
    $save.set('session', 'updateStore', updateStore)
  },
  ADD_CACHED_VIEWS(state, data) {
    console.log('router--------------',data)
    if (state.cachedViews.includes(data.name)) return
    if (data.meta.keepAlive) {
      console.log('设置成功--------------', data)
      state.cachedViews.push(data.name)
    }
  }
}
const actions = {
  getUpdatePage({commit, state}, data) {
    console.log(state.updateStore, 'state.updateStore', data)
    let flag = state.updateStore[data]
    return new Promise((resolve,reject) => {
      if(flag) {
        resolve(flag)
        let updateStore = {}
        updateStore[data] = false
        commit('SET_UPDATEPAGE', updateStore)
      } else {
        resolve(flag)
      }
    })
  },
  setToken({commit, state}, data) {
    commit('SET_TOKEN', data)
  },
  setLocationCity({commit, state}, data) {
    commit('SET_LOCATIONCITY', data)
  },  
  setOneLocationCity({commit, state}, data) {
    commit('SET_ONELOCATIONCITY', data)
  },
  setLocationCityInfo({commit, state}, data) {
    // 获取定位信息
    const getLocation = () => {
      const showPosition = (position) => {
        $api.userLocation({ lat: position.lat, lng: position.lng}).then(res => {
          if(res.state) {
            commit('SET_LOCATIONCITYINFO', res.info)
            commit('SET_LOCATIONCITY', res.info)
          } else {
            commit('SET_LOCATIONCITYINFO', position)
          }
        })
      }
      // 定位失败再请求定位，测试使用
      const showErr = () => {
        console.log("定位失败")
        // getLocation()
      }
      var geolocation = new qq.maps.Geolocation("SKLBZ-67R6W-QCERG-OI2RA-VDCDV-4JBE4", "本地会员生活服务");
      // console.log('获取定位信息', geolocation)
      // geolocation.getIpLocation(this.showPosition, this.showErr);
      geolocation.getLocation(showPosition, showErr);//或者用getLocation精确度比较高
    }
    getLocation()
  },
}
export default {
  state,
  mutations,
  actions
}
