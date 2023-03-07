<template>
  <div id="login">
    <div v-if="!isLoading">
      <br>
      <h3>Logi sisse</h3>
      <div class="row justify-content-center mt-4">
        <div class="col-3">
          <AlertDanger :message="messageError"/>
        </div>
      </div>
      <div class="row justify-content-center mt-1">
        <div class="col-3">
          <input v-model="email" type="email" class="form-control" placeholder="E-mail">
        </div>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-3">
          <input v-model="password" type="password" class="form-control" placeholder="Parool">
        </div>
      </div>
      <div class="row justify-content-center my-3">
        <div class="col-3">
          <button v-on:click="sendLoginRequest" type="button" class="btn btn-warning">Logi sisse</button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-3">
          <router-link :to="{name: 'newUserRoute'}">Registreeri kasutajaks</router-link>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-3">
          <router-link :to="{name: 'forgotPasswordRoute'}">Unustasid parooli?</router-link>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <img height="430" src="../assets/buzzbee.gif">
    </div>
  </div>
</template>

<script>
import AlertDanger from '@/components/alerts/AlertDanger.vue'

export default {
  name: 'LoginView',
  components: {AlertDanger},
  data: function () {
    return {
      isLoading: false,
      messageError: '',
      loginResponse: {
        userId: 0
      },
      email: '',
      password: ''
    }
  },
  methods: {
    loadingScreen: function () {
      setTimeout(() => {
        this.$emit('emitLoginSuccessEvent')
        this.$router.push({name: 'apiaryHivesRoute'})
      }, 4000)
    },

    sendLoginRequest: function () {
      this.$http.get('/login', {
        params: {
          email: this.email,
          password: this.password
        }
      }).then(response => {
        this.isLoading = true
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        this.loadingScreen()
      }).catch(error => {
        this.messageError = 'Vale kasutajanimi või parool!'
        this.$parent.timeoutAndReloadPage(2500)
      })
    },
  }
}
</script>

<style>
#login {
  background-position: bottom;
  background-repeat: no-repeat;
  background-image: url("~@/assets/flower_background.png");
  min-height: 100vh;
  background-size: contain;
}
</style>

