import "./registerServiceWorker";

import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import store from "./store";

const fb = require("./firebaseConfig.js");

let app;

fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.mount("#app");
  }
});
