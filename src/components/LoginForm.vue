<template>
  <div>
    <div class="column-left">
      <form
        class="login-form needs-validation"
        id="form"
        v-on:submit.prevent="recaptcha()"
      >
        <div class="children-login-form">
          <div class="image-logo text-center">
            <img src="/img/logo.png" />
          </div>
          <div class="text-center m-6">
            <h1>Bienvenido, por favor ingrese sus datos</h1>
            <p class="in-alert">{{ msg }}</p>
          </div>
          <div class="input-group has-validation">
            <label class="col-form-label" for="username">
              Correo Electrónico:
            </label>
            <input
              class="form-control shadow-none"
              type="email"
              id="username"
              v-model="uname"
              name="username"
              autocomplete="email"
              placeholder="johndoe@example.com"
              @input="validateFields('username')"
              :class="{
                'is-valid': validFields.includes('username'),
                'is-invalid':
                  !validFields.includes('username') &&
                  validatedFields.includes('username'),
              }"
              required
            />
          </div>
          <div class="input-group has-validation">
            <label class="col-form-label" for="password">Contraseña:</label>
            <input
              class="form-control shadow-none"
              type="password"
              id="password"
              autocomplete="current-password"
              v-model="passwd"
              name="password"
              placeholder="**********"
              @input="validateFields('password')"
              :class="{
                'is-valid': validFields.includes('password'),
                'is-invalid':
                  !validFields.includes('password') &&
                  validatedFields.includes('password'),
              }"
              required
            />
            <span
              class="btn btn-outline-secondary"
              v-on:click.prevent="viewPassword"
            >
              <font-awesome-icon :icon="passwordIcon" class="password-icon" />
            </span>
          </div>
          <input
            class="btn btn-primary"
            type="submit"
            id="submit"
            name="login"
            value="login"
          />
          <div class="text-center p-3">
            <a href="#" v-on:click.prevent="">
              <b>¿Olvidó su contraseña?</b>
            </a>
          </div>
          <div class="text-center">
            <hr />
          </div>
          <br />
          <!--button class="btn google-btn" @click.prevent="signInWithGoogle">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Logo"
            />
            <span>Continuar con Google</span>
          </button-->
          <GoogleLogin :callback="signInWithGoogle" auto-login />
        </div>
      </form>
    </div>
    <div class="column-right">
      <img src="/img/hacker-man-laptop.png" class="right-cover-image" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
/* import RequestController from "@/controllers/RequestController";
import { AxiosError, AxiosResponse } from "axios";
import CryptoJS from "crypto-js"; */
import session from "@/controllers/SessionController";
import { GoogleLogin } from "vue3-google-login";
import { googleOneTap } from "vue3-google-login";
//import { google } from "googleapis";

export default class LoginForm extends Vue {
  msg = "";
  passwordIcon = "eye";
  uname!: string;
  passwd!: string;
  validFields: string[] = [];
  validatedFields: string[] = [];

  async recaptcha() {
    await this.$recaptchaLoaded();
    const token = await this.$recaptcha("login");
    this.login(token);
  }

  async signInWithGoogle(response: any) {
    if (response.credential) {
      session.LoginWithGoogle(response.credential);
    } else {
      console.log("google login error");
    }
  }

  data() {
    return {
      uname: this.uname,
      passwd: this.passwd,
    };
  }

  login(token: string) {
    this.msg = "not supported for now";
    console.log(token);
    /* RequestController.Login({
      email: this.uname,
      password: CryptoJS.SHA256(this.passwd).toString(CryptoJS.enc.Hex),
    })
      .then((data: AxiosResponse) => {
        if (data.status === 200) {
          session.Login(token, data.data);
        } else {
          this.msg = data.data.Error;
        }
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          this.msg = (error.response.data as { Error: string }).Error;
        } else {
          this.msg = "Usuario o Contraseña Incorrectos";
        }
      }); */
  }

  viewPassword() {
    let password = document.getElementById(
      "password"
    ) as HTMLInputElement | null;
    if (password) {
      password.type = password.type === "text" ? "password" : "text";
      this.passwordIcon = password.type === "text" ? "eye" : "eye-slash";
    }
  }

  validateFields(input: string) {
    if (!this.validatedFields.includes(input)) this.validatedFields.push(input);
    const field = document.getElementById(input) as HTMLInputElement;
    if (field === null) return;

    if (field.checkValidity()) {
      if (!this.validFields.includes(input)) this.validFields.push(input);
    } else {
      if (this.validFields.includes(input)) {
        const index = this.validFields.indexOf(input);
        this.validFields.splice(index, 1);
      }
    }
  }

  mounted(): void {
    googleOneTap({ autoLogin: true })
      .then((response) => {
        session.LoginWithGoogle(response.credential);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  beforeCreate(): void {
    if (session.validateSession()) {
      this.$router.push("/");
    }
  }
}
</script>

<style scoped lang="scss">
label {
  text-align: left;
}

h1 {
  font-size: medium;
}

.column-left {
  margin: 0;
  width: 50%;
  height: 100%;
}

.image-logo {
  max-width: 300px;
  margin-bottom: 18px;
}

.google {
  display: block;
}
</style>
