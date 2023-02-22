<template>
  <div class="my-5">
    <h1>Mesilad</h1>
    <div class="row justify-content-center" id="container">
      <div id="mapContainer"></div>
    </div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LMarker from "vue2-leaflet/src/components/LMarker.vue";

export default {
  name: "MapView",
  components: {LMarker},
  data: function () {
    return {
      center: [58.6552, 25.9769],
      userId: sessionStorage.getItem('userId'),
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
    addNewPin: function (map) {
      map.on("click", function (e) {
        var marker = new L.marker(e.latlng).addTo(map)
            .bindPopup("Koordinaadid: " + "<br>" + String(e.latlng.lat.toPrecision(6)) + "<br>" + String(e.latlng.lng.toPrecision(6)));
      })
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