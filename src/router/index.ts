import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
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
import Orders from "@/features/admin/pages/Orders.vue";
import Products from "@/views/admin/Products.vue";
import Users from "@/features/admin/pages/Users.vue";
import AddProduct from "@/views/admin/AddProduct.vue";
import Commercial from "@/views/admin/Commercial.vue";
import Messages from "@/views/admin/Messages.vue";
import AboutAdmin from "@/views/admin/AboutAdmin.vue";
import Admin from "@/features/admin/pages/Admin.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import Login from "@/features/admin/pages/Login.vue";
import { useAuth } from "@/features/admin/store/authStore";
import { isTokenExpired } from "@/utils/utils";
import EditProduct from "@/views/admin/EditProduct.vue";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    roles?: string[];
    permissions?: string[];
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: Login,
  },
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
  { path: "/checkout", name: "/Checkout", component: Checkout },
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: "", redirect: "/admin/orders" },
      { path: "orders", name: "Orders", component: Orders },
      { path: "products", name: "Products", component: Products },
      { path: "users", name: "Users", component: Users },
      { path: "addProduct", name: "Add Product", component: AddProduct },
      {
        path: "product/edit/:productId",
        name: "Edit Product",
        component: EditProduct,
      },
      { path: "commercial", name: "Commercial", component: Commercial },
      { path: "messages", name: "Messages", component: Messages },
      {
        path: "messages/:id",
        name: "MessageDetail",
        component: () => import("@/views/admin/MessageDetail.vue"),
      },
      { path: "about", name: "Admin About", component: AboutAdmin },
    ],
  },
];

const router = createRouter({
  scrollBehavior: (to, from, savedPosition) => {
    return {
      top: 0,
    };
  },
  history: createWebHistory(),
  routes,
});

const authGuard = (to: RouteLocationNormalized): boolean | { path: string } => {
  const auth = useAuth();
  const storedUser = localStorage.getItem("spicy_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return { path: "/login" };
  }

  if (user.token && isTokenExpired(user.token)) {
    localStorage.removeItem("spicy_user");
    auth.setAuth(undefined);
    return { path: "/login" };
  }

  auth.setAuth(user);
  return true;
};

const roleGuard = (to: RouteLocationNormalized): boolean | { path: string } => {
  const auth = useAuth();
  const requiredRoles = to.meta.roles;

  if (!requiredRoles) return true;

  const hasRequiredRole = requiredRoles.some((role) =>
    auth.auth?.roles?.find((el) => el.name == role)
  );

  return !!hasRequiredRole || { path: "/login" };
};

const permissionGuard = (
  to: RouteLocationNormalized
): boolean | { path: string } => {
  const auth = useAuth();
  const requiredPermissions = to.meta.permissions;

  if (!requiredPermissions) return true;

  const hasRequiredPermission = requiredPermissions.some((permission) =>
    auth.auth?.roles.find((role) => {
      return role.permissions.find((per) => per.name == permission);
    })
  );

  return !!hasRequiredPermission || { path: "/login" };
};

const guardPipeline = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  if (!to.meta.requiresAuth) {
    if (to.path === "/login") {
      const auth = useAuth();
      const storedUser = localStorage.getItem("spicy_user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      auth.setAuth(user);
      if (user && !isTokenExpired(user.token)) {
        return { path: "/admin" };
      }
    }
    return true;
  }

  const guards = [authGuard, roleGuard, permissionGuard];

  for (const guard of guards) {
    const result = guard(to);
    if (result !== true) return result;
  }

  return true;
};

router.beforeEach(guardPipeline);

router.onError((error) => {
  console.error("Router error:", error);
  // const auth = useAuth();

  // if (error.message.includes('Authentication')) {
  //   auth.setAuth(undefined);
  //   localStorage.removeItem('spicy_user');
  //   router.push('/login');
  // }
});

export default router;
