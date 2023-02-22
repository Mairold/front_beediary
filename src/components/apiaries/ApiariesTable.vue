<template>
  <div class="row justify-content-center">
    <div class="col-4 my-4" style="align-content: center">
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
            <font-awesome-icon v-on:click="showModal" class="icon-hover"
                               icon="fa-solid fa-pencil"/>

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
        <input v-model="userApiaries.apiaryName" type="text" class="form-control" placeholder="Mesila nimi">
        <input type="text" class="form-control my-2" placeholder="Laiuskraad">
        <input type="text" class="form-control" placeholder="Pikkuskraad">
      </template>
      <template #footer>
        <button
            class="btn btn-warning my-2"
            @click="show = false">Uuenda
        </button>
        <button
            class="btn btn-back mx-2"
            @click="show = false"
        >Tühista
        </button>
      </template>

    </ModalApiary>
  </div>
</template>
<script>
import ModalApiary from "@/components/apiaries/ModalApiary.vue";

export default {
  name: 'ApiariesTable',
  components: {ModalApiary},

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
      show: false
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

    showModal: function (apiaryId) {
      this.show = true
      this.userApiary.apiaryId = apiaryId
    },

    // setModalInput: function () {
    //   this.userApiary.apiaryId =
    // }


  },


  beforeMount() {
    this.getAllUserApiaries()
  }
}
</script>