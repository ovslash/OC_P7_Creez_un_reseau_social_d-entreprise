<!-- en-tete du site -->

<template>
  <div class="center bg-dark text-white mb-3">
    <!-- menu mobile -->
    <div class="d-flex justify-content-between menu-mobile d-sm-none pb-1">
      <b-img
        :src="require('../assets/images/logo_court.png')"
        alt="groupomania logo"
        fluid
      ></b-img>
      <b-nav>
        <b-nav-item to="/groupomania" exact>
          <b-icon
            icon="card-text"
            aria-label="accueil"
            class="menu-icon"
          ></b-icon>
        </b-nav-item>
        <b-nav-item to="/myprofile" exact>
          <b-icon
            class="menu-icon"
            icon="person"
            aria-label="mon profil"
          ></b-icon>
        </b-nav-item>

        <b-nav-item to="/admin" exact v-if="this.user.admin == '1'">
          <b-icon
            class="menu-icon"
            icon="badge-ad"
            aria-label="mon profil"
          ></b-icon>
        </b-nav-item>

        <b-nav-item>
          <b-icon
            class="menu-icon"
            @click="logout"
            icon="unlock"
            aria-label="déconnexion"
          ></b-icon>
        </b-nav-item>
      </b-nav>
    </div>

    <!-- menu classique -->
    <div class="d-none d-sm-block">
      <b-img
        :src="require('../assets/images/logo_long.png')"
        alt="groupomania logo"
        fluid
        class="logo"
      ></b-img>
      <b-nav class="d-flex justify-content-center">
        <!-- <DateTime /> -->
        <b-nav-item @click="mainView">
          <b-icon
            icon="card-text"
            aria-label="accueil"
            class="menu-icon"
          ></b-icon
          ><br />
          <p class="menu-text">Publications</p>
        </b-nav-item>

        <b-nav-item to="/myprofile" exact>
          <div class="menu-text">
            <ProfileImage
              imageHeight="32"
              :imageUrl="user.profilePhoto"
              :alt="`avatar ${user.firstName}`"
            /><br />
            {{ user.firstName }} {{ user.lastName }}
          </div>
        </b-nav-item>

        <b-nav-item to="/myprofile" exact>
          <div>
            <b-icon
              class="menu-icon"
              icon="person"
              aria-label="mon profil"
            ></b-icon
            ><br />
            <p class="menu-text">Profil</p>
          </div>
        </b-nav-item>

        <b-nav-item to="/admin" exact v-if="this.user.admin == '1'">
          <b-icon
            class="menu-icon"
            icon="badge-ad"
            aria-label="mon profil"
          ></b-icon
          ><br />
          <p class="menu-text">Administration</p>
        </b-nav-item>

        <b-nav-item @click="logout">
          <b-icon
            class="menu-icon"
            icon="unlock"
            aria-label="déconnexion"
          ></b-icon>
          <p class="menu-text">logout</p>
        </b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
// import DateTime from "../components/DateTime.vue";
import router from "../router/index";
import ProfileImage from "../components/ProfileImage.vue";

export default {
  name: "HeaderMainView",

  components: {
    //DateTime,
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

<style scoped>
.center {
  text-align: center;
}
.logo {
  max-height: 100px;
}
.menu-icon {
  color: white;
  height: 40px;
  width: 40px;
}
.menu-mobile {
  height: 50px;
}
.menu-text {
  text-decoration: none;
  color: white;
  margin-bottom: 0;
}

@media (min-width: 576px) {
  .menu-icon {
    height: 30px;
    width: 30px;
  }
}
</style>
