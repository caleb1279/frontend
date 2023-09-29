import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { BootstrapVue3 } from "bootstrap-vue-3";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Axios from "vue-axios";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/main.scss";

const app = createApp(App);

library.add(faEye, faEyeSlash);

app.use(BootstrapVue3);
app.use(Axios, axios);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router).mount("#app");
