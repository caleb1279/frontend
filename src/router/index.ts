import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import ErrorNotFound from "@/components/ErrorNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error404",
    component: ErrorNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
