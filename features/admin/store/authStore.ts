import type { User } from "~/interface";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookie } from "#app";

interface LoggedInUser extends User {
  token?: string;
}

export const useAuth = defineStore("authStore", () => {
  const userCookie = useCookie<LoggedInUser | null>("auth_user", {
    path: "/",
  });
  const auth = ref<LoggedInUser | null>(userCookie.value || null);

  function setAuth(data?: LoggedInUser | null) {
    auth.value = data || null;
    userCookie.value = data || null;
  }

  return { auth, setAuth };
});
