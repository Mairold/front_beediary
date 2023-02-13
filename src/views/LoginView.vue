<template>
  <div class="row justify-content-center ">
    <div class=" row col-3">
      <div>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">E-mail</label>
          <div class="col-sm-10">
            <input v-model="email" type="email" class="form-control">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">Parool</label>
          <div class="col-sm-10">
            <input v-model="password" type="password" class="form-control">
          </div>
        </div>
        <button v-on:click="sendLoginRequest" type="button" class="btn btn-warning">Logi sisse</button>
      </div>
      <br/>
      <router-link to="/newuser">Registreeri kasutajaks</router-link>
      <br/>
      <router-link to="/">Unustasid parooli?</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: function () {
    return {
      loginResponse: {
        userId: 0
      },
      email: '',
      password: ''
    }
  },
  methods: {
    sendLoginRequest: function () {
      this.$http.get("/login", {
        params: {
          email: this.email,
          password: this.password
        }
      }).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        this.$emit('emitLoginSuccessEvent')
        this.$router.push({name: 'apiaryRoute'})
      })
          .catch(error => {
            console.log(error)
          })
    },
  }
}
</script>
