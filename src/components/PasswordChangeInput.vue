<template>
  <div>
    <AlertSuccess :message="messageSuccess"/>
    <AlertDanger :message="messageDanger"/>
    <div class="input-group mb-3">
      <input v-model="userPasswordDto.password" type="password" class="form-control" placeholder="Parool">
    </div>
    <div class="input-group mb-3">
      <input v-model="passwordCheck" type="password" class="form-control" placeholder="Parool uuesti">
    </div>
    <div>
      <button v-on:click="changePassword" type="button" class="btn btn-warning">Muuda parooli</button>
    </div>
  </div>
</template>
<script>
import AlertSuccess from "@/components/AlertSuccess.vue";
import AlertDanger from "@/components/AlertDanger.vue";

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



    changePassword: function () {
      if (this.userPasswordDto.password === this.passwordCheck) {
        this.sendPatchRequest();
      } else {
        this.messageDanger = "Bzzz! Paroolid ei ühti"
        this.$parent.timeoutAndReloadPage(2000)
      }
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