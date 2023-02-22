<template>

  <div class="row justify-content-center">
    <div class="col-4 my-5" style="align-content: center">
      <AlertSuccess :message="messageSuccess"/>

      <table class="table table-striped bg-light bg-opacity-50">
        <thead>
        <tr>
          <th scope="col">Mesila nimi</th>
          <th scope="col">Laiuskraad</th>
          <th scope="col">Pikkuskraad</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="apiary in userApiaries" :key="apiary.apiaryId">
          <td>{{ apiary.apiaryName }}</td>
          <td>{{ apiary.latitude }}</td>
          <td>{{ apiary.longitude }}</td>
          <th>
            <font-awesome-icon v-on:click="showModal(apiary)" class="icon-hover" icon="fa-solid fa-pencil"/>
          </th>
        </tr>
        </tbody>
      </table>

    </div>
    <ModalApiary :show="show">
      <template #header>
        <h6> Muuda mesila andmeid </h6>
      </template>
      <template #body>
        <input v-model="userApiary.apiaryName" type="text" class="form-control" placeholder="Mesila nimi">
        <input v-model="userApiary.latitude" type="text" class="form-control my-2" placeholder="Laiuskraad">
        <input v-model="userApiary.longitude" type="text" class="form-control" placeholder="Pikkuskraad">
      </template>
      <template #footer>
        <button v-on:click="updateApiary" class="btn btn-warning my-2">Uuenda</button>
        <button class="btn btn-back mx-2" @click="show = false">Tühista</button>
      </template>
    </ModalApiary>

  </div>
</template>
<script>
import ModalApiary from "@/components/apiaries/ModalApiary.vue";
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";

export default {
  name: 'ApiariesTable',
  components: {AlertSuccess, ModalApiary},

  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      userApiaries: [
        {
          apiaryId: 0,
          apiaryName: '',
          latitude: 0,
          longitude: 0,
        }
      ],
      userApiary: {
        apiaryId: 0,
        apiaryName: '',
        latitude: 0,
        longitude: 0,
      },
      show: false,
      messageSuccess: ''
    }
  },
  methods: {
    getAllUserApiaries: function () {
      this.$http.get("/apiary", {
        params: {
          userId: this.userId
        }
      })
          .then(result => {
            this.userApiaries = result.data
          })
          .catch(error => {
            console.log(error)
          })

    },

    showModal: function (apiary) {
      this.show = true
      this.userApiary.apiaryId = apiary.apiaryId
      this.userApiary.apiaryName = apiary.apiaryName
      this.userApiary.latitude = apiary.latitude
      this.userApiary.longitude = apiary.longitude
    },

    updateApiary: function () {
      this.$http.patch("/apiary", this.userApiary, {
            params: {
              apiaryId: this.userApiary.apiaryId
            }
          }
      ).then(response => {

        this.show = false
        this.messageSuccess = "Andmed edukalt uuendatud!"
        setTimeout(() => {
          this.$router.go(0)
        }, 1500)
      }).catch(error => {
        console.log(error)
      })
    },



  },


  beforeMount() {
    this.getAllUserApiaries()
  }
}
</script>