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
import SimpleTypeahead from "vue3-simple-typeahead/src/vue3-simple-typeahead.vue";
import Particles from "vue3-particles";
import VueApexCharts from "vue3-apexcharts";
import { VueReCaptcha } from "vue-recaptcha-v3";
import { ReCaptchaInstance } from "recaptcha-v3";
import * as dotenv from "dotenv";

import {
  faClock,
  faEye,
  faEyeSlash,
  faBell,
  faHome,
  faChartLine,
  faRightFromBracket,
  faListCheck,
  faPen,
  faTrash,
  faPlus,
  faUsers,
  faGears,
  faArrowTrendUp,
  faTimeline,
  faUsersGear,
  faCalendar,
  faLessThan,
  faGreaterThan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/main.scss";

const app = createApp(App);

library.add(
  faClock,
  faArrowTrendUp,
  faEye,
  faEyeSlash,
  faBell,
  faHome,
  faChartLine,
  faRightFromBracket,
  faListCheck,
  faPen,
  faTrash,
  faPlus,
  faUsers,
  faGears,
  faTimeline,
  faUsersGear,
  faArrowTrendUp,
  faCalendar,
  faLessThan,
  faGreaterThan,
  faUserPlus
);

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $recaptcha: (action: string) => Promise<string>
    $recaptchaLoaded: () => Promise<boolean>
    $recaptchaInstance: ReCaptchaInstance
  }
}

app.use(BootstrapVue3);
app.use(Axios, axios);
app.use(Particles);
app.use(VueApexCharts);
app.use(VueReCaptcha, {
  siteKey: "" + process.env.VUE_APP_CAPTCHA_TOKEN,
  loaderOptions: {
    useRecaptchaNet: true,
  },
});
app.use(Vue3Storage, { namespace: "pro_", storage: StorageType.Local });
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("date-picker", Datepicker);
app.component("vue3-simple-typeahead", SimpleTypeahead);
app.use(router).mount("#app");
