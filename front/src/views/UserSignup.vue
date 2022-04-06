<!-- page de creation de compte -->

<template>
  <b-container fluid>
    <h1>Inscrition</h1>
    <b-row>
      <b-col class="d-sm-flex flex-column align-items-center">
        <b-form class="form-width my-4" @submit.prevent="signup">
          <b-form-group>
            <div class="input-div" id="firstName">
              <label for="signup-firstname" class="text-left">Prénom</label>
              <b-form-input
                v-model="firstName"
                type="text"
                id="signup-firstname"
              ></b-form-input>
            </div>
          </b-form-group>

          <b-form-group>
            <div class="input-div" id="lastName">
              <label for="signup-name" class="text-left">Nom</label>
              <b-form-input
                v-model="lastName"
                type="text"
                class="px-4 input pt-3"
                id="signup-name"
              ></b-form-input>
            </div>
          </b-form-group>

          <b-form-group>
            <div class="input-div" id="email">
              <label for="signup-email" class="text-left">Email</label>
              <b-form-input
                v-model="email"
                type="email"
                class="px-4 input pt-3"
                autocomplete="email"
                id="signup-email"
              ></b-form-input>
            </div>
          </b-form-group>

          <b-form-group>
            <div class="input-div" id="password">
              <label for="singup-password" class="text-left"
                >Mot de passe</label
              >
              <b-form-input
                v-model="password"
                type="password"
                class="px-4 input pt-3"
                autocomplete="new-password"
                id="singup-password"
              ></b-form-input>
            </div>
          </b-form-group>

          <b-form-group>
            <div class="input-div" id="password">
              <label for="singup-password2" class="text-left"
                >Mot de passe</label
              >
              <b-form-input
                v-model="password2"
                type="password"
                class="px-4 input pt-3"
                autocomplete="new-password"
                id="singup-password2"
              ></b-form-input>
            </div>
          </b-form-group>

          <p class="text-left text-danger mb-3">{{ errorMessage }}</p>

          <b-button @click="cancel">retour</b-button>
          <b-button type="submit">inscription</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
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
    cancel() {
      router.push({ name: "login" });
    },
  },
};
</script>
