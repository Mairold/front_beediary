<template>
  <div class="home">
    <h2 class="headline">Tere tulemast!</h2>
    <img class="frontPageImg" alt="Bee logo" src="../assets/bee.gif">
    <div>
      <h5 class="my-4">Digiajastu mesinduspäevik hoiab kõik sinu mesilate ja tarude info ühes kohas.</h5>
      <button v-on:click="navigateToLogin" type="button" class="btn btn-warning my-3">Logi sisse</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    navigateToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    }
  }
}
</script>

<style>
.home {
  background-position: bottom;
  background-repeat: no-repeat;
  background-image: url("~@/assets/flower_background.png");
  min-height: 100vh;
  background-size: contain;
}

.headline {
  margin-top: 50px;
}

.frontPageImg {
  height: 250px;
}
</style>