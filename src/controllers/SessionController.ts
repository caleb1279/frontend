import { useStorage } from "vue3-storage";
import router from "@/router";
import type { user, googleUserData, rol } from "@/registerDataType";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";
import { decodeCredential } from "vue3-google-login";

const storage = useStorage();
const secureKey = "" + process.env.VUE_APP_STORAGE_KEY;

export default {
  async LoginWithGoogle(credential: string) {
    const userData = decodeCredential(credential) as googleUserData;
    const user = {
      id: 1,
      personalEmail: userData.email,
      password: "",
      tipId: 1,
      numId: 1,
      vacationDays: 0,
      startContract: new Date(),
      finishContract: new Date(),
      rol: {} as rol,
      status: "",
      minimumReportDate: new Date(),
      phone: 1,
      phone2: 1,
      emergencyPhone: 1,
      emergencyContact: "",
      relationshipContact: "",
      birthday: new Date(),
      address: "",
      workPosition: "",
      email: userData.email,
      name: userData.given_name,
      lastName: userData.family_name,
      profilePicture: userData.picture,
    } as user;
    storage.setStorageSync("Authorization", credential);
    const plaintext = JSON.stringify(user);
    const cipher = CryptoAES.encrypt(plaintext.toString(), secureKey);
    storage.setStorageSync("UserData", cipher.toString());
    router.push("/");
  },
  Login(token: string, data: user) {
    storage.setStorageSync("Authorization", token);
    const plaintext = JSON.stringify(data);
    const cipher = CryptoAES.encrypt(plaintext.toString(), secureKey);
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
      const cipher = CryptoAES.decrypt(
        "" + storage.getStorageSync("UserData"),
        secureKey
      );
      const data = JSON.parse(cipher.toString(CryptoENC));
      return data;
    } else {
      return {} as user;
    }
  },
};
