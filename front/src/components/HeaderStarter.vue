<template>
  <div class="center header-bg">
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
.header-bg {
  background-color: #091f43 !important;
}
</style>
