import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
// import Admin from '@components/auth/Admin.vue'
import Secure from '@/components/resources/Dashboard.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.baseURL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Secure,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: Admin,
    //   children: [
    //     {
    //       path: 'add',
    //       name: 'add',
    //       component: Add
    //     },
    //     {
    //       path: 'del',
    //       name: 'del',
    //       component: Del
    //     }
    //   ],
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: About
    }
  ]
})
// check the unauthorized access
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
export default router
