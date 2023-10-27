<template>
  <div>
    <div class="column-left">
      <form
        class="login-form needs-validation"
        id="form"
        v-on:submit.prevent="login"
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
              placeholder="johndoe@example.com"
              @input="validateFields('username')"
              :class="{
                'is-valid': validFields.includes('username'),
                'is-invalid': !validFields.includes('username'),
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
              v-model="passwd"
              name="password"
              placeholder="**********"
              @input="validateFields('password')"
              :class="{
                'is-valid': validFields.includes('password'),
                'is-invalid': !validFields.includes('password'),
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
import session from "@/controllers/SessionController";
/* import RequestController from "@/controllers/RequestController";
import { AxiosError, AxiosResponse } from "axios"; */

export default class LoginForm extends Vue {
  msg = "";
  passwordIcon = "eye";
  uname!: string;
  passwd!: string;
  validFields: string[] = [];

  data() {
    return { validFields: this.validFields };
  }

  login() {
    session.Login("auth-1234");
    /*RequestController.Login({ email: this.uname, password: this.passwd })
      .then((data: AxiosResponse) => {
        if (data.data.status === "200") {
          this.$storage.setStorageSync(
            "Authorization",
            data.data.Authorization
          );
          this.$router.push("/");
        } else {
          this.msg = data.data.message;
        }
        console.log(data);
      })
      .catch((error: AxiosError) => {
        this.msg = error.message;
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
</style>
