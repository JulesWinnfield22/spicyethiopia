import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import modalx from "@customizer/modal-x";
import vRipple from "@/directives/vRipple";
import vFocus from "@/directives/vFocus";
import { createApp } from "vue";
import { createPinia } from "pinia";
import toast from '@/toast'

import App from "./App.vue";
import router from "./router";
const pinia = createPinia()

const app = createApp(App);

library.add(fas);

app.use(pinia);
app.directive("ripple", vRipple);
app.directive("focus", vFocus);
app.component("fas", FontAwesomeIcon);
app.use(router);
app.use(toast)
app.use(modalx);
app.mount("#app");
