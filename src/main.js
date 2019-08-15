import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.prototype.$http = Axios
Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  // set the `Authorization` on axios header to our token
  Vue.prototype.$http.defaults.headers.common[ 'Authorization' ] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
