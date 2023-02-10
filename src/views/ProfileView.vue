<template>

  <div class="row justify-content-center">
    <div class="col-3"></div>
    <div class="col-3">
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
          <input v-model="userProfile.dateOfBirth" id="startDate" class="form-control" type="date"/>

          <br/>

          <div>
            <button type="button" class="btn btn-outline-secondary">Salvesta</button>
          </div>
          <br/>
          <div>
            <button type="button" class="btn btn-outline-secondary">Muuda parooli</button>
          </div>
          <br/>
          <div>
            <button v-on:click="navigateBack" type="button" class="btn btn-outline-secondary">Tühista</button>
          </div>

        </div>
        <div class="col-3">
          <br/>
          <input type="file" accept="image/png,image/jpeg,image/gif">

        </div>


    </div>
<!--    <div class="input-group mb-3">-->
<!--      <input type="file" accept="image/png,image/jpeg,image/gif">-->
<!--    </div>-->
  </div>

</template>

<script>
export default {
  name: "ProfileView",
  data: function () {
    return {
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
    }
  },
  beforeMount() {
    this.getUserProfile()
  }
}
</script>

