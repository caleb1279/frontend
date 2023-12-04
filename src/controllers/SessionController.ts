import { useStorage } from "vue3-storage";
//import { useCookies } from "vue3-cookies";
import router from "@/router";
import type { user } from "@/registerDataType";

const storage = useStorage();
//const { cookies } = useCookies; cookies.get | cookies.set

export default {
  Login(token: string, data: user) {
    storage.setStorageSync("Authorization", token, 4000);
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
};
