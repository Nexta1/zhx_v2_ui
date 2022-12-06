import VueRouter from 'vue-router'
import Vue from 'vue'
import { constantRoutes } from '@/config/router.config'

Vue.use(VueRouter)
// generate components map
export const constantRouterComponents = {}
// auto load
const modulesFiles = require.context('./modules', true, /\.js$/)

modulesFiles.keys().forEach((path) => {
  const value = modulesFiles(path).default
  Object.keys(value).forEach((ele) => {
    constantRouterComponents[ele] = value[ele]
  })
})

const createRouter = () =>
  new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
const router = createRouter()
export default router
