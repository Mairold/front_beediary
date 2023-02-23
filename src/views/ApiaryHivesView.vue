<template>
  <div>
    <div class="row" style="padding-left: 125px">
      <ApiariesDropdown class="col-2 my-4" @emitSelectedApiaryIdEvent="setSelectedApiaryId"/>
        <HivesTable style="align-content: center" class="col-6 my-4" ref="hives"/>
        <div>
          <button v-on:click="navigateToAddHiveView" type="button" class="btn btn-warning">Lisa uus taru</button>
        </div>
    </div>

  </div>
</template>
<script>
import ApiariesDropdown from "@/components/apiaries/ApiariesDropdown.vue";
import HivesTable from "@/components/hives/HivesTable.vue";

export default {
  name: "ApiaryHivesView",
  components: {HivesTable, ApiariesDropdown},
  params: {
    isAdd: Boolean
  },
  methods: {
    setSelectedApiaryId: function (apiaryId) {
      this.$refs.hives.getAllUserHives(apiaryId)
    },
    navigateToAddHiveView: function () {
      this.$router.push({name: 'hiveRoute', query: {isAdd: 'true'}})
    }
  }
}
</script>
