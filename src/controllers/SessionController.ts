import { useStorage } from "vue3-storage";
import router from "@/router";
import type { user } from "@/registerDataType";
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

const storage = useStorage();
const secureKey = "" + process.env.VUE_APP_STORAGE_KEY;

export default {
  Login(token: string, data: user) {
    storage.setStorageSync("Authorization", token);
    let plaintext = JSON.stringify(data);
    let cipher = CryptoAES.encrypt(plaintext.toString(), secureKey);
    storage.setStorageSync("UserData", cipher.toString());
    router.push("/");
  },
  Logout() {
    storage.clearStorageSync();
    router.push("/login");
  },
  validateSession() {
    try {
      return storage.getStorageSync("Authorization").length > 0;
    } catch {
      return false;
    }
  },
  getUserData() {
    if (this.validateSession()) {
      let cipher = CryptoAES.decrypt(""+storage.getStorageSync("UserData"), secureKey);
      let data = JSON.parse(cipher.toString(CryptoENC));
      return data;
    } else {
      return {} as user;
    }
  },
};
