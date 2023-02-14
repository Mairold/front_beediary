<template>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Kuupäev</th>
      <th scope="col">Tegevused</th>
      <th scope="col">Märkused</th>
      <th scope="col">Ülesanded</th>
      <th></th>

    </tr>
    </thead>
    <tbody>
    <tr v-for="visit in visits">
      <td>{{ visit.visitDate }}</td>
      <td v-for="doneTask in visit.doneTasks">{{doneTask.taskName}}</td>
      <td>{{ visit.visitNotes }}</td>
      <td v-for="toDotask in visit.toDoTasks">{{toDotask.taskName}}</td>
      <th><font-awesome-icon icon="fa-solid fa-trash-can"/></th>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'VisitTable',
  data: function () {
    return {
      visits: [
        {
          visitId: '',
          visitDate: '',
          visitNotes: '',
          status: '',
          doneTasks: [
            {
              taskName: '',
            }
          ],
          toDoTasks: [
            {
              taskName: '',
            }
          ]
        }
      ],
      hiveId: this.$route.query.hiveId
    }
  },
  methods: {
    getAllHiveVisits: function () {
      this.$http.get("/hive/visits", {
            params: {
              hiveId: this.hiveId
            }
          }
      ).then(response => {
        this.visits = response.data
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getAllHiveVisits()
  }
}
</script>