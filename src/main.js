import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import snackBar from './store/snackBar'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  snackBar,
  render: (h) => h(App),
}).$mount('#app')
