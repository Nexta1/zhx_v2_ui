import { dashboardName } from '@/config/setting'

// 前端未找到页面路由（固定不用改）
export const NotFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

export const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' }
  },

  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: dashboardName, icon: 'dashboard', affix: true }
      }
    ]
  }

  // {
  //   path: '/account',
  //   component: Layout,
  //   redirect: '/account/settings',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'settings',
  //       name: 'Settings',
  //       component: () => import('@/views/account/settings'),
  //       meta: { title: '个人设置' }
  //     },
  //     {
  //       path: 'about',
  //       name: 'about',
  //       component: () => import('@/views/account/about'),
  //       meta: { title: '关于' }
  //     }
  //   ]
  // }
]
