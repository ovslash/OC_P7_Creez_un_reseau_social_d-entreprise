<template>
  <div>
    <div>
      <HeaderMainView />
    </div>
    <b-container class="center">
      <div>
        <h1>Administration</h1>
      </div>
      <div>
        <h2>Fonctionnalités à venir</h2>
        <b-card class="shadow mb-3"
          >Modification d'un profil pour devenir administrateur</b-card
        >
        <b-card class="shadow mb-3"
          >Envoi de messages prédéfinis vers les utilisateurs</b-card
        >
        <b-card class="shadow mb-3">...</b-card>
      </div>
    </b-container>

    <div>
      <footer><FooterMainView /></footer>
    </div>
  </div>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";
import FooterMainView from "../components/FooterMainView.vue";

export default {
  name: "AdminView",

  components: {
    HeaderMainView,
    FooterMainView,
  },
};
</script>
