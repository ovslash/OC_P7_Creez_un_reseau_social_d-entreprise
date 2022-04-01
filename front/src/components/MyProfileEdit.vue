<!-- outil pour modifier son profil -->

<template>
  <div>
    <h1>Modification du profil</h1>

    <!-- changer les infos générales -->
    <div>
      <h2>Informations générales</h2>
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
      <label
        for="edit-profile-input"
        class="px-1 mb-0 mx-3 text-primary text-nowrap"
        role="button"
        >changer l'image de profil</label
      ><br />

      <label for="first-name">Prénom</label>
      <input id="firstName" v-model="form.firstName" type="text" />

      <label for="last-name">Nom</label>
      <input v-model="form.lastName" type="text" placeholder="Nom" /><br />

      <label for="profession">Profession</label>
      <input
        v-model="form.profession"
        type="text"
        placeholder="Profession"
      /><br />

      <label for="description">Description</label>
      <input
        v-model="form.userDescription"
        type="text"
        placeholder="Description"
      /><br />

      <button @click="cancel" type="button">retour</button>
      <button @click="update" type="button">valider</button><br />
    </div>

    <!-- changer le mot de passe -->
    <div>
      <h2>Changer le mot de passe</h2>
      <div>
        <label for="password">Ancien mot de passe</label>
        <input
          v-model="passwordChangeForm.currentPassword"
          type="password"
        /><br />

        <label for="password">Nouveau mot de passe</label>
        <input v-model="passwordChangeForm.newPassword" type="password" /><br />

        <label for="password">Nouveau mot de passe</label>
        <input
          v-model="passwordChangeForm.newPasswordConfirm"
          type="password"
        /><br />

        <p>{{ errorMessage }}</p>

        <button @click="cancel" type="button">retour</button>
        <button @click="changePassword" type="button">
          Changer mot de passe
        </button>
      </div>
    </div>

    <!-- supprimer le compte -->
    <div>
      <h2>Supprimer le compte</h2>
      <p>Pour supprimer votre compte veuillez saisir "SUPPIMER"</p>
      <label for="delete"></label>
      <input v-model="deleteUserForm" type="text" /><br />
      <p>{{ errorMessageDelete }}</p>
      <button @click="cancel" type="button">retour</button>
      <button @click="deleteUser" type="button">Supprimer le compte</button>
    </div>
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
      DeleteUserForm: "",
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
