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
import AdminLayout from "@/layouts/AdminLayout.vue";
import Orders from "@/views/admin/Orders.vue";
import Products from "@/views/admin/Products.vue";
import Users from "@/views/admin/Users.vue";
import AddProduct from "@/views/admin/AddProduct.vue";
import Commercial from "@/views/admin/Commercial.vue";
import Messages from "@/views/admin/Messages.vue";
import AboutAdmin from "@/views/admin/AboutAdmin.vue";
import Admin from "@/features/admin/pages/Admin.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "shop", name: "Shop", component: Shop },
      { path: "contact", name: "Contact", component: Contact },
      { path: "about", name: "About", component: About },
      { path: "recipes", name: "Recipes", component: Recipes },
      {
        path: "spice/:id",
        name: "SpiceDetail",
        component: () => import("@/views/SpiceDetail.vue"),
        props: true,
      },
      { path: "cart", name: "Cart", component: CartPage },
      {
        path: "shipping",
        name: "Shipping",
        component: ShippingInformation,
      },
      {
        path: "payment",
        name: "Payment",
        component: PaymentPage,
      },
      { path: "checkout", name: "Checkout", component: Checkout },
    ],
  },
  {
    path: "/admin",
    componet: AdminLayout,
    children: [
      {
        path: "",
        component: Admin,
      },
    ],
  },
  { path: "/checkout", name: "/Checkout", component: Checkout },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", redirect: "/admin/orders" },
      { path: "orders", name: "Orders", component: Orders },
      { path: "products", name: "Products", component: Products },
      { path: "users", name: "Users", component: Users },
      { path: "/addProduct", name: "Add Product", component: AddProduct },
      { path: "commercial", name: "Commercial", component: Commercial },
      { path: "messages", name: "Messages", component: Messages },
      {
        path: "/admin/messages/:id",
        name: "MessageDetail",
        component: () => import("@/views/admin/MessageDetail.vue"),
      },
      { path: "about", name: "About", component: AboutAdmin },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
