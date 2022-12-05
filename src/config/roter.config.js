export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录' }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
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
        component: () => import('@/views/dashboard/index'),
        meta: { title: dashboardName, icon: 'dashboard', affix: true }
      }
    ]
  },

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
