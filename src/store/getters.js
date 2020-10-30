/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-09 17:13:03
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-08 14:38:23
 */ 
const getters = {
  token: state => state.index.token,
  needAuth: state => state.index.needAuth,
  wxUser: state => state.index.wxUser,
  locationCity: state => state.index.locationCity,
  oneLocationCity: state => state.index.oneLocationCity,
  locationInfo: state => state.index.locationInfo,
  updatePage: state => state.index.updatePage,
  cachedViews: state => state.index.cachedViews,
}
export default getters
