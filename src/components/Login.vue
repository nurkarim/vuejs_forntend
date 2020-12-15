<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-6">
        <div class="card card-default">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form autocomplete="off" @submit.prevent="login" method="post">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email"  class="form-control" id="email"
                       v-model="details.email"
                       placeholder="Enter email"
                       required>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password"  class="form-control" id="password"
                       v-model="details.password"
                       placeholder="Password" required>
              </div>
              <button type="submit" class="btn btn-primary">Signin</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://vuejs_backend/api/'
export default {
  name: 'Login',
  data() {
    return {
      details: {
        email: 'admin@gmail.com',
        password: 'admin',
        success: false,
        has_error: false,
        error: ''
      }
    }
  },
  methods: {
    login() {
      axios.post("login", this.details)
        .then(response => {
          localStorage.setItem("authToken", response.data.data.token)
          this.$router.push({ name: "Home" })
        })
    }
  },
  components: {
  }
}
</script>
