<template>
  <div class="col-6">

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Taru nimi</th>
        <th scope="col">Viimati külastatud</th>
        <th scope="col">Taru suurus</th>
        <th scope="col">Mesila</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hive in hives">
        <td>
          <router-link :to="{name: 'hiveRoute', query:{isView: 'true', hiveId: hive.hiveId}}">
            {{ hive.hiveName }}
          </router-link>
        </td>
        <td>{{ hive.lastVisitDate }}</td>
        <td>{{ hive.typeSize }}</td>
        <td>{{ hive.apiaryName }}</td>
        <th><font-awesome-icon v-on:click="deleteHive(hive.hiveId)" class="icon-hover" icon="fa-solid fa-trash-can"/></th>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'HivesTable',
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      apiaryId: 0,
      hives: [
        {
          hiveId: 0,
          apiaryName: '',
          typeSize: '',
          lastVisitDate: '',
          hiveName: ''
        }
      ],
    }
  },
  methods: {
    getAllUserHives: function (apiaryId) {

      this.$http.get("/apiary/hives", {
            params: {
              userId: this.userId,
              apiaryId: apiaryId
            }
          }
      ).then(response => {
        this.hives = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    deleteHive: function (hiveId) {
      this.$http.delete("/apiary/hive", {
            params: {
              hiveId: hiveId,
            }
          }
      ).then(response => {
        this.getAllUserHives(0)
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getAllUserHives(0)
  }
}
</script>