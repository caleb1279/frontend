import router from "@/router";
import axios from "axios";
import { useStorage } from "vue3-storage";
import type { user } from "@/registerDataType";

const storage = useStorage();

const request = axios.create({
  baseURL: "http://192.168.1.28:8082",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
    AccessControlAllowOrigin: "*",
    Authorization: storage.getStorageSync("Authorization") || "",
  },
});

request.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const { status } = error.response;
    if (status == 403) router.push("/error404");
    return Promise.reject(error);
  }
);

export default {
  Login(json: user) {
    return request.post("/login", json);
  },
  getActivities() {
    return request.get("/activities");
  },
  getProjects(user: number) {
    return request.get("/projects/" + user);
  },
};
