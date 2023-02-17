<template>
  <div>
    <select v-model="selectedApiaryId" v-on:change="emitSelectedApiaryId" :disabled="isView" class="form-select">
      <option value="0">Mesilad</option>
      <option v-for="apiary in userApiaries" :value="apiary.apiaryId">{{ apiary.apiaryName }}</option>
    </select>
  </div>

</template>
<script>
export default {
  name: 'ApiariesDropdown',
  props:  {
    isView: Boolean
  },
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
    },
    setSelectedApiaryId: function (apiaryId) {
      this.selectedApiaryId = apiaryId

    }
  },
  beforeMount() {
    this.getAllUserApiaries()
  }
}
</script>