import NProgress from 'nprogress' // progress bar
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '../store'
import router from '.'
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log(getToken())
  if (getToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoutes = store.getters.permissionRoutes

      if (hasRoutes) {
        next()
      } else {
        const { menus } = await store.dispatch('user/getInfo')
        const accessRoutes = await store.dispatch(
          'permission/generateRoutes',
          menus
        )
        router.addRoutes(accessRoutes)
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
