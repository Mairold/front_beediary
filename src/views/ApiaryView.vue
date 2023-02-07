<template>
  <div>
    <div class="row justify-content-center">

      <div class="col-2">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
            Mesilad
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Mesila 1</a></li>
          </ul>
        </div>
      </div>
      <div class="col-6">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Taru nimi</th>
            <th scope="col">Viimati külastatud</th>
            <th scope="col">Taru suurus</th>
            <th scope="col">Mesila</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>???</th>
            <td>???</td>
            <td>???</td>
            <td>???</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApiaryView"
}
</script>

<style scoped>

</style>