<template>
  <div class="col-4">
    <select v-model="selectedApiaryId" v-on:change="emitSelectedApiaryId" class="form-select">
      <option value="0">Mesilad</option>
      <option v-for="apiary in userApiaries" :value="apiary.apiaryId">{{ apiary.apiaryName }}</option>
    </select>
  </div>

</template>
<script>
export default {
  name: 'ApiariesDropdown',
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      userApiaries: [
        {
          apiaryId: 0,
          apiaryName: ''
        }
      ],
      selectedApiaryId: 0
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
    emitSelectedApiaryId: function () {
      this.$emit('emitSelectedApiaryIdEvent',this.selectedApiaryId)
    }
  },
  beforeMount() {
    this.getAllUserApiaries()
  }
}
</script>