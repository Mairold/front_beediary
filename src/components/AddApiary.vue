<template>
  <div>
    <AlertDanger :message="messageDanger"/>
    <AlertSuccess :message="messageSuccess"/>
    <div class="input-group mb-3">
      <input v-model="apiaryRequest.apiaryName" type="text" class="form-control" placeholder="Mesila nimi">
    </div>
    <div class="input-group mb-3">
      <input v-model="apiaryRequest.latitude" type="text" class="form-control" placeholder="Laiuskraad">
    </div>
    <div class="input-group mb-3">
      <input v-model="apiaryRequest.longitude" type="text" class="form-control" placeholder="Pikkuskraad">
    </div>
    <div>
      <button v-on:click="addApiary" type="button" class="btn btn-warning mx-2">Lisa</button>
      <button v-on:click="emitHideInputBox" type="button" class="btn btn-back">Tühista</button>
    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alerts/AlertDanger.vue";
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";

export default {
  name: "AddApiary",
  components: {AlertSuccess, AlertDanger},
  data: function () {
    return {
      isEdit: Boolean,
      hiveId: this.hiveId,
      apiaryRequest: {
        userId: sessionStorage.getItem('userId'),
        apiaryName: '',
        latitude: '',
        longitude: ''
      },
      messageSuccess: '',
      messageDanger: '',
    }
  },
  methods: {
    addApiary: function () {
      this.setApiaryName(this.apiaryRequest.apiaryName)
      this.setLatitude(this.apiaryRequest.latitude)
      this.setLongitude(this.apiaryRequest.longitude)
      if (this.apiaryRequest.apiaryName !== '') {
        this.messageSuccess = "Uus mesila lisatud"
        this.postApiary()
        setTimeout(() => {
          this.$router.go(0)
        }, 2000)
      } else {
        this.messageDanger = "Lisa mesila nimi"
        setTimeout(() => {
          this.messageDanger = ''
        }, 2000)
      }
    },
    setApiaryName: function (apiaryName) {
      this.apiaryRequest.apiaryName = apiaryName
    },
    setLatitude: function (latitude) {
      this.apiaryRequest.latitude = latitude
    },
    setLongitude: function (longitude) {
      this.apiaryRequest.longitude = longitude
    },
    postApiary: function () {
      this.$http.post("/apiary", this.apiaryRequest
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    emitHideInputBox: function () {
      this.$emit('emitHideInputBoxEvent')
    }
  }
}
</script>
