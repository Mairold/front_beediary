<template>
  <div>
    <h1>Tere tulemast!</h1>
    <img alt="Bee logo" src="../assets/bee.gif">
    <div>
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

<style scoped>

</style>