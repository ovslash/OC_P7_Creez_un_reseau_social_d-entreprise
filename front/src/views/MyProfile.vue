<template>
  <div>
    <div>
      <HeaderMainView />
    </div>
    <div v-if="mode == 'show'">
      <p>info sur mon profil</p>
      <UserProfileInfos
        userPageTitle="Mon Profil :"
        :userId="this.userData.id"
      />
      <button @click="changeMode" type="button">Editer le profil</button>
    </div>
    <div v-if="mode == 'edit'">
      <p>modif du profile</p>
      <MyProfileEdit @returnShow="returnShow" />
    </div>
  </div>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";
import UserProfileInfos from "../components/UserProfileInfos.vue";
import MyProfileEdit from "../components/MyProfileEdit.vue";
import { eventBus } from "../main.js";

export default {
  name: "MyProfil",
  components: {
    HeaderMainView,
    UserProfileInfos,
    MyProfileEdit,
  },
  data() {
    return {
      mode: "show",
      user: null,
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  },
  mounted() {
    eventBus.$emit("loadUserProfile");
  },
  methods: {
    changeMode() {
      this.mode = "edit";
    },
    returnShow(payload) {
      this.mode = payload.mode;
      eventBus.$emit("loadUserProfile");
    },
  },
};
</script>
