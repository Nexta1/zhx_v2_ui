import { toHump } from '@/utils'
import store from '@/store'
import { checkPermission } from './check-permission'
function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  const apiModules = {}
  const modulesPermissionFiles = require.context('@/api', true, /\.class\.js$/)
  modulesPermissionFiles.keys().forEach((path) => {
    const pathList = path
      .substring(2)
      .replace('.class.js', '')
      .split('/')
      .map((e) => {
        return toHump(e)
      })
    const parents = pathList.slice(0, pathList.length - 1)
    const name = pathList[pathList.length - 1]
    const RequestDefault = require(`@/api/${path.replace('./', '')}`).default
    if (!RequestDefault) {
      throw new Error('use .class.js must export default class')
    }
    const instance = new RequestDefault()
    if (parents.length <= 0) {
      // 没有父文件夹
      apiModules[name] = instance
    } else {
      let cur = apiModules
      parents.forEach((k) => {
        if (!cur[k]) {
          cur[k] = {}
        }
        cur = cur[k]
      })
      cur[name] = instance
    }
  })
  !Vue.prototype.$api && (Vue.prototype.$api = apiModules)
  !store.$api && (store.$api = apiModules)
  !Vue.prototype.$auth &&
    Object.defineProperties(Vue.prototype, {
      $auth: {
        get() {
          return checkPermission
        }
      }
    })
}

export default plugin
