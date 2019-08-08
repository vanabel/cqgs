// ./src/components/auth/Login.vue
<template>
  <div class="container">
    <h1>Sign in</h1>
    <div class="centered">
      <form class='login' @submit.prevent='login'>
        <div class="form-group row">
          <label for='email' class="col-sm-2 col-form-label col-form-label-sm">Name:</label>
          <div class="col-sm-5">
            <input v-model='email' type='email' palceholder='user@mail.com.cn' class="form-control form-control-sm" id="email" required>
          </div>
        </div>
        <div class="form-group row">
          <label for='password' class="col-sm-2 col-form-label col-form-label-sm">Password:</label>
          <div class="col-sm-5">
            <input type='password' v-model='password' placeholder='Password' id="password" class="form-control form-control-sm" required>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-5 col-sm-offset-2">
            <button type='submit'>Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // remove in production
      email: 'test@gmail.com',
      password: 'test'
    }
  },
  computed: {
    getUserId: function () {
      return this.$store.getters.authUserId
    }
  },
  methods: {
    login: function () {
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push({ name: 'dashboard', params: { id: this.getUserId } }))
        .catch(err => console.log(err))
    }
  }
}
</script>
