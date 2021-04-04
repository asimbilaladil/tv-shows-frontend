import Vue from 'vue'
import Router from 'vue-router'
import Shows from './views/shows'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Shows',
      component: Shows
    }
  ]
})
