<template>
  <div class="col-6">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Taru nimi</th>
        <th scope="col">Viimati külastatud</th>
        <th scope="col">Ülesanded</th>
        <th scope="col">Mesila</th>
        <th scope="col">Tehtud</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="visit in visits">
        <td> {{visit.hiveName}}</td>
        <td>{{visit.lastVisitDate}}</td>
        <td>
          <div v-for="toDoTask in visit.toDoTasks">
            {{toDoTask.taskName}}
          </div>
        </td>
        <td>{{visit.apiaryName}}</td>
        <th>
          <font-awesome-icon icon="fa-solid fa-check"/>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TasksToDoTable',
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      apiaryId: 0,
      visits: [
        {
          visitId: 0,
          hiveId: 0,
          apiaryName: '',
          hiveName: '',
          lastVisitDate: '',
          toDoTasks: [
            {
              taskName: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    getVisitTasks: function (apiaryId) {
      this.$http.get("/tasks", {
            params: {
              userId: this.userId,
              apiaryId: apiaryId
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
    this.getVisitTasks(0)
  }
}
</script>
