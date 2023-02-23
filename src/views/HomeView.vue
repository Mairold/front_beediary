<template>
  <div>
    <div>
      <br>
      <h2>Tere tulemast!</h2>
      <img alt="Bee logo" src="../assets/bee.gif" height="250">
      <div>
        <h6 class="my-4">Digiajastu mesinduspäevik hoiab kõik sinu mesilate ja tarude info ühes kohas.</h6>
        <button v-on:click="navigateToLogin" type="button" class="btn btn-warning my-3">Logi sisse</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "HomeView",
  data: function () {
    return {

    }
  },
  methods: {
    navigateToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    }
  }
}
</script>
