import { filterAsyncRoutes } from '@/router/generator-routers'
import { NotFoundRouter } from '@/config/router.config'
const state = {
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
  }
}

const actions = {
  async generateRoutes({ commit }, menus) {
    try {
      const accessRoutes = await filterAsyncRoutes(menus, false)
      accessRoutes.push(NotFoundRouter)
      commit('SET_ROUTES', accessRoutes)
    } catch (error) {
      console.log(error)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
