<template>
  <div>
    <br/>
    <h3>Tere tulemast!</h3>
    <img alt="Bee logo" src="../assets/bee.gif" height="250">
    <div>
      <br>
      <h6>Digiajastu mesinduspäevik hoiab kõik sinu mesilate ja tarude info ühes kohas.</h6>
      <br>
      <button v-on:click="navigateToLogin" type="button" class="btn btn-warning">Logi sisse</button>
    </div>
  </div>

</template>

<script>

export default {
  name: "HomeView",
  methods: {
    navigateToLogin: function () {
      this.$router.push({name:'loginRoute'})
    }
  }
}
</script>

<style>


</style>