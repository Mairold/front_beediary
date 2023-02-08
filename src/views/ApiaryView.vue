<template>
  <div>
    <div class="row justify-content-center">

      <div class="col-2">
        <select class="form-select">
          <option>Mesilad</option>
          <option v-for="apiary in userApiaries" :value="apiary.apiaryId">{{ apiary.apiaryName }}</option>
        </select>
      </div>


      <HiveTable/>
    </div>
  </div>
</template>

<script>
import HiveTable from "@/views/HiveTable.vue";

export default {
  name: "ApiaryView",
  components: {HiveTable},
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      userApiaries: [
        {
          apiaryId: 0,
          apiaryName: ''
        }
      ]
    }
  },
  methods: {
    getAllUserApiaries: function () {
      this.$http.get("/apiary", {
        params: {
          userId: this.userId
        }
      })
          .then(result => {
            this.userApiaries = result.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getAllUserApiaries()
  }
}
</script>
