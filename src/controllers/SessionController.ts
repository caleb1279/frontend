import { useStorage } from "vue3-storage";
import { useCookies } from "vue3-cookies";
import router from "@/router";
import type { user } from "@/registerDataType";
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "1h",
});

const storage = useStorage();
const { cookies } = useCookies(); // cookies.get(key) | cookies.set(key, value)

export default {
  Login(token: string, data: user) {
    storage.setStorageSync("Authorization", token);
    storage.setStorageSync("userdata", JSON.stringify(data));
    router.push("/");
  },
  Logout() {
    storage.removeStorageSync("Authorization");
    storage.removeStorageSync("userdata");
    cookies.remove("projectlist");
    cookies.remove("reportlist");
    cookies.remove("activitylist");
    router.push("/login");
  },
  ValidateSesison() {
    try {
      return storage.getStorageSync("Authorization").length > 0;
    } catch {
      return false;
    }
  },
  getUserData() {
    const data = storage.getStorageSync("userdata");
    return JSON.parse(data);
  },

  setLocals(key: string, value: any) {
    if (value === null || value === undefined) {
      return;
    }

    cookies.set(key, JSON.stringify(value));
  },

  getLocals(key: string) {
    if (key === "") {
      return null;
    }

    try {
      const data = cookies.get(key);
      return JSON.parse(data);
    } catch {
      return null;
    }
  },
};
