<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <nav>
        <router-link to="/profile">Minu profiil</router-link> |
        <router-link to="/apiary">Minu mesilad</router-link> |
        <router-link to="/visit">Minu ülesanded</router-link> |
        <a v-if="isLoggedIn" v-on:click="logout" href="">Logi välja</a>

      </nav>
    </div>
    <router-view @emitLoginSuccessEvent = 'checkIfIsLoggedIn'/>
  </div>
</template>

<script>
export default {
  name: 'AppView',
  data: function () {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    checkIfIsLoggedIn: function (){
      if (sessionStorage.getItem('userId')== null) {
        this.isLoggedIn = false
      } else {
        this.isLoggedIn = true
      }
    },
    logout: function () {
      sessionStorage.clear()
      this.isLoggedIn = false
    }
  },
  beforeMount() {
    this.checkIfIsLoggedIn()
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
