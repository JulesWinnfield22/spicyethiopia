import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Shop from "@/views/Shop.vue";
import Contact from "@/views/Contact.vue";
import About from "@/views/About.vue";
import Recipes from "@/views/Recipes.vue";
import SpiceDetail from "@/views/SpiceDetail.vue";
import CartPage from "@/views/CartPage.vue";
import ShippingInformation from "@/views/ShippingInformation.vue";
import PaymentPage from "@/views/PaymentPage.vue";
import Checkout from "@/views/Checkout.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/shop", name: "Shop", component: Shop },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/about", name: "About", component: About },
  { path: "/recipes", name: "Recipes", component: Recipes },
  {
    path: "/spice/:id",
    name: "SpiceDetail",
    component: () => import("@/views/SpiceDetail.vue"),
    props: true,
  },
  { path: "/cart", name: "Cart", component: CartPage },
  {
    path: "/shipping",
    name: "Shipping",
    component: ShippingInformation,
  },
  {
    path: "/payment",
    name: "/Payment",
    component: PaymentPage,
  },
  { path: "/checkout", name: "/Checkout", component: Checkout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
