<template>
  <div>
    <div>
      <DateTime />
    </div>
    <div>{{ user.firstName }} {{ user.lastName }}</div>
    <div>
      <ProfileImage
        imageHeight="30"
        :imageUrl="user.profilePhoto"
        :alt="`avatar ${user.firstName}`"
      />
    </div>
    <div>
      <router-link to="/myprofile">Mon profil</router-link>
    </div>
    <div>
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
