<template>
  <div>
    <div class="row justify-content-center my-4">

      <AlertDanger style="align-content: center" class="col-3" :message="messageError"/>
      <AlertSuccess style="align-content: center" class="col-3" :message="messageSuccess"/>
    </div>

    <div class="row justify-content-center my-3">
      <div class="col-3" style="align-content: center">
        <img v-if="hiveRequest.hivePicture == null" height="200" width="150" src="../assets/beehive.png">
        <img :src="hiveRequest.hivePicture" class="img-thumbnail">
        <ImageInput class="my-3" v-if="!isView" ref="imageInput" @emitBase64Event="setHiveRequestPicture"/>
      </div>

      <div class="col-3">
        <HiveNameInput ref="hiveNameInput" :is-view="isView" @emitHiveNameEvent="setHiveRequestHiveName"/>
        <HiveNotesInputBox ref="hiveNotesInputBox" :is-view="isView" @emitHiveNoteEvent="setHiveRequestHiveNote"/>
        <div class="my-3">
          <button v-if="isAdd" v-on:click="addHive" type="button" class="btn btn-warning mx-2">Salvesta</button>
          <button v-if="isEdit" v-on:click="updateHive" type="button" class="btn btn-warning mx-2">Salvesta</button>
          <button v-if="isEdit" v-on:click="navigateToViewHive" type="button" class="btn btn-back mx-2">Tühista</button>
          <button v-if="isAdd" v-on:click="navigateBack" type="button" class="btn btn-back mx-2">Tühista</button>
          <button v-if="isView" v-on:click="navigateToEditHiveView" type="button" class="btn btn-warning mx-2">Muuda</button>
        </div>
      </div>

      <div class="col-2">
        <div>
        </div>
        <HiveSizeDropdown style="padding-right: 20px" ref="hiveSizeDropdown" :is-view="isView"
                          @emitSelectedTypeIdEvent="setHiveRequestTypeId"/>

        <div class="row my-3">
          <ApiariesDropdown ref="apiariesDropdown" :is-view="isView" :isEdit="isEdit"
                            @emitSelectedApiaryIdEvent="setHiveRequestApiaryId"/>
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
import ApiariesDropdown from "@/components/apiaries/ApiariesDropdown.vue";
import HiveNotesInputBox from "@/components/hives/HiveNotesInputBox.vue";
import HiveNameInput from "@/components/hives/HiveNameInput.vue";
import HiveSizeDropdown from "@/components/hives/HiveSizeDropdown.vue";
import ImageInput from "@/components/ImageInput.vue";
import AlertDanger from "@/components/alerts/AlertDanger.vue";
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";
import VisitTable from "@/components/VisitTable.vue";
import router from "@/router";

export default {
  name: "HiveView",
  components: {
    AlertSuccess,
    AlertDanger,
    ImageInput,
    HiveSizeDropdown,
    HiveNameInput,
    HiveNotesInputBox,
    ApiariesDropdown,
    VisitTable
  },
  data: function () {
    return {
      isView: Boolean(this.$route.query.isView),
      isEdit: false,
      isAdd: Boolean(this.$route.query.isAdd),
      hiveId: this.$route.query.hiveId,
      messageError: '',
      messageSuccess: '',
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
        setTimeout(() => {
          this.messageReset()
        }, 2000)
        this.navigateToViewHive()

      } else {
        this.messageError = 'Täida kõik kohustuslikud väljad!'
        setTimeout(() => {
          this.messageReset()
        }, 2000)
      }
    },
    navigateBack: function () {
      router.go(-1)
    },

    navigateToViewHive: function () {
      this.isView = true
      this.isEdit = false
      this.$router.push({name: 'hiveRoute', query: {isView: 'true', hiveId: this.hiveId}})
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
        setTimeout(() => {
          this.navigateBack()
        }, 2000)
      } else {
        this.messageError = 'Täida kõik kohustuslikud väljad!'
        setTimeout(() => {
          this.messageReset()
        }, 2000)
      }
    },

    messageReset: function () {
      this.messageError = ''
      this.messageSuccess = ''
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
