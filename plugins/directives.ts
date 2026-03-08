import vRipple from "~/directives/vRipple";
import vFocus from "~/directives/vFocus";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("ripple", vRipple);
  nuxtApp.vueApp.directive("focus", vFocus);
});
