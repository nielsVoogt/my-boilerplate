import "./registerServiceWorker";

import App from "./App.vue";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { en } from "./locales/en";
import { nl } from "./locales/nl";
import router from "./router";
import store from "./store";

const fb = require("./firebaseConfig.js");

const i18n = createI18n({
  locale: "nl",
  messages: { nl, en },
});

let app;

fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(i18n);
    app.mount("#app");
  }
});
