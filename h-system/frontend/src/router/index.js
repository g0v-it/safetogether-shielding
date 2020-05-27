import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { isAuthenticated } from "@/util/auth.js";

const ifAuthenticated = (to, from, next) => {
  if (isAuthenticated()) {
    next()
    return
  }
  next('/login')
}

const ifNotAuthenticated = (to, from, next) => {
  if (!isAuthenticated()) {
    next()
    return
  }
  next('/')
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../views/Details.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/revoke',
    name: 'revoke',
    component: () => import('../views/Revoke.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated
  }
]

const router = new VueRouter({
  routes
})

export default router
