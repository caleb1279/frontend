//ruta
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
//componentes
import LoginForm from "@/components/LoginForm.vue";
import ErrorNotFound from "@/components/ErrorNotFound.vue";
import HomePage from "@/components/HomePage.vue";
import ReportCrud from "@/components/ReportCrud.vue";
import ProjectCrud from "@/components/ProjectCrud.vue";
import AdminProfile from "@/components/AdminProfile.vue";
//sesiones
import session from "@/controllers/SessionController";

const authExceptions: Array<string> = ["ErrorNotFound", "Login"];

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
      {
        path: "/admin",
        name: "AdminProfile",
        component: AdminProfile,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorNotFound",
    component: ErrorNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to) => {
  const authenticated = session.ValidateSesison();
  if (!authenticated && !authExceptions.includes(String(to.name))) {
    router.push("/login");
  }
});

export default router;
