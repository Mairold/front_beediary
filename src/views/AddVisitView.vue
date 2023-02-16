<template>
  <div>
    <!--    ROW 1-->
    <div class="row justify-content-center">

      <!--      COL 1 -->
      <div class="col-2"></div>

      <!--      COL 2 -->
      <div class="col-2">
        <label>Külastuse kuupäev</label>
        <input v-model="visit.date" class="form-control" type="date"/>
        <br>

        <h6>Tehtud tegevused</h6>
        <div v-for="task in visit.tasks" class="form-check">
          <input v-model="task.done" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            {{ task.taskName }}
          </label>
        </div>

        <br>
        <h6>Ülesanded</h6>
        <div v-for="task in visit.tasks" class="form-check">
          <input v-model="task.toDo" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            {{ task.taskName }}
          </label>
        </div>
        <br>
        <div>
          <button v-on:click="postVisit" type="button" class="btn btn-warning">Lisa külastus</button>
        </div>

        <br>
        <div>
          <button v-on:click="navigateBack" type="button" class="btn btn-warning">Tühista</button>
        </div>

      </div>
      <!--      COL 3-->
      <div class="col-5">
        <br>
        <div class="col-6 form-floating">
          <textarea v-model="visit.notes" class="form-control" id="floatingTextarea2" style="height: 100px"></textarea>
          <label for="floatingTextarea2">Märkused</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HiveNotesInputBox from "@/components/HiveNotesInputBox.vue";

export default {
  name: "AddVisitView",
  components: {HiveNotesInputBox},
  data: function () {
    return {

      visit:
          {
            date: '',
            notes: '',
            hiveId: Number(this.$route.query.hiveId),
            tasks: [
              {
                taskId: 0,
                taskName: '',
                done: false,
                toDo: false,
              }
            ]
          },

    }
  },
  methods: {
    navigateBack: function () {
      this.$router.push({name: 'hiveRoute', query: {hiveId: this.hiveId}})
    },

    getTaskNames: function () {
      this.$http.get("/visit/tasks")
          .then(response => {
            this.visit.tasks = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    postVisit: function () {
      this.$http.post("/hive/visits", this.visit
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },


  },

  beforeMount() {
    this.getTaskNames()
  }
}
</script>

