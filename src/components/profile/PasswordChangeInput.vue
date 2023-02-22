<template>
  <div class="my-4">
    <AlertSuccess :message="messageSuccess"/>
    <AlertDanger :message="messageDanger"/>
    <div class="input-group mb-3">
      <input v-model="userPasswordDto.password" type="password" class="form-control" placeholder="Parool">
    </div>
    <div class="input-group mb-3">
      <input v-model="passwordCheck" type="password" class="form-control" placeholder="Parool uuesti">
    </div>
    <div>
      <button v-on:click="checkAllRequiredFields" type="button" class="btn btn-warning">Muuda parooli</button>
    </div>
  </div>
</template>
<script>
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";
import AlertDanger from "@/components/alerts/AlertDanger.vue";

export default {
  name: 'PasswordChangeInput',
  components: {AlertDanger, AlertSuccess},
  data: function () {
    return {
      passwordCheck: '',
      userPasswordDto: {
        password: '',
      },
      messageSuccess: '',
      messageDanger: '',
    }
  },
  methods: {
    checkAllRequiredFields: function () {
      if (this.userPasswordDto.password !== '' && this.passwordCheck !== '') {
        this.changePassword();
      } else {
        this.messageDanger = "Täida mõlemad väljad!"
        setTimeout(() => {
          this.messageReset()
        }, 2000)
      }
    },
    changePassword: function () {
      if (this.userPasswordDto.password === this.passwordCheck) {
        this.sendPatchRequest();
      } else {
        this.messageDanger = "Bzzz! Paroolid ei ühti"
        setTimeout(() => {
          this.messageReset()
        }, 2000)
      }
    },
    messageReset: function () {
      this.messageDanger = ''
      this.messageSuccess = ''
    },
    sendPatchRequest: function () {
      this.$http.patch("/profile", this.userPasswordDto, {
            params: {
              userId: sessionStorage.getItem("userId"),
            }
          }
      ).then(response => {
        this.messageSuccess = "Parool edukalt uuendatud"
        setTimeout(() => {
          this.$router.go(0)
        }, 2000)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>