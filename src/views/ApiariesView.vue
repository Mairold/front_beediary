<template>
  <div>

    <ApiariesTable ref="apiaryTable" @emitSelectedApiaryEvent="setUserApiary"/>
    <div class="row justify-content-center">

    </div>
  </div>


</template>

<script>
import ApiariesTable from "@/components/apiaries/ApiariesTable.vue";
import ApiaryEditInput from "@/views/ApiaryEditInput.vue";
import {set} from "vue";
import ModalApiary from "@/components/apiaries/ModalApiary.vue";

export default {
  name: "ApiariesView",
  components: {ModalApiary, ApiaryEditInput, ApiariesTable},
  data: function () {
    return {
      isEdit: false,
      userId: sessionStorage.getItem('userId'),
      userApiary:
          {
            apiaryId: 0,
            apiaryName: '',
            latitude: 0,
            longitude: 0,
          }
    }
  },
  methods: {
    setUserApiary: function () {
      this.userApiary.apiaryId = this.$refs.apiaryTable.selectedApiaryId

    }
  }
}

</script>

