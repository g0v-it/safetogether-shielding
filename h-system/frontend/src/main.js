import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { getToken } from "./util/auth.js";


// Init axios defaults
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:8080";
const token = getToken();
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
