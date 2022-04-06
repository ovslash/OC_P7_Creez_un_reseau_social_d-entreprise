<!-- en-tete du site -->

<template>
  <div>
    <div>
      <b-nav>
        <b-nav-item to="/groupomania" exact>
          <b-icon icon="card-text" aria-label="accueil"></b-icon>
        </b-nav-item>
        <b-nav-item to="/myprofile" exact>
          <b-icon icon="person-fill" aria-label="Mon profil"></b-icon>
        </b-nav-item>
        <b-nav-item>
          <b-icon @click="logout" icon="unlock" aria-label="accueil"></b-icon>
        </b-nav-item>
      </b-nav>
    </div>
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

      <router-link to="/admin" v-if="this.user.admin == '1'">ADMIN</router-link>

      <div>
        ---------------------------------------------------------------------
      </div>
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

  data() {
    return {
      user: JSON.parse(localStorage.getItem("userData")),
    };
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
};
</script>
