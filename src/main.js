import Vue from 'vue'
import App from '@/layout/App.vue'
import router from './router'
import store from './store/index'

var infiniteScroll = require('vue-infinite-scroll')
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
