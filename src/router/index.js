import VueRouter from 'vue-router'
import login from '@/views/login'
import Vue from 'vue'

Vue.use(VueRouter)
const routes = [
  {
    name: 'login',
    path: '/',
    component: login
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
