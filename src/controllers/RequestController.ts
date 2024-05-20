import router from "@/router";
import axios from "axios";
import type { report } from "@/registerDataType";
import { useStorage } from "vue3-storage";

const storage = useStorage();

const request = axios.create({
  baseURL: "https://4233-186-84-89-254.ngrok-free.app",
  withCredentials: false,
  headers: {
    Accept: "*/*",
    //ContentType: "application/json",
    //AccessControlAllowOrigin: "*",
    //Authorization: storage.getStorageSync("Authorization") || "",
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
  Login(json: { email: string; password: string }) {
    return request.get("/users/login/"+json.email+"/"+json.password);
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
  async getUsers() {
    try {
      const data = await request.get("/users/all");
      return data.data.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, 
  async getReports(user: number, date: Date) {
    try {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let vari = "/reports/" +
      user +
      "/" +
      firstDay.toISOString().substring(0, 10) +
      "/" +
      lastDay.toISOString().substring(0, 10);
      const data = await request.get(vari);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async sendReport(report: report) {
    try {
      const data = await request.post("/writereport", report);
      return data.status;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteReport(id: number) {
    try {
      const data = await request.delete("/deletereport/"+id);
    } catch (error) {
      console.log(error);
    }
  }
};
