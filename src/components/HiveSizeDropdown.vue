<template>
  <div class="col-4">
    <select v-model="selectedTypeId" v-on:change="emitSelectedTypeId" :disabled="isView" class="form-select">
      <option value="0">Taru suurus</option>
      <option v-for="type in types" :value="type.typeId">{{ type.typeSize }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'HiveSizeDropdown',
  props: {
    isView: Boolean
  },
  data: function () {
    return {
      types: [
        {
          typeId: 0,
          typeSize: ''
        }
      ],
      selectedTypeId: 0
    }
  },
  methods: {
    getAllTypes: function () {
      this.$http.get("apiary/hive-types")
          .then(response => {
            this.types = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    emitSelectedTypeId: function () {
      this.$emit('emitSelectedTypeIdEvent', this.selectedTypeId)
    },
    setSelectedTypeId: function (typeId) {
      this.selectedTypeId = typeId
    }
  },
  beforeMount() {
    this.getAllTypes()
  }
}
</script>