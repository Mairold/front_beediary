<template>
  <div>
    <div class="input-group mb-3">
      <input v-model="hiveName" :disabled="isView" type="text" class="form-control" placeholder="Taru nimi">
    </div>
  </div>
</template>
<script>
export default {
  name: 'HiveNameInput',
  props: {
    isView: Boolean
  },
  data: function () {
    return {
      hiveName: ''
    }
  },
  methods: {
    emitHiveName: function () {
      this.$emit('emitHiveNameEvent', this.hiveName)
    },
    setHiveName: function (hiveName) {
      this.hiveName = hiveName
    }
  }
}
</script>