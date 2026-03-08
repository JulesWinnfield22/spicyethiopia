import { useAuth } from "~/features/admin/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  const user = useCookie<any>("auth_user");
  console.log("Auth Middleware:", {
    path: to.path,
    hasUser: !!user.value,
    storeAuth: !!auth.auth,
  });

  const isLoggedIn = !!(auth.auth || user.value);

  console.log("Auth Middleware Check:", {
    path: to.path,
    isLoggedIn,
    hasUserCookie: !!user.value,
    hasStoreAuth: !!auth.auth,
  });

  // 1. Handle Login Page Redirection (If already logged in)
  if (to.path === "/login") {
    if (isLoggedIn) {
      console.log("Already logged in, redirecting to admin");
      return navigateTo("/admin/orders");
    }
    return;
  }

  // 2. Handle Admin Route Protection
  if (to.path.startsWith("/admin")) {
    if (!isLoggedIn) {
      console.log("Not logged in, redirecting to login");
      // Clear invalid session
      auth.setAuth(null);
      return navigateTo("/login");
    }

    // Sync store if not already set (e.g. after refresh)
    if (!auth.auth && user.value) {
      console.log("Syncing store from cookie");
      auth.setAuth(user.value);
    }
  }
});
