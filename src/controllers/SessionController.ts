import { useStorage } from "vue3-storage";
import { useCookies } from "vue3-cookies";
import router from "@/router";
import type { user } from "@/registerDataType";
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "1h",
});

const storage = useStorage();
const cookies = useCookies(); // cookies.get(key) | cookies.set(key, value)

export default {
  Login(token: string, data: user) {
    storage.setStorageSync("Authorization", token);
    storage.setStorageSync("userdata", data);
    router.push("/");
  },
  Logout() {
    storage.removeStorageSync("Authorization");
    storage.removeStorageSync("userdata");
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
    return storage.getStorageSync("userdata");
  },

  setLocals(key: string, value: string) {
    if (value === "" || key === "") {
      return;
    }

    cookies.cookies.set(key, value);
  },

  getLocals(key: string) {
    if (key === "") {
      return null;
    }

    try {
      const data = cookies.cookies.get(key);
      return data;
    } catch {
      return null;
    }
  },
};
