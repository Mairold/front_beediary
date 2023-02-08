<template>
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
      <tr v-for="hive in hives">
        <td>{{hive.hiveName}}</td>
        <td>???</td>
        <td>{{hive.typeSize}}</td>
        <td>{{hive.apiaryName}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HiveTable',
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      apiaryId: 0,
      hives: [
        {
          hiveId: 0,
          apiaryName: '',
          typeSize: '',
          hiveName: '',
        }
      ]
    }

  },
  methods: {
    getAllUserHives: function () {
      this.$http.get("/apiary/hives", {
            params: {
              userId: this.userId,
              apiaryId: 0
            }
          }
      ).then(response => {
        this.hives = response.data
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getAllUserHives()
  }
}
</script>