<template>
  <div>
    <div>
      <p><HeaderMainView /></p>
    </div>
    <h1>Mon profile</h1>
    <p>bla bla bla</p>
  </div>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";

export default {
  name: "MyProfile",
  data() {
    return {
      timestamp: "",
    };
  },
  components: {
    HeaderMainView,
  },
};
</script>
