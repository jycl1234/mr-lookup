import Vue from "vue";
import VueRouter from "vue-router";
import Lookup from "../components/Lookup";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "Lookup",
    component: Lookup
  }
];

const router = new VueRouter({
  routes,
  mode: "hash"
});

export default router;
