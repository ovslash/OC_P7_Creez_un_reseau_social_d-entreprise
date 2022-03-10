<template>
  <div>
    <div>
      <p><HeaderMainView /></p>
    </div>
    <h1>Mon profil</h1>
    <div>
      <p>Image du profil</p>
      <p>{{ user.firstName }} {{ user.lastName }}</p>

      <p>{{ user.profession }}</p>
      <p>{{ user.userDescription }}</p>
    </div>
  </div>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";
import { apiFetch } from "../utils/ApiFetch";

export default {
  name: "MyProfile",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userData")),
    };
  },
  components: {
    HeaderMainView,
  },
  methods: {
    getNow: function () {
      apiFetch
        .get("/auth/user-profile/${this.user.id}")
        .then((data) => {
          this.user = data.user;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
