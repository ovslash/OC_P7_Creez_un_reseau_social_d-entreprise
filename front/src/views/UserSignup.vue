<template>
  <div>
    <h1>Inscrition</h1>
    <div>
      <form>
        <label for="first-name">Prénom</label>
        <input v-model="firstName" type="text" placeholder="Prénom" /><br />

        <label for="last-name">Nom</label>
        <input v-model="lastName" type="text" placeholder="Nom" /><br />

        <label for="email">Email</label>
        <input v-model="email" type="text" placeholder="Adresse mail" /><br />

        <label for="password">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
        /><br />

        <label for="password">Mot de passe</label>
        <input
          v-model="password2"
          type="password"
          placeholder="Mot de passe"
        /><br />

        <p>{{ errorMessage }}</p>
        <button @click="signup" type="button">inscription</button>
      </form>
    </div>
  </div>
</template>

<script>
import { apiFetch } from "../utils/ApiFetch";
import router from "../router/index";

export default {
  name: "SignUp",

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },

      errorMessage: "",
    };
  },

  methods: {
    signup() {
      if (this.password == this.password2) {
        this.form.email = this.email;
        this.form.firstName = this.firstName;
        this.form.lastName = this.lastName;
        this.form.password = this.password;
        console.log(this.form);
        apiFetch
          .post("/auth/signup", this.form)
          .then((res) => {
            console.log("token:", res.token);
            if (!res.token) {
              this.errorMessage = "Erreur, veuillez vous connecter";
            } else {
              localStorage.setItem("userToken", res.token);
              localStorage.setItem("userData", JSON.stringify(res.user));
              router.push({ name: "groupomania" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = "Problèmes de connexion";
          });
      } else {
        this.errorMessage = "Le mot de passe doit etre identique";
      }
    },
  },
};
</script>
