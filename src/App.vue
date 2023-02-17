<template>
  <div id="app">
    <nav v-if="isLoggedIn" class="navbar navbar-expand-lg navbar-bee bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img src="./assets/bee_logo.png" alt=""></a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#/profile">Minu profiil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#/apiary">Minu mesilad</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#/visit">Minu ülesanded</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a v-on:click="logout" class="nav-link active" aria-current="page" href="/">Logi Välja</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

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
    },

    timeoutAndReloadPage: function (timeOut) {
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut)
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
  background-image: url("../src/assets/background.jpeg");
  min-height: 100vh
  }


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #b37a00;
}
</style>
