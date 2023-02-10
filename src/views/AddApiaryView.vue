<template>
  <div class="row justify-content-center">
    <div class="col-3">
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
        <button v-on:click="addApiary" type="button" class="btn btn-warning">Lisa</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddApiaryView",
  data: function () {
    return {
      apiaryRequest: {
        userId: sessionStorage.getItem('userId'),
        apiaryName:'',
        latitude:'',
        longitude:''
      }
    }
  },
  methods: {
    addApiary: function () {
      this.setApiaryName(this.apiaryRequest.apiaryName)
      this.setLatitude(this.apiaryRequest.latitude)
      this.setLongitude(this.apiaryRequest.longitude)
      this.postApiary()

    },
    postApiary: function () {
      this.$http.post("/apiary", this.apiaryRequest
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    setApiaryName: function (apiaryName) {
      this.apiaryRequest.apiaryName = apiaryName
    },
    setLatitude: function (latitude) {
      this.apiaryRequest.latitude = latitude
    },
    setLongitude: function (longitude) {
      this.apiaryRequest.longitude = longitude
    }
  }
}
</script>
