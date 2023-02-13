<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-3">
        <ApiariesDropdown @emitSelectedApiaryIdEvent="setSelectedApiaryId"/>
      </div>
      <HivesTable ref="hives"/>
    </div>
    <div>
      <button v-on:click="navigateToHiveView" type="button" class="btn btn-warning">Lisa uus taru</button>
    </div>
  </div>
</template>

<script>
import ApiariesDropdown from "@/components/ApiariesDropdown.vue";
import HivesTable from "@/components/HivesTable.vue";

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
    },
    navigateToHiveView: function () {
      this.$router.push({name:'hiveRoute'})
    }
  }
}
</script>
