import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/UserLogin.vue";
import Signup from "../views/UserSignup.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "enregistrement",
    component: Signup,
  },

  {
    path: "/groupomania",
    name: "groupomania",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainView.vue"),
  },

  {
    path: "/myprofile",
    name: "monprofile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
