import { createRouter, createWebHistory } from "vue-router";

// import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Login.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/auth",
    component: () => import("../layouts/Auth.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      },
      {
        path: "/registration",
        name: "Registration",
        component: () =>
          import(
            /* webpackChunkName: "registration" */ "../views/Registration.vue"
          ),
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () =>
          import(
            /* webpackChunkName: "resetPassword" */ "../views/ResetPassword.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
