const fb = require("@/firebaseConfig.js");

import actions from "./actions";
import { createStore } from "vuex";
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
  mutations,
  actions,
  getters,
});

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_USER", user);
    store.dispatch("fetchUserDataAction", user.uid);
  } else {
    store.commit("SET_INITIAL_STATE", initialState());
  }
});
