<template>
  <div class="row justify-content-center">
    <div class="mb-3 col-4 my-5">
      <label v-if="isView" class="form-label">E-maili aadress</label>
      <input v-if="isView" v-model="email" type="email" class="form-control" aria-describedby="emailHelp">
      <div v-if="isView" id="emailHelp" class="form-text">Sisesta oma e-maili aadress ning saadame sulle uue parooli.
      </div>
      <div>
        <button v-if="isView" v-on:click="sendNewPassword" type="button" class="btn btn-warning my-3">Saada uus parool
        </button>
      </div>
      <div>
        <button v-if="isView" v-on:click="$router.go(-1)" type="button" class="btn btn-back">Tagasi</button>
      </div>
      <h4 v-if="isSent">Uus parool on sinu emailile saadetud!</h4>
    </div>
  </div>
</template>
<script>
export default {
  name: "ForgotPasswordView",
  data: function () {
    return {
      email: '',
      isView: Boolean,
      isSent: false
    }
  },
  methods: {
    sendNewPassword: function () {
      this.isView = false
      this.isSent = true
      setTimeout(() => {
        this.$router.push({name: 'loginRoute'})
      }, 2500)

    }
  }
}
</script>
