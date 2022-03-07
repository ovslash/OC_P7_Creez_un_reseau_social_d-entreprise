<template>
  <div>
    <h1>Accueil</h1>
    <div>
      <h2>login</h2>

      <form>
        <label for="login-email">Email</label>
        <input v-model="email" type="text" placeholder="Adresse mail" />
        <label for="login-password">Mot de passe</label>
        <input v-model="password" type="password" placeholder="Mot de passe" />
        <p>{{ errorMessage }}</p>
        <button @click="login" type="button">connexion avec formulaire</button>
      </form>
    </div>
    <div>
      <h3>Pas de compte</h3>
      <router-link to="/signup">S'inscrire</router-link>
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import { apiFetch } from "../utils/ApiFetch";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      if (this.email != "" && this.password !== "") {
        apiFetch
          .post("/auth/login", { email: this.email, password: this.password })
          .then((res) => {
            if (!res.token) {
              this.errorMessage = res.error;
            } else {
              localStorage.setItem("userToken", res.token);
              localStorage.setItem("userData", JSON.stringify(res.user));
              console.log("userToken:", res.token);
              router.push({ name: "groupomania" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = "Erreur de connexion";
          });
      } else {
        this.errorMessage = "Veuillez saisir votre email et votre mot de passe";
      }
    },
  },
};
</script>
