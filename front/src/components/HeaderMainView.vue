<template>
  <div>
    <p><DateTime /></p>
  </div>

  <div>
    <router-link to="/myprofile">Mon profile</router-link>
  </div>

  <div>
    la date et l'heure sur la gauche / un logout / le nom de l'utilisateur /
    image de l'utilisateur / menu > Mon profile - Admin ...
  </div>
</template>

<script>
import DateTime from "../components/DateTime.vue";

export default {
  name: "HeaderMainView",
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
