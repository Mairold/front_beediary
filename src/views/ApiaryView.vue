<template>
  <div>
    <div class="row justify-content-center">

      <div class="col-2">

        <select class="form-select">
          <option>Mesilad</option>
          <option v-for="apiary in userApiaries" :value="apiary.apiaryId">{{ apiary.apiaryName }}</option>
        </select>

      </div>
      <div class="col-6">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Taru nimi</th>
            <th scope="col">Viimati külastatud</th>
            <th scope="col">Taru suurus</th>
            <th scope="col">Mesila</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>???</th>
            <td>???</td>
            <td>???</td>
            <td>???</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApiaryView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      userApiaries: [
        {
          apiaryId: 0,
          apiaryName: ''
        }
      ]
    }
  },
  methods: {
    getAllUserApiaries: function () {
      this.$http.get("/apiary", {
        params: {
          userId: this.userId
        }
      })
          .then(result => {
            this.userApiaries = result.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getAllUserApiaries()
  }
}
</script>
