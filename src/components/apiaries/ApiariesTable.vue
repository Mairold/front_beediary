<template>
  <div class="row justify-content-center">
    <div class="col-4 my-4" style="align-content: center">
      <table class="table table-striped bg-light bg-opacity-50">
        <thead>
        <tr>
          <th scope="col">Mesila nimi</th>
          <th scope="col">Laiuskraad</th>
          <th scope="col">Pikkuskraad</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="apiary in userApiaries" :key="apiary.apiaryId">
          <td>{{ apiary.apiaryName }}</td>
          <td>{{ apiary.latitude }}</td>
          <td>{{ apiary.longitude }}</td>
          <th>
            <font-awesome-icon v-on:click="emitSelectedApiary(apiary.apiaryId)" class="icon-hover"
                               icon="fa-solid fa-pencil"/>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ApiariesTable',

  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      userApiaries: [
        {
          apiaryId: 0,
          apiaryName: '',
          latitude: 0,
          longitude: 0,
        }
      ],

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

    emitSelectedApiary: function (apiaryId) {
      this.$parent.isEdit = true
      this.selectedApiaryId = apiaryId
      this.$emit('emitSelectedApiaryEvent', apiaryId)
    },


  },


  beforeMount() {
    this.getAllUserApiaries()
  }
}
</script>