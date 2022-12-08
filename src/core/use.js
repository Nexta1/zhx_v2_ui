import Vue from 'vue'
import ElementUI from 'element-ui'
import PermissionHelper from '@/core/permission'
import PermissionDirective from '@/core/directives/permission/index'
Vue.use(ElementUI)

Vue.use(PermissionHelper)
Vue.use(PermissionDirective)
