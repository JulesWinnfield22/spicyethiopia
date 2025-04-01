import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

library.add(fas);
app.component("fas", FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
