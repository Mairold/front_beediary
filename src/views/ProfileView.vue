<template>

  <div class="row justify-content-center">
    <div class="col-3"></div>
    <div class="col-3">

      <AlertSuccess :message="messageSuccess"/>
      <br/>
      <input v-model="userProfile.firstName" id="firstName" class="form-control" placeholder="Eesnimi">
      <br/>
      <input v-model="userProfile.lastName" class="form-control" placeholder="Perekonnanimi">
      <br/>
      <input v-model="userProfile.mobile" class="form-control" placeholder="Mob nr">
    </div>

    <div class="col-3">
      <img v-if="userProfile.picture == null" src="../assets/beekeeper_avatar.png" class="img-thumbnail">
      <img v-else :src="userProfile.picture" class="img-thumbnail">
    </div>
    <div class="row justify-content-center">

      <div class="col-3">


      </div>
      <div class="col-3">
        <label>Sünnikuupäev</label>
        <input v-model="userProfile.dateOfBirth" id="startDate" class="form-control" type="date"/><br/>
        <div>
          <button v-on:click="updateUserProfile" type="button" class="btn btn-outline-secondary">Salvesta</button>
        </div><br/>
        <div>
          <button type="button" class="btn btn-outline-secondary">Muuda parooli</button>
        </div><br/>
        <div>
          <button v-on:click="navigateBack" type="button" class="btn btn-outline-secondary">Tühista</button>
        </div>
      </div>
      <div class="col-3">
        <br/>
        <ImageInput @emitBase64Event="setUserProfilePicture"/>
      </div>
    </div>

  </div>

</template>

<script>
import AlertSuccess from "@/components/AlertSuccess.vue";
import ImageInput from "@/components/ImageInput.vue";

export default {
  name: "ProfileView",
  components: {ImageInput, AlertSuccess},
  data: function () {
    return {
      messageSuccess: '',
      messageDanger: '',
      userProfile:
          {
            userId: sessionStorage.getItem("userId"),
            firstName: '',
            lastName: '',
            mobile: 0,
            dateOfBirth: '',
            picture: '',
          }
    }
  },
  methods: {

    getUserProfile: function () {

      this.$http.get("/profile", {
            params: {
              userId: this.userProfile.userId
            }
          }
      ).then(response => {
        this.userProfile = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    navigateBack: function () {
      this.$router.push({name: 'apiaryRoute'})
    },

    updateUserProfile: function () {
      this.$http.put("/profile", this.userProfile, {
            params: {
              userId: sessionStorage.getItem("userId")
            }
          }
      ).then(response => {
        this.messageSuccess = "Andmed edukalt uuendatud"
        this.timeoutAndReloadPage(2000)
      }).catch(error => {
        console.log(error)
      })
    },

    timeoutAndReloadPage: function (timeOut) {
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut)
    },

    setUserProfilePicture: function (pictureBase64Data) {
      this.userProfile.picture = pictureBase64Data
    }

  },
  beforeMount() {
    this.getUserProfile()
  }
}
</script>

