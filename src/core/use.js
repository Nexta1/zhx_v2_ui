import Vue from 'vue'
import ElementUI from 'element-ui'
import PermissionHelper from '@/core/permission'
import PermissionDirective from '@/core/directives/permission/index'
import EventBus from '@/utils/event-bus'
import animated from 'animate.css'
Vue.use(animated)
Vue.use(ElementUI)

Vue.use(PermissionHelper)
Vue.use(PermissionDirective)

Vue.use(EventBus)
