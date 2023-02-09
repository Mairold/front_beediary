<template>
<div>
  <div class="col-2">
    <ApiariesDropdown/>
    <div>
      <button type="button" class="btn btn-warning">Lisa uus</button>
    </div>
  </div>
  <div class="col-3">
    <HiveNotesInputBox/>
  </div>
  <div class="col-2">
    <HiveNameInput/>
    <div>
      <button type="button" class="btn btn-warning">Salvesta</button>
    </div>
    <div>
      <button v-on:click="navigateToApiaryView"  type="button" class="btn btn-warning">Tühista</button>
    </div>
    <HiveSizeDropdown/>
    <div>
      <ImageInput/>
    </div>

  </div>

</div>
</template>

<script>
import ApiariesDropdown from "@/components/ApiariesDropdown.vue";
import HiveNotesInputBox from "@/views/HiveNotesInputBox.vue";
import HiveNameInput from "@/views/HiveNameInput.vue";
import HiveSizeDropdown from "@/views/HiveSizeDropdown.vue";
import ImageInput from "@/views/ImageInput.vue";

export default {
  name: "HiveView",
  components: {ImageInput, HiveSizeDropdown, HiveNameInput, HiveNotesInputBox, ApiariesDropdown},
  methods:{
    navigateToApiaryView: function () {
      this.$router.push({name:'apiaryRoute'})
    }
  }
}

</script>
