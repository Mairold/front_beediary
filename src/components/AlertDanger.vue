<template>
  <div v-if="message != ''" class="alert alert-bee" role="alert">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "AlertDanger",
  props: {
    message: {}
  }
}
</script>
