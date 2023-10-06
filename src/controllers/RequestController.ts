import router from "@/router";
import axios from "axios";

const request = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
    AccessControlAllowOrigin: "*",
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
  Login(json: { email: string; password: string }) {
    return request.post("/login", json);
  },
  SetTokenBearer(token: string) {
    request.defaults.headers.common["Authorization"] = "Bearer " + token;
  },
  GetInitData() {
    return request.get("/users");
  },
};
