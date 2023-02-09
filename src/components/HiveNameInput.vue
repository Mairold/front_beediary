<template>
  <div class="col-4">
    <div class="input-group mb-3">
      <input v-model="hiveName" type="text" class="form-control" placeholder="Taru nimi">
    </div>
  </div>
</template>
<script>
export default {
  name: 'HiveNameInput',
  data: function () {
    return {
      hiveName:''
    }

  },
  methods:{
    emitHiveName:function () {
      this.$emit('emitHiveNameEvent', this.hiveName)
    }
  }
}
</script>