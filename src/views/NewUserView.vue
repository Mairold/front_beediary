<template>

  <div>

    <div class="row justify-content-center">
      <AlertDanger :message="messageError"/>
      <AlertSuccess :message="messageSuccess"/>
      <div class="col-3">

        <br/>
        <h3 style="color:goldenrod">Registreeri kasutajaks</h3>
        <div class="input-group mb-3">
          <input v-model="user.email" type="email" class="form-control" placeholder="E-mail">
        </div>
        <div class="input-group mb-3">
          <input v-model="user.password" type="password" class="form-control" placeholder="Parool">
        </div>
        <div class="input-group mb-3">
          <input v-model="passwordCheck" type="password" class="form-control" placeholder="Parool uuesti">
        </div>
        <button v-on:click="createNewUser" type="button" class="btn btn-outline-primary">Loo kasutaja</button>
        <div>
          <br/>
          <button v-on:click="navigateBack" type="button" class="btn btn-outline-primary">Tühista</button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import AlertDanger from "@/components/AlertDanger.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";

export default {
  name: "NewUserView",
  components: {AlertSuccess, AlertDanger},
  data: function () {
    return {
      user: {
        email: '',
        password: '',
      },
      passwordCheck: '',
      loginResponse: {
        userId: 0
      },
      messageError: '',
      messageSuccess: ''
    }
  },
  methods: {
    navigateBack: function () {
      this.$router.push({name: 'homeRoute'})
    },
    createNewUser: function () {
      if (this.user.password === this.passwordCheck) {
        this.$http.post("/newuser", this.user, {
              params: {
                email: this.user.email,
                password: this.user.password
              }
            }
        ).then(response => {
          this.messageSuccess = "Uus kasutaja registreeritud!"
          setTimeout(() => { this.sendLoginRequest()
          }, 2000)

        }).catch(error => {
          this.messageError = "Kasutaja juba eksisteerib"
          this.$parent.timeoutAndReloadPage(2000)
        })
      } else {
        this.messageError = "Bzzz! Paroolid ei ühti"
        this.$parent.timeoutAndReloadPage(2000)
      }
    },

    sendLoginRequest: function () {
      this.$http.get("/login", {
            params: {
              email: this.user.email,
              password: this.user.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        this.$emit('emitLoginSuccessEvent')
        this.$router.push({name: 'apiaryRoute'})
      }).catch(error => {
        console.log(error)
      })
    }
  }

}

</script>

