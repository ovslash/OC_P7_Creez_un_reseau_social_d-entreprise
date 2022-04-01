<!-- vue principale du site -->

<template>
  <div>
    <div>
      <HeaderMainView />
    </div>
    <div>
      <h1>PUBLICATIONS</h1>
      <div>
        <p>CREATION PUBLICATION</p>
        <PostCreation />
      </div>
      <div>
        <p>LA LISTE DES PUBLICATIONS</p>
        <PostList />
      </div>
    </div>
  </div>
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
