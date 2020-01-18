import Vue from 'vue'
import App from './App.vue'
Vue.config.devtools = true

import store from './store'

Vue.config.productionTip = true
Vue.config.devtools = true

new Vue({
  data:{
    dupa:{}
  },
  store,
  mounted(){
    this.$store.dispatch('init');
    // Vue.set(this.dupa, 'siemano',2);
  },
  render: function (h) { return h(App) }
}).$mount('#app')
