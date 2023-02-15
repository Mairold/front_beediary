<template>
  <div>
    <div class="row justify-content-center">
    <div class="col-3">
      <ApiariesDropdown/>
    </div>
    <TasksToDoTable/>
    </div>
  </div>
</template>

<script>
import ApiariesDropdown from "@/components/ApiariesDropdown.vue";
import TasksToDoTable from "@/components/TasksToDoTable.vue";

export default {
  name: "VisitView",
  components: {TasksToDoTable, ApiariesDropdown},
  data: function () {
    return {}
  }
}
</script>

