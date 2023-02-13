<template>
  <div class="row justify-content-center">

    <div class="col">
      <ImageInput v-if="!isView" ref="imageInput" @emitBase64Event="setHiveRequestPicture"/>
      <img v-if="hiveRequest.hivePicture == null" src="../assets/beehive.png">
      <img :src="hiveRequest.hivePicture" class="img-thumbnail">
    </div>

    <div class="col">
      <HiveNameInput ref="hiveNameInput" :is-view="isView" @emitHiveNameEvent="setHiveRequestHiveName"/>
      <HiveNotesInputBox ref="hiveNotesInputBox" :is-view="isView" @emitHiveNoteEvent="setHiveRequestHiveNote"/>
      <div>
        <button v-if="!isView" v-on:click="addHive" type="button" class="btn btn-warning">Salvesta</button>
        <button v-if="!isView" v-on:click="updateHive" type="button" class="btn btn-warning">Salvesta muutus</button>
        <button v-if="!isView" v-on:click="navigateToApiaryView" type="button" class="btn btn-warning">Tühista</button>
        <button v-if="isView" v-on:click="navigateToHiveView" type="button" class="btn btn-warning">Muuda</button>
      </div>
    </div>

    <div class="col">
      <div>
      </div>
      <HiveSizeDropdown ref="hiveSizeDropdown" :is-view="isView" @emitSelectedTypeIdEvent="setHiveRequestTypeId"/>
      <ApiariesDropdown ref="apiariesDropdown" :is-view="isView" @emitSelectedApiaryIdEvent="setHiveRequestApiaryId"/>
      <div>
        <button v-if="!isView" v-on:click="navigateToAddApiaryView" type="button" class="btn btn-warning">Lisa uus
        </button>
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
      isView: Boolean(this.$route.query.isView),

      hiveId: this.$route.query.hiveId,
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
    getHive: function () {
      this.$http.get("/apiary/hive", {
            params: {
              hiveId: this.hiveId
            }
          }
      ).then(response => {
        this.hiveRequest = response.data

        this.$refs.hiveNameInput.setHiveName(this.hiveRequest.hiveName)
        this.$refs.apiariesDropdown.setSelectedApiaryId(this.hiveRequest.apiaryId)
        this.$refs.hiveSizeDropdown.setSelectedTypeId(this.hiveRequest.typeId)
        this.$refs.hiveNotesInputBox.setHiveNote(this.hiveRequest.hiveNote)
      }).catch(error => {
        console.log(error)
      })
    },
    putHive: function () {
      this.$http.put("/apiary/hive", this.hiveRequest, {
            params: {
              hiveId: this.hiveId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    updateHive: function () {
      this.callAllHiveRequestEmits();
      this.putHive();
    },
    navigateToApiaryView: function () {
      this.$router.push({name: 'apiaryRoute'})
    },
    navigateToAddApiaryView: function () {
      this.$router.push({name: 'addApiaryRoute'})
    },
    callAllHiveRequestEmits: function () {
      this.$refs.hiveNameInput.emitHiveName()
      this.$refs.hiveNotesInputBox.emitHiveNote()
    },
    addHive: function () {
      this.callAllHiveRequestEmits()
      this.postHive()
    },

    postHive: function () {
      this.$http.post("/apiary/hive", this.hiveRequest
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
    },
    navigateToHiveView: function () {
      this.isView = false
      this.$router.push({name: 'hiveRoute'})
    }
  },
  beforeMount() {
    this.getHive()
  }
}
</script>
