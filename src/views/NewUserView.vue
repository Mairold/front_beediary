<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-3 my-5">
        <h3>Registreeri kasutajaks</h3>
        <AlertDanger :message="messageError"/>
        <AlertSuccess :message="messageSuccess"/>
        <div class="input-group mb-3 my-4">
          <input v-model="user.email" type="email" class="form-control" placeholder="E-mail">
        </div>
        <div class="input-group mb-3">
          <input v-model="user.password" type="password" class="form-control" placeholder="Parool">
        </div>
        <div class="input-group mb-3">
          <input v-model="passwordCheck" type="password" class="form-control" placeholder="Parool uuesti">
        </div>
        <button v-on:click="checkAllRequiredFields" type="button" class="btn btn-warning">Loo kasutaja</button>
        <div>
          <button v-on:click="navigateBack" type="button" class="btn btn-back my-2">Tühista</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alerts/AlertDanger.vue";
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";

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
      messageSuccess: '',
    }
  },
  methods: {
    checkAllRequiredFields: function () {
      if (this.user.email === '' || this.user.password === '' || this.passwordCheck === '') {
        this.messageError = "Palun täida kõik väljad!"
        setTimeout(() => {
          this.messageReset()
        }, 2000)
      } else {
        this.createNewUser()
      }
    },
    createNewUser: function () {
      if (this.user.password === this.passwordCheck) {
        this.$http.post("/profile/newuser", this.user, {
              params: {
                email: this.user.email,
                password: this.user.password
              }
            }
        ).then(response => {
          this.messageSuccess = "Uus kasutaja registreeritud!"
          setTimeout(() => {
            this.sendLoginRequest()
          }, 2000)
        }).catch(error => {
          this.messageError = "Kasutaja juba eksisteerib"
          setTimeout(() => {
            this.messageError = ''
          }, 2000)
        })
      } else {
        this.messageError = "Bzzz! Paroolid ei ühti"
        setTimeout(() => {
          this.messageError = ''
        }, 2000)
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
        this.$router.push({name: 'apiaryHivesRoute'})
      }).catch(error => {
        console.log(error)
      })
    },
    navigateBack: function () {
      this.$router.push({name: 'homeRoute'})
    },
    messageReset: function () {
      this.messageError = ''
      this.messageSuccess = ''
    }
  }

}

</script>

