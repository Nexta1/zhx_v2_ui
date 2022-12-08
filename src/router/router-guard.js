import NProgress from 'nprogress' // progress bar
import { getToken } from '@/utils/auth'
import store from '../store'
import router from '.'
import { forEach } from 'lodash'
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const routes = store.getters.permissionRoutes
      if (routes.length > 0) {
        next()
      } else {
        const { menus } = await store.dispatch('user/getInfo')
        const accessRoutes = await store.dispatch(
          'permission/generateRoutes',
          menus
        )
        forEach(accessRoutes, (value) => {
          router.addRoute(value)
        })
        next({ ...to, replace: true })
      }
    }
  } else {
    // 解决死循环
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
