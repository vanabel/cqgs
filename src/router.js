import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'
import Home from '@/views/Home.vue'
// import About from '@/views/About.vue'
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
// import Login from '@/components/auth/Login.vue'
const Login = () => import(/* webpackChunkName: "auth" */ './components/auth/Login.vue')
// import Register from '@/components/auth/Register.vue'
const Register = () => import(/* webpackChunkName: "auth" */ './components/auth/Register.vue')
// import Dashboard from '@/components/resources/Dashboard.vue'
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ './components/resources/Dashboard.vue')
// import Admin from '@/components/auth/Admin.vue'
const Admin = () => import(/* webpackChunkName: "admin" */ './components/auth/Admin.vue')
// import Add from '@/components/admin/Add.vue'
const Add = () => import(/* webpackChunkName: "add" */ './components/admin/Add.vue')
// import Edit from '@/components/admin/Edit.vue'
const Edit = () => import(/* webpackChunkName: "add" */ './components/admin/Edit.vue')
// import Search from '@/components/resources/Search.vue'
const Search = () => import(/* webpackChunkName: "search" */ './components/resources/Search.vue')

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
      path: '/:id/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search?q=:query',
      name: 'search',
      component: Search
    },
    {
      path: '/admin',
      // component: Admin,
      component: Admin,
      children: [
        { path: ':id/dashboard',
          component: Dashboard
        },
        {
          path: ':id/add',
          name: 'add',
          component: Add
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: Edit
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
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
