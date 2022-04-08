<!-- vue principale du site -->

<template>
  <b-container>
    <header>
      <HeaderMainView />
    </header>
    <main>
      <h1 class="center">Les dernières publications</h1>
      <div class="center">
        <PostCreation />
      </div>
      <div>
        <PostList />
      </div>
    </main>
    <footer></footer>
  </b-container>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";
import PostCreation from "../components/PostCreation.vue";
import PostList from "../components/PostList.vue";

export default {
  name: "MainView",

  components: {
    HeaderMainView,
    PostCreation,
    PostList,
  },
};
</script>
