import router from "@/router";
import axios from "axios";
import type { ticket } from "@/registerDataType";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL_SERVICE,
  headers: {},
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
  /* Login(json: { email: string; password: string }) {
    return request.get(
      "/users/login/" +
        encodeURIComponent(json.email) +
        "/" +
        encodeURIComponent(json.password)
    );
    return request.get("/users/login/"+encodeURIComponent(json.email)+"/"+encodeURIComponent(json.password));
  Login(json: { email: string; password: string }) {
    return request.get("/users/login/"+encodeURIComponent(json.email)+"/"+encodeURIComponent(json.password));
  },
  async getActivities() {
    try {
      const data = await request.get("/activities/all");
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getProjects(user: number) {
    try {
      const data = await request.get("/projects/all/" + user);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getUsers() {
    try {
      const data = await request.get("/users/all");
      return data.data;
    } catch (error) {
      console.log(error);
      console.log(error);
      return null;
    }
  },
  async getReports(user: number, date: Date) {
    try {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const vari =
        "/reports/" +
        user +
        "/" +
        encodeURIComponent(firstDay.toISOString().substring(0, 10)) +
        "/" +
        encodeURIComponent(lastDay.toISOString().substring(0, 10));
      const data = await request.get(vari);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async sendReport(report: report) {
    console.log(report);
    try {
      const data = await request.post("/reports/writereport", report);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteReport(id: number) {
    try {
      const data = await request.get("/reports/deletereport/" + id);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, */
  async getTickets() {
    try {
      const data = await request.get("/tickets/incidents");
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async createTicket(id: number, subject: string, description: string) {
    try {
      const data = await request.get(
        "/tickets/incidents/create/" +
          id +
          "/" +
          encodeURIComponent(subject) +
          "/" +
          encodeURIComponent(description)
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getValidStatuses() {
    try {
      const data = await request.get("/tickets/incidents/statuses");
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async updateTicketStatus(ticket: ticket, newStatus: string) {
    try {
      const data = await request.get(
        "/tickets/incidents/changestatus/" +
          ticket.incident.ticket +
          "/" +
          newStatus
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getIncidentTicket(seacrh: string) {
    try {
      const data = await request.get("tickets/incidents?ticket=" + seacrh);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
