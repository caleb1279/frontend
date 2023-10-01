import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import ErrorNotFound from "@/components/ErrorNotFound.vue";
import HomePage from "@/components/HomePage.vue";
import ReportCrud from "@/components/ReportCrud.vue";
import ProjectCrud from "@/components/ProjectCrud.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      {
        path: "/report",
        name: "ReportCrud",
        component: ReportCrud,
      },
      {
        path: "/project",
        name: "ProjectCrud",
        component: ProjectCrud,
      },
    ],
  },
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
