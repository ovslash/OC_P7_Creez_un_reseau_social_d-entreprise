<!-- header de la publication / details user et depuis quand -->

<template>
  <div class="d-flex justify-content-center">
    <ProfileImage
      imageHeight="40"
      :imageUrl="post.User.profilePhoto"
      :alt="`image de profil de ${post.User.firstName}`"
    />

    <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>

    <p>Il y à {{ dayjs(post.createdAt).locale("fr").fromNow(true) }}</p>
    <!-- ------------------------modification du post ------------------------------------- -->
    <b-dropdown
      id="dropdown-right"
      right
      class="m-2"
      v-if="post.userId == this.userData.id || this.userData.admin == '1'"
    >
      <b-dropdown-item v-b-modal="'modal-modify' + post.id"
        >Modifier</b-dropdown-item
      >
      <b-modal
        :id="'modal-modify' + post.id"
        title="Modifier la publication"
        ok-title="modifier"
        cancel-title="annuler"
        @ok="modifyPost(`${post.id}`, $event)"
        centered
      >
        <b-form class="col p-2 overflow-hidden">
          <!-- modification contenu -->
          <b-form-textarea
            rows="2"
            max-rows="10"
            v-model="description"
            class="modify-description"
          ></b-form-textarea>

          <!-- ajout de médias -->
          <PostInputMedia
            labelTitle="modifier médias"
            inputImageId="input-image-modify"
            inputImageClass="input-file-modify"
            previewMedia=".preview-media-modify"
            inputFile=".input-file-modify"
          />

          <!-- preview des images -->
          <div class="preview-media-modify text-secondary font-italic">
            <div v-for="value in imageUrl" :key="value">
              <b-img :src="value" alt="" class="post-images"></b-img>
            </div>
          </div>
          <p class="text-danger" v-if="errorMessage">{{ errorMessage }}</p>
        </b-form>
      </b-modal>

      <!-- -------------------suppresion post--------------------------------------- -->
      <b-dropdown-item v-b-modal="'modal-' + post.id" class="delete-option"
        >Supprimer</b-dropdown-item
      >
      <b-modal
        :id="'modal-' + post.id"
        title="Voulez-vous vraiment supprimer cette publication ?"
        ok-title="supprimer"
        cancel-title="annuler"
        @ok="deletePost(`${post.id}`)"
      >
        <p>La publication sera supprimée définitivement.</p>
      </b-modal>
    </b-dropdown>
  </div>
</template>

<script>
import ProfileImage from "./ProfileImage.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
require("dayjs/locale/fr");

// -------------------------------------
import PostInputMedia from "../components/PostInputMedia.vue";
import { apiFetch } from "../utils/ApiFetch";
// -------------------------------------

export default {
  name: "PostHeader",
  components: {
    ProfileImage,
    PostInputMedia,
  },
  props: {
    post: { type: Object },
    loadPosts: { type: Function },
  },
  data() {
    return {
      dayjs: dayjs,
      imageUrl: JSON.parse(this.post.imageUrl),
      userData: JSON.parse(localStorage.getItem("userData")),
      errorMessage: "",
      description: this.post.description,
    };
  },

  methods: {
    deletePost(id) {
      apiFetch
        .delete("/posts/" + id)
        .then(() => {
          this.$emit(this.loadPosts());
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modifyPost(id, event) {
      const description = document.querySelector(".modify-description").value;
      const userId = this.userData.id;
      const previewMedia = document.querySelector(".preview-media-modify");

      const selectedFile = document.querySelector(".input-file-modify");
      let images = selectedFile.files;

      if (description === "" && !previewMedia.firstChild) {
        event.preventDefault();
        this.errorMessage = "vous ne pouvez pas envoyer un post vide";
      } else {
        this.errorMessage = "";
        const isFormData = images.length > 0;
        let body = {
          userId: Number(userId),
          description: description,
        };

        if (isFormData) {
          const formData = new FormData();
          for (let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
          }
          formData.append("post", JSON.stringify(body));
          body = formData;
        }

        apiFetch
          .put("/posts/" + id, body, { isFormData })
          .then(() => {
            this.$emit(this.loadPosts());
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
