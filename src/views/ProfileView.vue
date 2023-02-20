<template>

  <div class="row justify-content-center my-4">

    <div class="col-3" style="align-content: center">


      <UserContactInput :user-profile="userProfile"/>
      <PasswordChangeInput/>

      <div>
        <button v-on:click="navigateBack" type="button" class="btn btn-back">Tühista</button>
      </div>
    </div>
  </div>

</template>

<script>
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";
import ImageInput from "@/components/ImageInput.vue";
import AlertDanger from "@/components/alerts/AlertDanger.vue";
import PasswordChangeInput from "@/components/profile/PasswordChangeInput.vue";
import UserContactInput from "@/components/profile/UserContactInput.vue";
import ProfilePicture from "@/components/profile/ProfilePicture.vue";

export default {
  name: "ProfileView",
  components: {ProfilePicture, UserContactInput, PasswordChangeInput, AlertDanger, ImageInput, AlertSuccess},
  data: function () {
    return {
      messageSuccess: '',
      messageDanger: '',
      userPasswordDto:
          {
            password: ''
          },
      passwordCheck: '',
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

    navigateBack: function () {
      this.$router.push({name: 'apiaryRoute'})
    },


  }
}
</script>

