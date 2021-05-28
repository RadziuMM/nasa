import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/apod",
    name: "APOD",
    component: () => import("../views/APOD.vue")
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../views/Gallery.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
