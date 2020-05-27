import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './util/http.js'
import { getToken } from "./util/auth.js";


// Init axios token
const token = getToken();
console.log(token)
if (token) {
  http.defaults.headers.common['Authorization'] = token;
}



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
