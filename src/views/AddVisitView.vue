<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-5"></div>
      <div class="col-2">
        <AlertSuccess :message="messageSuccess"/>
      </div>
      <div class="col-5"></div>
    </div>
    <!--    ROW 1-->
    <div class="row justify-content-center">
      <!--      COL 1 -->
      <div class="col-2"></div>
      <!--      COL 2 -->
      <div class="col-2">

        <label>Külastuse kuupäev</label>
        <input v-model="visit.date" class="form-control" type="date"/>
        <br>

        <TasksCheckbox :visit="visit"/>

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
import AlertSuccess from "@/components/AlertSuccess.vue";
import router from "@/router";
import TasksCheckbox from "@/views/TasksCheckbox.vue";

export default {
  name: "AddVisitView",
  components: {TasksCheckbox, AlertSuccess},
  data: function () {
    return {
      messageSuccess: '',
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
  }
}

</script>


