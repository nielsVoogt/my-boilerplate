const fb = require("@/firebaseConfig.js");

import { createLogger, createStore } from "vuex";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const initialState = () => {
  return {
    user: null,
    userData: null,
  };
};

export const store = createStore({
  state: initialState(),
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
});

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_USER", user);
    store.dispatch("fetchUserDataAction", user.uid);
  } else {
    store.commit("SET_INITIAL_STATE", initialState());
  }
});
