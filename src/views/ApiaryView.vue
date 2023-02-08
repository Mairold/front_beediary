<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-2">
        <ApiariesDropdown @emitSelectedApiaryIdEvent="setSelectedApiaryId"/>
      </div>
      <HivesTable ref="hives"/>
    </div>
  </div>
</template>

<script>
import ApiariesDropdown from "@/views/ApiariesDropdown.vue";
import HivesTable from "@/views/HivesTable.vue";

export default {
  name: "ApiaryView",
  components: {HivesTable, ApiariesDropdown},
  data: function () {
    return {
    }
  },
  methods: {
    setSelectedApiaryId: function (apiaryId) {
      this.$refs.hives.getAllUserHives(apiaryId)
    }
  }
}
</script>
