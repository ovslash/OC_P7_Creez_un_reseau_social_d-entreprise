<!-- outil pour modifier son profil -->

<template>
  <div>
    <h1>Modification du profil</h1>

    <h2>Informations générales</h2>
    <!-- changer les infos générales -->
    <b-form @submit.prevent="update">
      <b-form-group>
        <ProfileImage
          imageHeight="70"
          :imageUrl="profilePhoto"
          class="profileImage"
          alt="mon avatar"
        />
        <input
          type="file"
          id="edit-profile-input"
          name="image"
          accept=".jpg, .jpeg, .png"
          autocomplete="photo"
          @change="updateProfileImage()"
        />
        <label for="edit-profile-input" role="button"
          >changer l'image de profil</label
        >
      </b-form-group>

      <b-form-group>
        <label for="first-name">Prénom</label>
        <b-form-input v-model="form.firstName" type="text" id="first-name">
        </b-form-input>
      </b-form-group>

      <b-form-group
        ><label for="last-name">Nom</label>
        <b-form-input v-model="form.lastName" type="text" id="last-name">
        </b-form-input
      ></b-form-group>

      <b-form-group>
        <label for="profession">Profession</label>
        <b-form-input
          v-model="form.profession"
          type="text"
          placeholder="profession"
          id="profession"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="description">Description</label>
        <b-form-input
          v-model="form.userDescription"
          type="text"
          placeholder="Description"
          id="description"
        ></b-form-input>
      </b-form-group>

      <p>{{ errorMessage }}</p>

      <b-button @click="cancel">retour</b-button>
      <b-button type="submit">Modifier</b-button>
    </b-form>

    <!-- changer le mot de passe -->

    <h2>Mot de passe</h2>

    <b-form @submit.prevent="changePassword">
      <b-form-group>
        <label for="password">Ancien mot de passe</label>
        <b-form-input
          v-model="passwordChangeForm.currentPassword"
          type="password"
          id="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="passwordNew">Nouveau mot de passe</label>
        <b-form-input
          v-model="passwordChangeForm.newPassword"
          type="password"
          id="passwordNew"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="passwordNewConfirm">Nouveau mot de passe</label>
        <b-form-input
          v-model="passwordChangeForm.newPasswordConfirm"
          type="password"
          id="passwordNewConfirm"
        ></b-form-input>
      </b-form-group>

      <p>{{ errorMessage }}</p>

      <b-button @click="cancel">retour</b-button>
      <b-button type="submit">Modifier</b-button>
    </b-form>

    <!-- supprimer le compte -->

    <h2>Supprimer le compte</h2>

    <b-form @submit.prevent="deleteUser">
      <b-form-group>
        <p>Pour supprimer votre compte veuillez saisir "SUPPIMER"</p>
        <label for="delete"></label>
        <b-form-input
          v-model="deleteUserForm"
          type="text"
          id="delete"
        ></b-form-input>
      </b-form-group>
      <p>{{ errorMessageDelete }}</p>

      <b-button @click="cancel">retour</b-button>
      <b-button type="submit">Supprimer</b-button>
    </b-form>
  </div>
</template>

<script>
import { apiFetch } from "../utils/ApiFetch";
import router from "../router/index";
import ProfileImage from "../components/ProfileImage.vue";

export default {
  name: "EditProfile",

  components: {
    ProfileImage,
  },

  data() {
    return {
      deleteUserForm: "",
      profilePhoto: "",
      user: JSON.parse(localStorage.getItem("userData")),
      form: {
        firstName: "",
        lastName: "",
        profession: "",
        userDescription: "",
      },
      passwordChangeForm: {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
      errorMessage: "",
      errorMessageDelete: "",
    };
  },

  mounted() {
    this.profilePhoto = this.user.profilePhoto;
    this.form.firstName = this.user.firstName;
    this.form.lastName = this.user.lastName;
    this.form.profession = this.user.profession;
    this.form.userDescription = this.user.userDescription;
  },

  methods: {
    updateProfileImage() {
      const profileImage = document.querySelector(".profileImage");
      const inputImage = document.getElementById("edit-profile-input");
      let currentFile = inputImage.files;
      profileImage.src = window.URL.createObjectURL(currentFile[0]);
    },

    cancel() {
      this.$emit("returnShow", { mode: "show" });
    },

    update() {
      const selectedFile = document.getElementById("edit-profile-input");
      let profileImage = selectedFile.files;
      const isFormData = profileImage.length > 0;

      let body = this.form;
      console.log(body);

      if (isFormData) {
        const formData = new FormData();
        formData.append("image", profileImage[0]);
        formData.append("user", JSON.stringify(body));
        body = formData;
      }

      apiFetch
        .put(`/auth/user-profile/${this.user.id}`, body, { isFormData })
        .then((res) => {
          if (!res.error) {
            localStorage.setItem("userData", JSON.stringify(res.user));
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.$emit("returnShow", { mode: "show" });
    },

    //------------------------------------------------------------------

    changePassword() {
      if (
        this.passwordChangeForm.newPassword ==
        this.passwordChangeForm.newPasswordConfirm
      ) {
        apiFetch
          .put(`/auth/user-profile/settings/${this.user.id}`, {
            currentPassword: this.passwordChangeForm.currentPassword,
            newPassword: this.passwordChangeForm.newPassword,
          })
          .then((res) => {
            if (!res.error1) {
              localStorage.clear();
              router.push({ name: "login" });
            } else {
              this.errorMessage = "Le mot de passe actuel est érroné";
            }
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage =
          "Les mots nouveaux de passe doivent etre identiques";
      }
    },

    //------------------------------------------------------------------

    deleteUser() {
      if (this.deleteUserForm == "SUPPRIMER") {
        apiFetch.delete(`/auth/user-profile/${this.user.id}`).catch((error) => {
          console.log(error);
        });
        localStorage.clear();
        router.push({ name: "login" });
      } else {
        this.errorMessageDelete = "`SUPPRIMER` doit etre saisi ";
      }
    },
  },
};
</script>
