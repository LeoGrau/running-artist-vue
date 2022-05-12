import { createRouter, createWebHistory } from "vue-router";
import OffersView from "../views/offers-view.vue";
import CrudOffersView from "../views/crud-offers-view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: OffersView,
    },
    {
      path: "/offers",
      name: "offers",
      component: CrudOffersView,
    },
  ],
});

export default router;
