import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/core/use'
import '@/icons'
import '@/router/router-guard' // permission control
import bootstrap from '@/core/bootstrap'
Vue.config.productionTip = false
import '@/styles/index.scss'

new Vue({
  router,
  store,
  created: bootstrap,
  render: (h) => h(App)
}).$mount('#app')
