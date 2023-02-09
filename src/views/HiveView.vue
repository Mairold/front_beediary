<template>

  <div class="row justify-content-center">

    <div class="col">
      <ImageInput ref="imageInput" @emitBase64Event="setHiveRequestPicture"/>
    </div>

    <div class="col">
      <HiveNameInput ref="hiveNameInput" @emitHiveNameEvent="setHiveRequestHiveName"/>
      <HiveNotesInputBox ref="hiveNotesInputBox" @emitHiveNoteEvent="setHiveRequestHiveNote" />
      <div>
        <button  v-on:click="addHive"  type="button" class="btn btn-warning">Salvesta</button>
      </div>
      <div>
        <button v-on:click="navigateToApiaryView" type="button" class="btn btn-warning">Tühista</button>
      </div>
    </div>

    <div class="col">
      <HiveSizeDropdown ref="hiveSizeDropdown" @emitSelectedTypeIdEvent="setHiveRequestTypeId"/>
      <ApiariesDropdown ref="apiariesDropdown" @emitSelectedApiaryIdEvent="setHiveRequestApiaryId"/>
      <div>
        <button type="button" class="btn btn-warning">Lisa uus</button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiariesDropdown from "@/components/ApiariesDropdown.vue";
import HiveNotesInputBox from "@/components/HiveNotesInputBox.vue";
import HiveNameInput from "@/components/HiveNameInput.vue";
import HiveSizeDropdown from "@/components/HiveSizeDropdown.vue";
import ImageInput from "@/components/ImageInput.vue";

export default {
  name: "HiveView",
  components: {ImageInput, HiveSizeDropdown, HiveNameInput, HiveNotesInputBox, ApiariesDropdown},
  data: function () {
    return {
      hiveRequest: {
        apiaryId: 0,
        typeId: 0,
        hiveName: "",
        hivePicture: "",
        hiveNote: ""
      }
    }
  },
  methods: {
    navigateToApiaryView: function () {
      this.$router.push({name: 'apiaryRoute'})
    },
    callAllHiveRequests: function () {
     this.$refs.hiveNameInput.emitHiveName()
     this.$refs.hiveNotesInputBox.emitHiveNote()
    },
    addHive: function () {
    this.callAllHiveRequests()
    this.postHive()
    },

    postHive: function () {
      // todo uue hive-i lisamine korda teha ja lõpetada
      this.$http.post("/apiary", this.hiveRequest
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    setHiveRequestPicture: function (pictureBase64Data) {
      this.hiveRequest.hivePicture = pictureBase64Data
    },
    setHiveRequestHiveName: function (hiveName) {
      this.hiveRequest.hiveName = hiveName
    },
    setHiveRequestHiveNote: function (hiveNote) {
      this.hiveRequest.hiveNote = hiveNote
    },
    setHiveRequestApiaryId: function (apiaryId) {
      this.hiveRequest.apiaryId = apiaryId
    },
    setHiveRequestTypeId: function (typeId) {
      this.hiveRequest.typeId = typeId
    }
  }
}
</script>
