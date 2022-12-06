// import { printANSI } from '../../../sf-vue-admin/src/utils'
import store from '@/store'
import { getToken } from '@/utils/auth'

export default function Initializer() {
  // printANSI()

  store.commit('user/SET_TOKEN', getToken())
}
