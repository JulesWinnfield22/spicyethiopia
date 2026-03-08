import toast from "~/toast/toast";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.use(toast);
  }
});
