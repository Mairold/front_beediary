<template>
  <div>
    <AlertSuccess :message="messageSuccess"/>
    <ProfilePicture :user-profile="userProfile"/>
    <ImageInput class="my-3" @emitBase64Event="setUserProfilePicture"/>

      <br/>
      <input v-model="userProfile.firstName" id="firstName" class="form-control" placeholder="Eesnimi">
      <br/>
      <input v-model="userProfile.lastName" class="form-control" placeholder="Perekonnanimi">
      <br/>
      <input v-model="userProfile.mobile" class="form-control" placeholder="Mob nr">
    <label>Sünnikuupäev</label>
    <input v-model="userProfile.dateOfBirth" id="startDate" class="form-control" type="date"/><br/>
    <div>
      <button v-on:click="updateUserProfile" type="button" class="btn btn-warning">Salvesta</button>
    </div>

  </div>
</template>
<script>
import ImageInput from "@/components/ImageInput.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";

export default {
  name: 'UserContactInput',
  components: {AlertSuccess, ProfilePicture, ImageInput},
  data: function () {
    return {
      messageSuccess: '',
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


    updateUserProfile: function () {
      this.$http.put("/profile", this.userProfile, {
            params: {
              userId: sessionStorage.getItem("userId")
            }
          }
      ).then(response => {
        this.messageSuccess = "Andmed edukalt uuendatud"
        setTimeout(() => {
          this.$router.go(0)
        }, 2000)
      }).catch(error => {
        console.log(error)
      })
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