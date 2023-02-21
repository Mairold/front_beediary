<template>
  <div class="col-6">



    <table class="table table-striped bg-light bg-opacity-50" >
      <thead>
      <tr>
        <th scope="col">Taru nimi <font-awesome-icon v-on:click="sortByNames" icon="fa-solid fa-sort-down" class="icon-hover"/> </th>
        <th scope="col">Viimati külastatud <font-awesome-icon v-on:click="sortByDates" icon="fa-solid fa-sort-down" class="icon-hover"/> </th>
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
        <th>
          <font-awesome-icon v-on:click="deleteHive(hive.hiveId)" class="icon-hover" icon="fa-solid fa-trash-can"/>
        </th>
      </tr>
      </tbody>
    </table>

  </div>

</template>

<script>
import VueSimpleAlert from "vue-simple-alert";

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


    sortByDates: function () {
      return this.hives.sort((a, b) => {

        return new Date(b.lastVisitDate) - new Date(a.lastVisitDate)
      });
      return this.hives;
    },

    sortByNames: function () {
      function compare(a, b) {
        if (a.hiveName < b.hiveName)
          return -1;
        if (a.hiveName > b.hiveName)
          return 1;
        return 0;
      }

      return this.hives.sort(compare);
    },


    deleteHive: function (hiveId) {
      VueSimpleAlert.confirm("Kinnita, et soovid taru kustutada?", "", "question",).then(() => {
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
      })
    },

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



  },
  beforeMount() {
    this.getAllUserHives(0)
  }
}
</script>