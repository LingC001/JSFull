import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import router from './router'
import './mock'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
