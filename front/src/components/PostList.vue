<!-- la liste des publications -->

<template>
  <div>
    <div>
      <b-card-group v-for="post in posts" :key="post.updatedAt">
        <b-card header-tag="header" footer-tag="footer" class="mb-3 shadow">
          <template #header>
            <PostHeader :post="post" :loadPosts="loadPosts" />
          </template>
          <PostContent :post="post" :loadPosts="loadPosts" />
          <template #footer>
            <PostFooter :post="post" />
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import PostContent from "../components/PostContent.vue";
import PostHeader from "../components/PostHeader.vue";
import PostFooter from "../components/PostFooter.vue";
import { apiFetch } from "../utils/ApiFetch";
import { eventBus } from "../main.js";

export default {
  name: "PostList",
  components: {
    PostContent,
    PostHeader,
    PostFooter,
  },
  data() {
    return {
      posts: [],
    };
  },
  props: {
    userId: { type: Number },
  },
  mounted() {
    this.loadPosts();
    eventBus.$on("loadPosts", () => {
      this.loadPosts();
    });
  },
  methods: {
    loadPosts() {
      let userIdParams = "";
      if (this.userId) {
        userIdParams = `?userId=${this.userId}`;
      }
      apiFetch
        .get(`/posts/${userIdParams}`)
        .then((data) => {
          this.posts = data.posts;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
