// ./src/store.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {
      id: '1'
    },
    data: []
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, tokenUser) {
      state.status = 'success'
      state.token = tokenUser.token
      state.user = tokenUser.user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.user = {}
    },
    get_data (state, data) {
      state.data = data
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    authUserId: state => state.user.id
  },
  actions: {
    login: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        // The promise used for router redirect in login
        commit('auth_request')
        axios({
          url: process.env.VUE_APP_baseSURL + '/login',
          data: user,
          method: 'POST'
        }).then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          // Add the following line
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', { token, user })
          resolve(resp)
        }).catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: process.env.VUE_APP_baseSURL + '/register',
          data: user,
          method: 'POST'
        }).then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        }).catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    add: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        // The promise used for router redirect in login
        // commit('auth_request')
        axios({
          url: process.env.VUE_APP_baseSURL + '/add',
          data: data,
          method: 'POST'
        }).then(resp => {
          const token = resp.data.token
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    get: ({ commit }, dates) => {
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_baseSURL + '/get',
          data: dates,
          method: 'POST'
        }).then(resp => {
          // console.log(resp.data, this)
          commit('get_data', resp.data)
          // resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
