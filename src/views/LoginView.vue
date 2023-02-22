<template>
  <div>
      <br/>
      <h3>Logi sisse</h3>
      <br>
      <div class="row justify-content-center">
        <div class="col-3">
          <AlertDanger :message="messageError"/>
          <div>
            <div class="mb-2 row justify-content-center">
              <div class="col-sm-10">
                <input v-model="email" type="email" class="form-control" placeholder="E-mail">
              </div>
            </div>
            <div class="mb-2 row justify-content-center">
              <div class="col-sm-10">
                <input v-model="password" type="password" class="form-control" placeholder="Parool">
              </div>
            </div>
            <br/>
            <button v-on:click="sendLoginRequest" type="button" class="btn btn-warning">Logi sisse</button>
          </div>
          <div>
            <br/>
            <router-link :to="{name: 'newUserRoute'}">Registreeri kasutajaks</router-link>
          </div>
          <router-link :to="{name: 'forgotPasswordRoute'}">Unustasid parooli?</router-link>
        </div>
      </div>
    </div>
</template>
<script>
import AlertDanger from "@/components/alerts/AlertDanger.vue";

export default {
  name: "LoginView",
  components: {AlertDanger},
  data: function () {
    return {
      loading: false,
      messageError: '',
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
        this.$router.push({name: 'apiaryHivesRoute'})
      }).catch(error => {
        this.messageError = "Vale kasutajanimi või parool!"
        this.$parent.timeoutAndReloadPage(2500)
      })
    },
  }
}
</script>
