<template>
  <div class="center bg-dark text-white footer-fixed">
    <p class="footer">Groupomania 2022</p>
  </div>
</template>

<script>
export default {
  name: "FooterMainView",
};
</script>

<style lang="scss">
.footer {
  font-size: 0.8rem;
}

.footer-fixed {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 20px;
}
</style>
