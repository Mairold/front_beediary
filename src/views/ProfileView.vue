<template>

  <div class="row justify-content-center">

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
import AlertSuccess from "@/components/AlertSuccess.vue";
import ImageInput from "@/components/ImageInput.vue";
import AlertDanger from "@/components/AlertDanger.vue";
import PasswordChangeInput from "@/components/PasswordChangeInput.vue";
import UserContactInput from "@/components/UserContactInput.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";

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

