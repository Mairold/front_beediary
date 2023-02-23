<template>
  <div id="app">
    <nav v-if="isLoggedIn" class="navbar navbar-expand-lg navbar-bee bg-dark">
      <div class="container-fluid">
        <img src="./assets/bee_logo.png" alt="">
        <div class="collapse navbar-collapse mx-3" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#/profile">Minu profiil</a>
            </li><li class="nav-item">
              <a class="nav-link" href="#/apiary">Minu tarud</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Minu mesilad
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#/apiaries">Mesilate andmed</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#/map">Kaart</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/task">Minu ülesanded</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" v-on:click="show = true"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket"/> Logi Välja</a>
            </li>
          </ul>
        </div>
      </div>
      <ModalApiary :show="show">
        <template #header>
          <h4> Kohtumiseni! </h4>
        </template>
        <template #body>
          <img alt="Bye" src="./assets/bee_bye.gif" height="250" width="250">
        </template>
        <template #footer>
          <button class="btn btn-back mx-2 my-2" @click="show = false">Tühista</button>
          <button class="btn btn-warning mx-2" v-on:click="logout">Logi välja</button>
        </template>
      </ModalApiary>
    </nav>
    <router-view @emitLoginSuccessEvent='checkIfIsLoggedIn'/>
  </div>
</template>
<script>
import HomeView from "@/views/HomeView.vue";
import ModalApiary from "@/components/apiaries/ModalApiary.vue";

export default {
  name: 'AppView',
  components: {ModalApiary, HomeView},
  data: function () {
    return {
      isLoggedIn: false,
      show: false
    }
  },
  methods: {
    checkIfIsLoggedIn: function () {
      if (sessionStorage.getItem('userId') == null) {
        this.isLoggedIn = false
      } else {
        this.isLoggedIn = true
        this.show = false
      }
    },
    logout: function () {
      sessionStorage.clear()
      this.isLoggedIn = false
        this.$router.push({name: 'homeRoute'})
    },
    timeoutAndReloadPage: function (timeOut) {
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut)
    },
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
  color: rgb(10, 10, 10);
  background-image: url("../src/assets/background.jpeg");
  min-height: 100vh
}

nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: rgba(231, 161, 31, 0.95);
}
nav a.router-link-exact-active {
  color: #b37a00;
}
</style>
