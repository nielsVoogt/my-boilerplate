const getters = {
  user(state) {
    return state.user;
  },
  userData(state) {
    return state.userData;
  },
  isUserAuth(state) {
    return !!state.user;
  },
};

export default getters;
