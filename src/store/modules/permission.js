import { asyncRoutes, currencyRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES(state, payload) {
    state.routes = [...currencyRoutes, ...payload]
    state.addRoutes = payload
  }
}
// 遍历asyncRoutes动态路由
function forSearchArr(route, roles) {
  console.log(roles, 'roles', roles.indexOf('Excel'))
  // 删除一些不想让用户看到的数据
  if (roles.indexOf('Excel') != -1) {
    roles.splice(roles.indexOf('Excel'), 1)
    roles.splice(roles.indexOf('Icons'), 1)
    roles.splice(roles.indexOf('Table'), 1)
    roles.splice(roles.indexOf('Echarts'), 1)
    roles.push('Adds')
  }
  let arrNew = []
  for (let item of route) {
    let itemNew = { ...item } //解决浅拷贝共享同一内存地址
    if (roles.includes(itemNew.name)) {
      if (itemNew.children) {
        itemNew.children = forSearchArr(itemNew.children, roles)
      }
      arrNew.push(itemNew)
    }
  }
  return arrNew
}
const actions = {
  getAsyncRoutes({ commit, rootGetters }, roles) {
    return new Promise(resolve => {
      let routes = []
      if (rootGetters.userName === 'admin') {
        routes = asyncRoutes || ''
      } else {
        routes = forSearchArr(asyncRoutes, roles)
      }
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
