import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { post, get, patch, put } from './http'
Vue.config.productionTip = false
// 开发环境
Vue.prototype.interfaceURL = '/api/'
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
