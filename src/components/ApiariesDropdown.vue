<template>
  <div>
  <div class="row">

    <div class="col-10">
      <select v-model="selectedApiaryId" v-on:change="emitSelectedApiaryId" :disabled="isView" class="form-select">
        <option value="0">Mesilad</option>
        <option v-for="apiary in userApiaries" :value="apiary.apiaryId">{{ apiary.apiaryName }}</option>

      </select>
    </div>
    <div class="col-1 my-2">
      <font-awesome-icon v-on:click="showAddApiaryInput" v-if="!isEdit" icon="fa-regular fa-square-plus" class="icon-hover"/>

    </div>
  </div>

  <div class="row my-3">
    <AddApiary @emitHideInputBoxEvent="hideAddApiaryInput" v-if="isAdd"/>
  </div>

  </div>
</template>
<script>

import AddApiary from "@/components/AddApiary.vue";

export default {
  name: 'ApiariesDropdown',
  components: {AddApiary},
  props: {
    isView: Boolean,
    isEdit: Boolean
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
      selectedApiaryId: 0,
      isAdd: false,

      apiaryRequest: {
        userId: sessionStorage.getItem('userId'),
        apiaryName: '',
        latitude: '',
        longitude: '',
        hiveId: 0
      },
    }
  },

  methods: {

    showAddApiaryInput: function () {
      this.isAdd = true
    },

    hideAddApiaryInput: function () {
      this.isAdd = false
    },


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
      this.$emit('emitSelectedApiaryIdEvent', this.selectedApiaryId)
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