<!-- outil permetant d'avoir les informations sur un utilisateur -->

<template>
  <div>
    <h1>{{ userPageTitle }} {{ user.firstName }} {{ user.lastName }}</h1>
    <ProfileImage
      imageHeight="200"
      :imageUrl="user.profilePhoto"
      :alt="`avatar ${user.firstName}`"
    />

    <p>{{ user.firstName }} {{ user.lastName }}</p>
    <p>{{ user.profession }}</p>
    <p>{{ user.userDescription }}</p>
  </div>
</template>

<script lang="ts">
import { apiFetch } from "../utils/ApiFetch";
import { eventBus } from "../main.js";
import ProfileImage from "../components/ProfileImage.vue";

export default {
  name: "UserProfileInfos",

  components: {
    ProfileImage,
  },

  data() {
    return {
      user: {},
    };
  },
  props: {
    userPageTitle: String,
    userId: Number,
  },
  created() {
    this.loadUserProfile();
    eventBus.$on("loadUserProfile", () => {
      this.loadUserProfile();
    });
  },
  methods: {
    loadUserProfile() {
      apiFetch
        .get(`/auth/user-profile/${this.userId}`)
        .then((data) => {
          this.user = data.user;
          this.$emit("userInfos", this.user);
          console.log(this.user);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
img {
  height: 200px;
}
</style>
