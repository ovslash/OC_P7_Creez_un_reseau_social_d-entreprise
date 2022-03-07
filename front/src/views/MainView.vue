<template>
  <div>
    <p><DateTime /></p>
  </div>
  <div>
    la date et l'heure sur la gauche / un logout / le nom de l'utilisateur /
    image de l'utilisateur / menu > Mon profile - Admin ...
  </div>
  <div>
    <p>Partie de page avec les post</p>
  </div>
</template>

<script>
import DateTime from "../components/DateTime.vue";

export default {
  name: "MainView",
  data() {
    return {
      timestamp: "",
    };
  },
  components: {
    DateTime,
  },
};
</script>
