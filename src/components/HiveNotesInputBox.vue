<template>
  <div class="col-6 form-floating">
    <textarea v-model="hiveNote" class="form-control" id="floatingTextarea2" style="height: 100px"></textarea>
    <label for="floatingTextarea2">Märkused</label>
  </div>
</template>
<script>
export default {
  name: 'HiveNotesInputBox',
  data: function () {
    return {
      hiveNote:''
    }
  },
  methods: {
    emitHiveNote: function () {
      this.$emit('emitHiveNoteEvent', this.hiveNote)
    }
  }
}
</script>