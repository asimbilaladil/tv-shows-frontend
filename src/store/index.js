import Vue from 'vue'
import Vuex from 'vuex'

import post_store from './modules/show_store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post_store
  }
})
