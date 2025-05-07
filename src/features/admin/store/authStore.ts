import type { User } from "@/interface";
import { defineStore } from "pinia";
import { ref } from "vue";

interface LoggedInUser extends User {
  token: string;
}
export const useAuth = defineStore("auhtStore", () => {
  const auth = ref<LoggedInUser | null>();

  function setAuth(data?: LoggedInUser) {
    auth.value = data;
  }
  return { auth, setAuth };
});
