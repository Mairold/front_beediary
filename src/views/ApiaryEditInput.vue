<template>
  <div class="col-2" style="align-content: center">
    <div class="input-group mb-3">
      <input v-model="userApiary.apiaryName" type="text" class="form-control" placeholder="Mesila nimi"></div>
      <div class="input-group mb-3">
      <input v-model="userApiary.latitude" type="text" class="form-control" placeholder="Laiuskraad"></div>
    <div class="input-group mb-3">
      <input v-model="userApiary.longitude" type="text" class="form-control" placeholder="Pikkuskraad"></div>
    <div>
      <button type="button" class="btn btn-warning">Salvesta</button>
    </div>
    </div>
</template>
<script>
export default {
  name: 'ApiaryEditInput',
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      userApiary:
        {
          apiaryId: this.$parent.userApiary.apiaryId,
          apiaryName: this.$parent.userApiary.apiaryName,
          latitude: this.latitude,
          longitude: this.longitude,
        }
    }
  }
}
</script>