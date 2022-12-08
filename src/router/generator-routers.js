import Layout from '@/layout'
import BlankLayout from '@/layout/components/BlankLayout'
import { isExternal } from '@/utils/validate'
import { toHump } from '@/utils'
import { constantRouterComponents } from '@/router'
function createRoute(menu, isRoot) {
  if (menu.type === 0) {
    return {
      path: menu.router,
      component: isRoot ? Layout : BlankLayout,
      alwaysShow: true,
      meta: { title: menu.name, icon: menu.icon }
    }
  }
  if (isExternal(menu.router)) {
    return {
      path: `external-link${menu.id}`,
      component: Layout,
      children: [
        {
          path: menu.router,
          meta: { title: menu.name, icon: menu.icon }
        }
      ]
    }
  }
  const component = constantRouterComponents[menu.viewPath]
  if (!component) {
    return undefined
  }
  return isRoot
    ? {
        path: menu.router,
        redirect: `${menu.router}/index`,
        component: Layout,
        children: [
          {
            path: 'index',
            name: toHump(menu.viewPath),
            component,
            meta: {
              title: menu.name,
              icon: menu.icon,
              noCache: !menu.keepalive
            }
          }
        ]
      }
    : {
        path: menu.router,
        name: toHump(menu.viewPath),
        component,
        meta: {
          title: menu.name,
          icon: menu.icon,
          noCache: !menu.keepalive
        }
      }
}
export function filterAsyncRoutes(routes, parentRoute) {
  const res = []
  routes.forEach((route) => {
    if (route.type === 2 || !route.isShow) {
      return
    }
    let realRoute
    // 根菜单(可点击)
    if (!parentRoute && !route.parentId && route.type === 1) {
      realRoute = createRoute(route, true)
    } else if (!parentRoute && !route.parentId && route.type === 0) {
      const childrenRoute = filterAsyncRoutes(routes, route)
      realRoute = createRoute(route, true)
      if (childrenRoute && childrenRoute.length > 0) {
        realRoute.redirect = childrenRoute[0].path
        realRoute.children = childrenRoute
      }
    } else if (
      parentRoute &&
      parentRoute.id === route.parentId &&
      route.type === 1
    ) {
      realRoute = createRoute(route, false)
    } else if (
      parentRoute &&
      parentRoute.id === route.parentId &&
      route.type === 0
    ) {
      const childrenRoute = filterAsyncRoutes(routes, route)
      realRoute = createRoute(route, false)
      if (childrenRoute && childrenRoute.length > 0) {
        realRoute.redirect = childrenRoute[0].path
        realRoute.children = childrenRoute
      }
    }
    if (realRoute) {
      res.push(realRoute)
    }
  })
  return res
}
