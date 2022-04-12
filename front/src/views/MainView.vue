<!-- vue principale du site -->

<template>
  <div>
    <header class="header">
      <HeaderMainView />
    </header>
    <b-container>
      <main>
        <h1 class="center">Les dernières publications</h1>
        <div class="center">
          <PostCreation />
        </div>
        <LoadSpinner />
        <div>
          <PostList />
        </div>
      </main>
    </b-container>
    <footer class="footer"><FooterMainView /></footer>
  </div>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";
import PostCreation from "../components/PostCreation.vue";
import PostList from "../components/PostList.vue";
import FooterMainView from "../components/FooterMainView.vue";
import LoadSpinner from "../components/LoadSpinner.vue";

export default {
  name: "MainView",

  components: {
    HeaderMainView,
    PostCreation,
    PostList,
    FooterMainView,
    LoadSpinner,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0px;
  z-index: 4;
}
</style>
