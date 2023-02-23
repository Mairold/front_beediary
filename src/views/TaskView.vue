<template>
  <div>
    <div class="row" style="padding-left: 125px">
      <ApiariesDropdown class="col-2 my-4" @emitSelectedApiaryIdEvent="setSelectedApiaryId"/>
      <TasksToDoTable style="align-content: center" class="col-6 my-4" ref="tasks"/>
    </div>
  </div>
</template>
<script>
import ApiariesDropdown from "@/components/apiaries/ApiariesDropdown.vue";
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

