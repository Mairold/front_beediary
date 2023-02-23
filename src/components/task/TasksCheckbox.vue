<template>
  <div>
  <h6 class="my-3" style="font-weight: bold" >Tehtud tegevused</h6>
  <div v-for="task in visit.tasks" class="form-check">
    <input v-model="task.done" class="form-check-input" type="checkbox">
    <label class="form-check-label">
      {{ task.taskName }}
    </label>
  </div>
  <h6 class="my-3" style="font-weight: bold">Ülesanded</h6>
  <div v-for="task in visit.tasks" class="form-check">
    <input v-model="task.toDo" class="form-check-input" type="checkbox">
    <label class="form-check-label">
      {{ task.taskName }}
    </label>
  </div>
  </div>
</template>
<script>
export default {
  name: 'TasksCheckbox',
  props: {
    visit: {}
  },
  methods: {
    getTaskNames: function () {
      this.$http.get("/visit/tasks")
          .then(response => {
            this.visit.tasks = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

  },
  beforeMount() {
    this.getTaskNames()
  }
}

</script>