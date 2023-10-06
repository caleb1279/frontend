import { useStorage } from "vue3-storage";
import router from "@/router";

const storage = useStorage();

export default {
  Login(token: string) {
    storage.setStorageSync("Authorization", token);
    router.push("/");
  },
  Logout() {
    storage.removeStorageSync("Authorization");
    router.push("/login");
  },
  ValidateSesison() {
    try {
      return storage.getStorageSync("Authorization").length > 0;
    } catch {
      return false;
    }
  },
};
