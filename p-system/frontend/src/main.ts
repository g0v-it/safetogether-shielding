import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from '@/util/http'
import { getToken } from "@/util/auth";


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
