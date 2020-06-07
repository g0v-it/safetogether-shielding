import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { isAuthenticated } from "@/util/auth.ts";

const ifAuthenticated = (to: Route, from: Route, next: Function) => {
  if (isAuthenticated()) {
    next()
    return
  }
  next('/login')
}

const ifNotAuthenticated = (to: Route, from: Route, next: Function) => {
  if (!isAuthenticated()) {
    next()
    return
  }
  next('/')
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/issue',
    name: 'issue',
    component: () => import('../views/Issue.vue'),
    props: (route) => ({
      name: route.query.name,
      surname: route.query.surname,
      birthdate: route.query.birthdate,
      birthplace: route.query.birthplace,
      location: route.query.location,
      department: route.query.department
    }),
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
