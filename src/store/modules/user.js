import { login } from '@/api/login'
import { logout, getInfo, getPerms } from '@/api/account'
import { setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const state = {
  token: '',
  name: '',
  avatar: '',
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: []
}

const mutations = {
  RESET_STATE: (state) => {
    state.token = ''
    state.name = ''
    state.avatar = ''
    state.perms = []
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMS: (state, perms) => {
    state.perms = perms
  }
}

const actions = {
  // 管理员登录
  async login({ commit }, loginInfo) {
    const { username, password, captchaId, verifyCode } = loginInfo
    const res = await login({
      username: username.trim(),
      password: password.trim(),
      captchaId: captchaId.trim(),
      verifyCode: verifyCode.trim()
    })
    const { data } = res
    commit('SET_TOKEN', data.token)
    setToken(data.token)
  },

  getInfo({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      Promise.all([getPerms(), getInfo()])
        .then((results) => {
          const pm = results[0].data
          const info = results[1].data
          const { perms, menus } = pm

          // set store
          commit('SET_PERMS', perms)
          commit('SET_NAME', info.name)
          commit('SET_AVATAR', info.headImg)

          // init socket
          // dispatch('ws/initSocket', null, { root: true })

          resolve({ menus, perms, user: info })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          // 清除localstorage存储的token
          removeToken()
          location.reload()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 清除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      // 清除localstorage存储的token
      removeToken()

      // reset state
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
