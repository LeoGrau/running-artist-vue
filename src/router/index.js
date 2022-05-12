import { createRouter, createWebHistory } from "vue-router";
import ChallengesView from "../views/challenges-view.vue";
import ChallengesOffersView from "../views/crud-challenges-view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ChallengesView,
    },
    {
      path: "/business/challenges",
      name: "challenges",
      component: ChallengesOffersView,
    },
  ],
});

export default router;
