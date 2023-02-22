<template>
  <div>
    <div v-if="!loading">
      <br>
      <h3>Tere tulemast!</h3>
      <img alt="Bee logo" src="../assets/bee.gif" height="250">
      <div>
        <h6 class="my-3">Digiajastu mesinduspäevik hoiab kõik sinu mesilate ja tarude info ühes kohas.</h6>
        <button v-on:click="navigateToLogin" type="button" class="btn btn-warning">Logi sisse</button>
      </div>
    </div>

    <div>
      <img height="430" v-if="loading" src="../assets/buzzbee.gif">
  </div>
  </div>
</template>
<script>

export default {
  name: "HomeView",
  data: function () {
    return {
      loading: false
    }
  },
  methods: {
    navigateToLogin: function () {
      this.loading = true
      setTimeout(() => {
        this.$router.push({name: 'loginRoute'})
      }, 4000)
    }
  }
}
</script>
