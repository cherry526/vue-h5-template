/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-23 16:29:21
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-04 13:55:41
 */ 
import $save from '@utils/save'

const state = {
  active: $save.get('local', 'active') || {},
  updateGift: $save.get('session', 'updateGift') || false,
  updateFlag: $save.get('session', 'updateFlag') || false
}
const mutations = {
  SET_ACTIVE(state, data) {
    state.active = data
    $save.set('local', 'active', data)
  },
  SET_UPDATEGIFT(state, data) {
    state.updateGift = data
    $save.set('session', 'updateGift', data)
  },
  SET_UPDATEFLAG(state, data) {
    state.updateFlag = data
    $save.set('session', 'updateFlag', data)
  },
}
const actions = {
  setActive({commit}, data) {
    commit('SET_ACTIVE', data)
  },
  setUpdateGift({commit}, data) {
    commit('SET_UPDATEGIFT', data)
  },
}
export default {
  state,
  mutations,
  actions
}