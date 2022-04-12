<template>
  <div class="center bg-dark">
    <b-img
      :src="require('../assets/images/logo_long.png')"
      alt="groupomania logo"
      fluid
      class="logo"
    ></b-img>
  </div>
</template>

<script>
export default {
  name: "headerStarter",
};
</script>

<style lang="scss" scoped>
.logo {
  max-height: 100px;
}
</style>
