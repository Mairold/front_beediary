<template>
  <div id="hivesTable" class="col-8">
    <SortedTable class="table-striped table-hover" :values="hives" style="">
      <thead>
      <tr>
        <th scope="col">Taru pilt</th>
        <th scope="col" style="text-align: center">
          <SortLink class="text-hover" name="hiveName">Taru nimi</SortLink>
        </th>
        <th scope="col" style="text-align: center">
          <SortLink class="text-hover"  name="lastVisitDate">Viimati külastatud</SortLink>
        </th><th scope="col" style="text-align: center">
          <SortLink class="text-hover" name="typeSize">Taru suurus</SortLink>
        </th>
        <th scope="col">Mesila</th>
      </tr>
      </thead>
      <template #body="sort">
        <tbody>
        <tr v-for="hive in sort.values" :key="hive.hiveId">
          <td><img v-if="hive.hivePicture !== null" height="100" width="100" :src="hive.hivePicture"></td>
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
      </template>
    </SortedTable>

  </div>
</template>

<script>
import VueSimpleAlert from "vue-simple-alert";
import SortLink from "vue-sorted-table/src/components/SortLink.vue";
import SortedTable from "vue-sorted-table/src/components/SortedTable.vue";

export default {
  name: 'HivesTable',
  components: {SortedTable, SortLink},
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
          hiveName: '',
          hivePicture: ''
        }
      ],
    }
  },
  methods: {

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