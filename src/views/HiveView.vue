<template>
  <div>
    <div class="row justify-content-center my-4">

      <AlertDanger style="align-content: center" class="col-3" :message="messageError"/>
      <AlertSuccess style="align-content: center" class="col-3" :message="messageSuccess"/>
    </div>

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
          <button v-if="isAdd" v-on:click="addHive" type="button" class="btn btn-warning">Salvesta</button>
          <button v-if="isEdit" v-on:click="updateHive" type="button" class="btn btn-warning">Salvesta</button>
          <button v-if="!isView" v-on:click="navigateBack" type="button" class="btn btn-back">Tühista</button>
          <button v-if="isView" v-on:click="navigateToEditHiveView" type="button" class="btn btn-warning">Muuda</button>
        </div>
      </div>

      <div class="col">
        <div>
        </div>
        <HiveSizeDropdown ref="hiveSizeDropdown" :is-view="isView" @emitSelectedTypeIdEvent="setHiveRequestTypeId"/>
        <div class="row">
          <ApiariesDropdown ref="apiariesDropdown" :is-view="isView" @emitSelectedApiaryIdEvent="setHiveRequestApiaryId"/>
        </div>

        <div>
          <button v-if="!isView" v-on:click="navigateToAddApiaryView" type="button" class="btn btn-warning">Lisa uus</button>

        </div>
      </div>
    </div>
    <div class="row justify-content-center">

      <div class="col-6">
        <VisitTable v-if="isView"/>
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
import AlertDanger from "@/components/AlertDanger.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";
import VisitTable from "@/components/VisitTable.vue";
import router from "@/router";

export default {
  name: "HiveView",
  components: {
    AlertSuccess, AlertDanger, ImageInput, HiveSizeDropdown, HiveNameInput, HiveNotesInputBox, ApiariesDropdown, VisitTable},
  data: function () {
    return {
      isView: Boolean(this.$route.query.isView),
      isEdit: false,
      isAdd: Boolean(this.$route.query.isAdd),
      hiveId: this.$route.query.hiveId,
      messageError:'',
      messageSuccess:'',
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
      if (this.allRequiredFieldsAreFilled()) {
        this.putHive();
        this.messageSuccess = 'Taru andmed muudetud!'
        this.navigateBack()
      } else {
        this.messageError = 'Täida kõik kohustuslikud väljad!'
      }
    },
    navigateBack: function () {
      router.go(-1)
      this.isView = true
      this.isEdit = false
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

      if (this.allRequiredFieldsAreFilled()) {
        this.postHive();
        this.messageSuccess = this.hiveRequest.hiveName + ' lisatud!'
        this.navigateBack()
      } else {
        this.messageError = 'Täida kõik kohustuslikud väljad!'
      }
    },

    postHive: function () {
      this.$http.post("/apiary/hive", this.hiveRequest
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    allRequiredFieldsAreFilled: function () {
      return this.hiveRequest.apiaryId > 0 &&
          this.hiveRequest.typeId > 0 &&
          this.hiveRequest.hiveName !== ''
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
    navigateToEditHiveView: function () {
      this.isEdit = true
      this.isView = false
      this.$router.push({name: 'hiveRoute'})
    }
  },
  beforeMount() {
    this.getHive()
  }
}
</script>
