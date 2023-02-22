<template>
  <div class="form-floating">
    <textarea v-model="hiveNote" :disabled="isView" class="form-control" id="floatingTextarea2"
              style="height: 100px"></textarea>
    <label for="floatingTextarea2">Märkused</label>
  </div>
</template>
<script>
export default {
  name: 'HiveNotesInputBox',
  props: {
    isView: Boolean
  },
  data: function () {
    return {
      hiveNote: ''
    }
  },
  methods: {
    emitHiveNote: function () {
      this.$emit('emitHiveNoteEvent', this.hiveNote)
    },
    setHiveNote: function (hiveNote) {
      this.hiveNote = hiveNote
    }
  }
}
</script>