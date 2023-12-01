import router from "@/router";
import axios from "axios";
import { useStorage } from "vue3-storage";
import type { user } from "@/registerDataType";

const storage = useStorage();

const request = axios.create({
  baseURL: "https://c025-186-84-89-185.ngrok-free.app",
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
    if (error.response) {
      const { status } = error.response;
      if (status == 403) router.push("/error404");
      return Promise.reject(error);
    }
  }
);

export default {
  Login(json: user) {
    return request.post("/login", json);
  },
  async getActivities() {
    try {
      const data = await request.get("/activities");
      return data.data.activities;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getProjects(user: number) {
    try {
      const data = await request.get("/projects/" + user);
      return data.data.projects;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getReports(user: number, date: Date) {
    try {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const data = await request.get(
        "/reports/" +
          user +
          "/" +
          firstDay.toISOString() +
          "/" +
          lastDay.toISOString()
      );
      return data.data.reports;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
