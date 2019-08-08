// ./src/components/auth/Register.vue
<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent='register'>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="name">Name:</label>
        <div class="col-sm-5">
          <input id='name' class='form-control' type='text' v-model='name' placeholder="test" required autofocus>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for='email'>email:</label>
        <div class="col-sm-5">
          <input id='email' class='form-control' type='email' placeholder="test@gmail.com" v-model='email' required>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for='password'>password:</label>
        <div class="col-sm-5">
          <input id='password' class='form-control' type='password' placeholder="test" v-model='password' required>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for='password-confirm'>Confirm Password:</label>
        <div class="col-sm-5">
          <input id='password-confirm' class='form-control' type='password' placeholder="test" v-model='password_confirmation' required>
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="admin" v-model='is_admin'>
          <label class="form-check-label col-sm-offset-2" for="admin">
            Is this an administrator account?
          </label>
        </div>
      </div>
      <div class="form-group row">
        <label class="form-check-label col-sm-2" for="recaptcha">
        </label>
        <div class="col-sm-5 col-sm-offset-2 g-recaptcha" data-sitekey="6LfE8rEUAAAAABgavSMTMqa-Humu-i3CPMHmxSbO"></div>
      </div>
      <div class="form-group row">
        <div class="col-sm-5">
          <button type='submit' class='btn btn-primary'>Register</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_admin: null
    }
  },
  methods: {
    register: function (e) {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      }
      if (this.password === this.password_confirmation && this.password.length > 0) {
        this.$store.dispatch('register', data)
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)
            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              } else {
                this.$router.push('/')
              }
            }
          }).catch(err => console.log(err))
      } else {
        this.password = ''
        this.passwordConfirm = ''
        return alert('Passwords do not match')
      }
    }
  }
}
</script>
