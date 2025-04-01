import { createRouter, createWebHistory } from "vue-router";

//import LandingPage from '@/features/public/pages/LandingPage.vue'
import Home from "@/views/HomeView.vue";
import Shop from "@/views/Shop.vue";
import Contact from "@/views/Contact.vue";
import About from "@/views/About.vue";
import Recipes from "@/views/Recipes.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/shop",
      name: "Shop",
      component: Shop,
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/recipes",
      name: "Recipes",
      component: Recipes,
    },
  ],
});

export default router;
