import mitt from 'mitt'

const install = (Vue) => {
  Vue.prototype.$eventBus = mitt()
}

export default install
