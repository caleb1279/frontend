import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { BootstrapVue3 } from "bootstrap-vue-3";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Axios from "vue-axios";
import axios from "axios";
import Vue3Storage, { StorageType } from "vue3-storage";
import Datepicker from "vue3-datepicker";

import {
  faEye,
  faEyeSlash,
  faBell,
  faHome,
  faChartLine,
  faRightFromBracket,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/scss/main.scss";
import "bootstrap/dist/js/bootstrap.bundle.js";

const app = createApp(App);

library.add(
  faEye,
  faEyeSlash,
  faBell,
  faHome,
  faChartLine,
  faRightFromBracket,
  faListCheck
);

app.use(BootstrapVue3);
app.use(Axios, axios);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(Vue3Storage, { namespace: "pro_", storage: StorageType.Local });

app.use(router).mount("#app");
