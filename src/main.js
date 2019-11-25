import Vue from 'vue'
import App from './App.vue'
Vue.config.devtools = true

import store from './store'

Vue.config.productionTip = true
Vue.config.devtools = true

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
