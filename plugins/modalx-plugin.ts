import modal from "@customizer/modal-x";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(modal);
});
