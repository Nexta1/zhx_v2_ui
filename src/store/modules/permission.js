import { filterAsyncRoutes } from '@/router/generator-routers'
import { constantRoutes, NotFoundRouter } from '@/config/router.config'
const state = {
  addRoutes: [],
  routes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    const accessRoutes = filterAsyncRoutes(menus, false)
    accessRoutes.push(NotFoundRouter)
    commit('SET_ROUTES', accessRoutes)
    return accessRoutes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
