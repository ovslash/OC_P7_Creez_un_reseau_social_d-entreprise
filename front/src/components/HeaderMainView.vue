<!-- en-tete du site -->

<template>
  <div>
    <div class="d-flex justify-content-center">
      <DateTime />

      <button @click="mainView" type="button">Les publications</button>
      {{ user.firstName }} {{ user.lastName }}
      <ProfileImage
        imageHeight="30"
        :imageUrl="user.profilePhoto"
        :alt="`avatar ${user.firstName}`"
      />

      <router-link to="/myprofile">Mon profil</router-link>

      <button @click="logout" type="button">logout</button>
    </div>
    <div>
      la date et l'heure sur la gauche / le nom de l'utilisateur / image de
      l'utilisateur / Mon profil / un logout / menu > Mon profil - Admin ...
    </div>
    <div>
      ---------------------------------------------------------------------
    </div>
  </div>
</template>

<script>
import DateTime from "../components/DateTime.vue";
import router from "../router/index";
import ProfileImage from "../components/ProfileImage.vue";

export default {
  name: "HeaderMainView",

  components: {
    DateTime,
    ProfileImage,
  },
  methods: {
    mainView() {
      router.push({ name: "groupomania" });
    },

    logout() {
      localStorage.clear();
      router.push({ name: "login" });
    },
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userData")),
    };
  },
};
</script>
