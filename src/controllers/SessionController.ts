import { useStorage } from "vue3-storage";
import { useCookies } from "vue3-cookies";
import router from "@/router";
import type { user } from "@/registerDataType";

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
    storage.removeStorageSync("appdata");
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

    if (data !== undefined && data !== null) {
      return JSON.parse(data);
    } else {
      return undefined;
    }
  },

  setLocals(value: any) {
    try {
      storage.setStorageSync("appdata", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  },

  getLocals() {
    try {
      const data = storage.getStorageSync("appdata");
      return JSON.parse(data);
    } catch {
      return undefined;
    }
  },

  setCookie(key: string, value: string, expire: string | number = "1h") {
    cookies.set(key, value, expire);
  },

  getCookie(key: string) {
    return cookies.get(key);
  },

  clearCookie(key: string) {
    cookies.remove(key);
  },
};
