<template>
  <div class="col-6">
    <table class="table bg-warning bg-opacity-25">
      <thead>
      <tr>
        <th scope="col">Taru nimi</th>
        <th scope="col">Viimati külastatud</th>
        <th scope="col">Ülesanded</th>
        <th scope="col">Mesila</th>
        <th scope="col">Tehtud</th>
      </tr>
      </thead>
      <tbody v-for="visit in visits">
      <tr v-for="toDoTask in visit.toDoTasks">

        <td> {{ visit.hiveName }}</td>
        <td>{{ visit.lastVisitDate }}</td>
        <td>
          {{ toDoTask.taskName }}
        </td>
        <td>{{ visit.apiaryName }}</td>
        <th>
          <font-awesome-icon v-on:click="deleteToDoTask(visit.visitId, toDoTask.taskId)" class="icon-hover"
                             icon="fa-solid fa-check"/>
        </th>
      </tr>

      </tbody>
    </table>
  </div>
</template>
<script>
import VueSimpleAlert from "vue-simple-alert";

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
              taskId: 0,
              taskName: ''
            }
          ]
        }
      ]
    }
  },
  methods: {

    sortByDates: function () {
      return this.visits.sort((a, b) => {

        return new Date(b.lastVisitDate) - new Date(a.lastVisitDate)
      });
      return this.visits;
    },

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
    deleteToDoTask: function (visitId, taskId) {
      VueSimpleAlert.confirm("Kinnita, et tegevus on tehtud?","", "question").then(() => {
        this.$http.delete("/tasks", {
              params: {
                visitId: visitId,
                taskId: taskId
              }
            }
        ).then(response => {
          this.getVisitTasks(0)
        }).catch(error => {
          console.log(error)
        })
      })
    }
  },
  beforeMount() {
    this.getVisitTasks(0)
  }
}
</script>
