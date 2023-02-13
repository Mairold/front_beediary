<template>

  <div>

    <div class="row justify-content-center">
      <AlertDanger :message="messageError"/>
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

export default {
  name: "NewUserView",
  components: {AlertDanger},
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
          this.sendLoginRequest()
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.messageError = "Bzzz! Paroolid ei ühti"
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

