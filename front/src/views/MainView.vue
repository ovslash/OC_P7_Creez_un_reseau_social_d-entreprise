<template>
  <div>
    <div>
      <HeaderMainView />
    </div>
    <div>
      <p>Partie de page avec les post</p>
    </div>
  </div>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";

export default {
  name: "MainView",

  components: {
    HeaderMainView,
  },
};
</script>
