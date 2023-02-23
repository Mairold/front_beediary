<template>
  <div class="my-5">
    <h1>Mesilad</h1>
    <div class="row justify-content-center" id="container">
      <div id="mapContainer"></div>
    </div>
    <ModalApiary :show="show">
      <template #header>
        <h6> Mesila andmed </h6>
      </template>
      <template #body>
        <input v-model="userApiary.apiaryName" type="text" class="form-control" placeholder="Mesila nimi">
        <div class="input-group mb-3 my-3">
          <span class="input-group-text">Laiuskraad</span>
          <input v-model="userApiary.latitude" type="text" class="form-control" placeholder="Laiuskraad">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Pikkuskraad</span>
          <input v-model="userApiary.longitude" type="text" class="form-control" placeholder="Pikkuskraad">
        </div>
      </template>
      <template #footer>
        <button v-on:click="updateApiary" class="btn btn-warning my-2">Uuenda</button>
        <button class="btn btn-back mx-2" @click="show = false">Tühista</button>
      </template>
    </ModalApiary>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LMarker from "vue2-leaflet/src/components/LMarker.vue";
import ModalApiary from "@/components/apiaries/ModalApiary.vue";

export default {
  name: "MapView",
  components: {ModalApiary, LMarker},
  data: function () {
    return {
      center: [58.6552, 25.9769],
      userId: sessionStorage.getItem('userId'),
      show: false,
      userApiary: {
        apiaryId: 0,
        apiaryName: '',
        latitude: 0,
        longitude: 0,
      },
      userApiaries: [
        {
          apiaryId: 0,
          apiaryName: '',
          latitude: 0,
          longitude: 0,
        }
      ]
    }
  },
  methods: {
    getAllUserApiaries: function () {
      this.$http.get("/apiary", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.userApiaries = response.data
        this.setupLeafletMap()
      }).catch(error => {
        console.log(error)
      })
    },
    setupLeafletMap: function () {
      const map = L.map("mapContainer").setView(this.center, 8);
      L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
                'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            accessToken: "pk.eyJ1IjoibmlwaXRpcmkyIiwiYSI6ImNsZWU3cnlxZTBlZm4zdnAya3NyM2RpNGUifQ.bXlgwuQ8jpeLz0o0JrOptA",
          }).addTo(map);
      this.addUserApiaryPins(map);
      this.addNewPin(map);
    },
    addUserApiaryPins: function (map) {
      for (let i = 0; i < this.userApiaries.length; i++) {
        L.marker([this.userApiaries[i].latitude, this.userApiaries[i].longitude]).addTo(map).bindPopup(this.userApiaries[i].apiaryName)
      }
    },
    // addNewPin: function (map) {
    //   map.on("click", function (e) {
    //     var marker = new L.marker(e.latlng).addTo(map)
    //         .bindPopup("Koordinaadid: " + "<br>" + String(e.latlng.lat.toPrecision(6)) + "<br>" + String(e.latlng.lng.toPrecision(6)));
    //   })
    // },
    addNewPin: function (map) {
      map.on("click", function (e) {
        var marker = new L.marker(e.latlng).addTo(map)
            .bindPopup("Koordinaadid: " + "<br>" + String(e.latlng.lat.toPrecision(6)) + "<br>" + String(e.latlng.lng.toPrecision(6)) + "<br>" + "<button @click=showModal>Lisa mesila</button>");
      })
    },
    showModal: function () {
      this.show = true
    }
  },
  mounted() {
    this.getAllUserApiaries();
  }
}
</script>
<style scoped>
#mapContainer {
  width: 80vw;
  height: 100vh;
}
</style>