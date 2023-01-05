import Vue from 'vue'
import Vuex from 'vuex'
import snackBar from "./snackBar"
import store from "./store"

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced : true,
  modules : {
    snackBar,
    store
  }
})