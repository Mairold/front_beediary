<template>
  <div>
    <div class="row" style="padding-left: 125px">
      <ApiariesDropdown class="col-2 my-4" @emitSelectedApiaryIdEvent="setSelectedApiaryId"/>
    </div>
    <div class="row justify-content-center">

      <TasksToDoTable style="align-content: center" class="col-6" ref="tasks"/>
    </div>

    </div>

</template>

<script>
import ApiariesDropdown from "@/components/ApiariesDropdown.vue";
import TasksToDoTable from "@/components/task/TasksToDoTable.vue";

export default {
  name: "TaskView",
  components: {TasksToDoTable, ApiariesDropdown},
  data: function () {
    return {}
  },
  methods: {


    setSelectedApiaryId: function (apiaryId) {
      this.$refs.tasks.getVisitTasks(apiaryId)
    }
  }
}
</script>

