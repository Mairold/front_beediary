<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </div>
    <router-view/>
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
    checkIfIsLoggedIn(){
      if (sessionStorage.getItem('userId')== null) {
        this.isLoggedIn = false
      } else {
        this.isLoggedIn = true
      }
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
