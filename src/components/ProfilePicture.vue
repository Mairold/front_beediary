<template>
  <div>
    <img v-if="userProfile.picture == null" src="../assets/beekeeper_avatar.png" height="150" width="150">
    <img v-else
         :src="userProfile.picture"
         class="img-thumbnail"
         height="150"
         width="150">
  </div>
</template>
<script>
export default {
  name: 'ProfilePicture',
  props: {
    userProfile: {}
  }
}
</script>