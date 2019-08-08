// ./src/App.vue
<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">{{ brand }} </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class='nav-link'>Home <span class="sr-only">(Current)</span></router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </a>
            <div v-if="isLoggedIn" class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link :to="{ name: 'dashboard', params: { id: getUserId } }" class="dropdown-item">Dashboard</router-link>
              <router-link :to="{ name: 'add', params: { id: getUserId } }" class="dropdown-item">Add</router-link>
              <!-- <router-link :to="{ name: 'del', params: { id: getUserId } }" class="dropdown-item">Del</router-link> -->
              <div class="dropdown-divider"></div>
              <a @click="logout" class="dropdown-item">Logout</a>
            </div>
            <div v-else class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/login"  class="dropdown-item">Login</router-link>
              <router-link to="/register" class="dropdown-item">Register</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link ">About</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="s">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click.stop.prevent="search">Search</button>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  data () {
    return {
      brand: 'CQGS',
      s: ''
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    getUserId: function () {
      return this.$store.getters.authUserId
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    },
    search: function (e) {
      this.$router.push({ name: 'search', params: { query: this.s } })
    }
  },
  created: function () {
    this.$http.interceptors.response.use(
      undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(this.logout)
          }
          throw err
        })
      })
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
