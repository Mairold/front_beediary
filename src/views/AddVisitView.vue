<template>
  <div>
    <div class="row justify-content-center my-4">
      <AlertSuccess style="align-content: center" class="col-3" :message="messageSuccess"/>
      <AlertDanger style="align-content: center" class="col-4" :message="messageDanger"/>
    </div>

    <div class="row justify-content-center">
      <div class="col-2" style="align-content: center">
        <label>Külastuse kuupäev</label>
        <input v-model="visit.date" class="form-control" type="date"/>
        <TasksCheckbox class="my-3" :visit="visit"/>
        <div>
          <button v-on:click="addNewVisit" type="button" class="btn btn-warning my-3">Lisa külastus</button>
        </div>
        <div>
          <button v-on:click="navigateBack" type="button" class="btn btn-back">Tühista</button>
        </div>
      </div>


      <div class="col-2 form-floating my-4" style="align-content: center">
        <textarea v-model="visit.notes" class="form-control" id="floatingTextarea2" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Märkused</label>
      </div>
    </div>

  </div>
</template>

<script>
import AlertSuccess from "@/components/AlertSuccess.vue";
import router from "@/router";
import TasksCheckbox from "@/components/TasksCheckbox.vue";
import AlertDanger from "@/components/AlertDanger.vue";

export default {
  name: "AddVisitView",
  components: {AlertDanger, TasksCheckbox, AlertSuccess},
  data: function () {
    return {
      messageSuccess: '',
      messageDanger: '',
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
      router.go(-1)
    },

    addNewVisit: function () {
      if (this.allRequiredFieldsAreFilled(true)) {
        this.postVisit()
      } else {
        this.messageDanger = "Palun lisa kuupäev ja vali tehtud tegevused!"
        setTimeout(() => {
          this.messageDanger = ''
        }, 2000)
      }

    },

    postVisit: function () {
      this.$http.post("/hive/visits", this.visit
      ).then(response => {
        this.messageSuccess = "Uus külastus lisatud!"
        setTimeout(() => {
          this.navigateBack()
        }, 2000)
      }).catch(error => {
        console.log(error)
      })
    },

    allRequiredFieldsAreFilled: function () {
      return this.visit.date !== '' &&
          this.visit.tasks.some(task => task.done)
    },
  }
}

</script>


