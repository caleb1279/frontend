<template>
  <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form class="modal-form" v-on:submit.prevent="" novalidate>
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ opccrud }} de Usuario
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              v-on:click="clearModal()"
            ></button>
          </div>
          <div class="modal-body">
            <p class="titulo datosPersonales">
              <span>Datos Personales</span>
            </p>
            <!--Nombre de usuario-->
            <div class="row datosPersonales">
              <div class="col-md-6">
                <label for="name">Nombre:</label>
                <input
                  v-model="newUser.userName"
                  class="form-control shadow-none"
                  type="text"
                  id="userName"
                  :class="{
                    'is-valid': validFields.includes('userName'),
                    'is-invalid':
                      !validFields.includes('userName') &&
                      validatedFields.includes('userName'),
                  }"
                  @input="
                    validateFields('userName', newUser.userName.length > 0)
                  "
                />
                <div class="valid-feedback text-left">¡Se ve bien!</div>
                <div class="invalid-feedback text-left">
                  Por favor diligencia este campo
                </div>
              </div>
              <div class="col-md-6">
                <label for="lastN">Apellidos:</label>
                <input
                  v-model="newUser.userLastN"
                  class="form-control shadow-none"
                  type="text"
                  id="userLastN"
                  :class="{
                    'is-valid': validFields.includes('userLastN'),
                    'is-invalid':
                      !validFields.includes('userLastN') &&
                      validatedFields.includes('userLastN'),
                  }"
                  @input="
                    validateFields('userLastN', newUser.userLastN.length > 0)
                  "
                />
                <div class="valid-feedback text-left">¡Se ve bien!</div>
                <div class="invalid-feedback text-left">
                  Por favor diligencia este campo
                </div>
              </div>
            </div>
            <!--Email personal-->
            <div class="row datosPersonales">
              <div class="total-row form-group">
                <label for="perEmail">Email Personal:</label>
                <input
                  type="email"
                  class="form-control shadow-none"
                  v-model="newUser.perEmail"
                  id="perEmail"
                  :class="{
                    'is-valid': validFields.includes('perEmail'),
                    'is-invalid':
                      !validFields.includes('perEmail') &&
                      validatedFields.includes('perEmail'),
                  }"
                  @input="validateFields('user', newUser.perEmail.length > 0)"
                />
                <div class="valid-feedback text-left">¡Se ve bien!</div>
                <div class="invalid-feedback text-left">
                  Por favor diligencia este campo
                </div>
              </div>
            </div>
            <!--Telefonos-->
            <div class="row datosPersonales">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone1">Telefono 1:</label>
                  <input
                    v-model="newUser.phone1"
                    class="form-control shadow-none"
                    type="text"
                    id="phone1"
                    :class="{
                      'is-valid': validFields.includes('phone1'),
                      'is-invalid':
                        !validFields.includes('phone1') &&
                        validatedFields.includes('phone1'),
                    }"
                    @input="validateFields('phone1', newUser.phone1.length > 0)"
                  />
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone2">Telefono 2:</label>
                  <input
                    v-model="newUser.phone2"
                    class="form-control shadow-none"
                    type="text"
                    id="phone2"
                  />
                </div>
              </div>
            </div>
            <!--Cumpleaños-->
            <div class="row datosPersonales">
              <div class="total-row form-group">
                <label for="birthday">Fecha de nacimiento:</label>
                <date-picker
                  v-model="newUser.birthday"
                  class="form-control shadow-none"
                  id="birthday"
                  inputFormat="yyyy/MM/dd"
                  :class="{
                    'is-valid': validFields.includes('birthday'),
                    'is-invalid':
                      !validFields.includes('birthday') &&
                      validatedFields.includes('birthday'),
                  }"
                  @blur="validateFields('birthday', newUser.birthday !== '')"
                />
                <div class="valid-feedback">¡Se ve bien!</div>
                <div class="invalid-feedback">
                  Por favor diligencia este campo
                </div>
              </div>
            </div>
            <!--Dirección-->
            <div class="row datosPersonales">
              <div class="total-row form-group">
                <label for="address">Dirección:</label>
                <input
                  v-model="newUser.address"
                  class="form-control shadow-none"
                  type="text"
                  id="address"
                  :class="{
                    'is-valid': validFields.includes('address'),
                    'is-invalid':
                      !validFields.includes('address') &&
                      validatedFields.includes('address'),
                  }"
                  @input="validateFields('address', newUser.address.length > 0)"
                />
                <div class="valid-feedback text-left">¡Se ve bien!</div>
                <div class="invalid-feedback text-left">
                  Por favor diligencia este campo
                </div>
              </div>
            </div>
            <p class="titulo datosPersonales">
              <span>Contacto de Emergencia</span>
            </p>
            <div class="row datosPersonales">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="contact">Nombre:</label>
                  <input
                    v-model="newUser.contact"
                    class="form-control shadow-none"
                    type="text"
                    id="contact"
                    :class="{
                      'is-valid': validFields.includes('contact'),
                      'is-invalid':
                        !validFields.includes('contact') &&
                        validatedFields.includes('contact'),
                    }"
                    @input="
                      validateFields('contact', newUser.contact.length > 0)
                    "
                  />
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone3">Telefono :</label>
                  <input
                    v-model="newUser.phone3"
                    class="form-control shadow-none"
                    type="text"
                    id="phone3"
                    :class="{
                      'is-valid': validFields.includes('phone3'),
                      'is-invalid':
                        !validFields.includes('phone3') &&
                        validatedFields.includes('phone3'),
                    }"
                    @input="validateFields('phone1', newUser.phone3.length > 0)"
                  />
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
            </div>
            <p class="titulo">
              <span>Datos Empresariales</span>
            </p>
            <!--Email empresarial-->
            <div class="row">
              <div class="total-row form-group">
                <label for="email">Email Empresarial:</label>
                <input
                  type="email"
                  class="form-control shadow-none"
                  v-model="newUser.email"
                  id="email"
                  :class="{
                    'is-valid': validFields.includes('email'),
                    'is-invalid':
                      !validFields.includes('email') &&
                      validatedFields.includes('email'),
                  }"
                  @input="validateFields('user', newUser.email.length > 0)"
                />
                <div class="valid-feedback text-left">¡Se ve bien!</div>
                <div class="invalid-feedback text-left">
                  Por favor diligencia este campo
                </div>
              </div>
            </div>
            <!--Status-->
            <div class="row">
              <div class="total-row form-group has-validation">
                <label for="status">Seleccione un estado:</label>
                <select
                  v-model="newUser.status"
                  class="form-select shadow-none"
                  id="status"
                  :class="{
                    'is-valid': validFields.includes('status'),
                    'is-invalid':
                      !validFields.includes('status') &&
                      validatedFields.includes('status'),
                  }"
                  @change="validateFields('status', newUser.status.length > 0)"
                >
                  <option>Inactivo</option>
                  <option>Disponible</option>
                  <option>Vacaciones</option>
                  <option>Permiso</option>
                </select>
              </div>
            </div>
            <!--Rol y cargo-->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group has-validation">
                  <label for="position">Seleccione un Cargo:</label>
                  <select
                    v-model="newUser.position"
                    class="form-select shadow-none"
                    id="position"
                    :class="{
                      'is-valid': validFields.includes('position'),
                      'is-invalid':
                        !validFields.includes('position') &&
                        validatedFields.includes('position'),
                    }"
                    @change="
                      validateFields('position', newUser.position.length > 0)
                    "
                  >
                    <option>Director</option>
                    <option>Coordinador</option>
                    <option>Gerente</option>
                    <option>Desarrollador</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group has-validation">
                  <label for="rol">Seleccione un rol:</label>
                  <select
                    v-model="newUser.rol"
                    class="form-select shadow-none"
                    id="rol"
                    :class="{
                      'is-valid': validFields.includes('rol'),
                      'is-invalid':
                        !validFields.includes('rol') &&
                        validatedFields.includes('rol'),
                    }"
                    @change="validateFields('rol', newUser.rol.length > 0)"
                  >
                    <option>Administrador</option>
                    <option>Usuario</option>
                    <option>Lider de equipo</option>
                  </select>
                </div>
              </div>
            </div>
            <!--Fechas de contrato-->
            <p class="titulo">
              <span>Contrato</span>
            </p>
            <div class="row">
              <div class="col-md-6 form-group">
                <label for="initialDate">Fecha de ingreso:</label>
                <date-picker
                  v-model="newUser.initialDate"
                  class="form-control shadow-none"
                  id="initialDate"
                  inputFormat="yyyy/MM/dd"
                  :class="{
                    'is-valid': validFields.includes('initialDate'),
                    'is-invalid':
                      !validFields.includes('initialDate') &&
                      validatedFields.includes('initialDate'), // cdc otro array para saber si lo ha validado
                  }"
                  @blur="
                    validateFields('initialDate', newUser.initialDate !== null)
                  "
                ></date-picker>
                <div class="valid-feedback">¡Se ve bien!</div>
                <div class="invalid-feedback">
                  Por favor diligencia este campo
                </div>
              </div>
              <div class="col-md-6 form-group">
                <label for="endDate">Fecha de terminación:</label>
                <date-picker
                  v-model="newUser.endDate"
                  class="form-control shadow-none"
                  id="endDate"
                  inputFormat="yyyy/MM/dd"
                ></date-picker>
              </div>
            </div>
            <!--Días habilitados para reportar actividades-->
            <div class="row diaHabilitado">
              <p class="titulo">
                <span>Días habilitados para reportar actividades</span>
              </p>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="minDate">Fecha mínima:</label>
                  <date-picker
                    v-model="newUser.minDate"
                    class="form-control shadow-none"
                    id="minDate"
                    inputFormat="yyyy/MM/dd"
                    :class="{
                      'is-valid': validFields.includes('minDate'),
                      'is-invalid':
                        !validFields.includes('minDate') &&
                        validatedFields.includes('minDate'),
                    }"
                    @blur="validateFields('minDate', newUser.minDate !== '')"
                  />
                  <div class="valid-feedback">¡Se ve bien!</div>
                  <div class="invalid-feedback">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
              <!--fecha limite-->
              <div class="col-md-6">
                <div class="form-group">
                  <label for="maxDate">Fecha máxima:</label>
                  <date-picker
                    v-model="maxDate"
                    class="form-control shadow-none"
                    id="maxDate"
                    inputFormat="yyyy/MM/dd"
                    :disabled="true"
                  />
                  <div class="valid-feedback">¡Se ve bien!</div>
                  <div class="invalid-feedback">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="clearModal()"
            >
              Cerrar
            </button>
            <button
              type="submit"
              class="btn btn-primary btnGuardar"
              id="btnGuardar"
              @click="submitForm"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="maintitle px-4 mt-3">
    <h1>Modulo de administración de usuarios</h1>
  </div>
  <div class="d-flex">
    <div class="left-options">
      <button
        type="submit"
        class="btn btn-primary btn-create"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
        v-on:click="opccrud = 'Creación'"
        v-on:click.prevent="clearModal()"
      >
        <font-awesome-icon icon="plus" /> Crear Usuario
      </button>
    </div>
    <div class="right-search nav">
      <form class="d-flex" role="search" v-on:click.prevent="">
        <input class="form-control me-2 shadow-none" type="search" />
        <button class="btn btn-primary" type="submit" v-on:click.prevent="">
          Buscar
        </button>
      </form>
    </div>
  </div>
  <!--información general a visualizar-->
  <div class="table-contain">
    <table class="table text-left">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Usuarios</th>
          <th scope="col">Email</th>
          <th scope="col">Telefono</th>
          <th scope="col">Cargo</th>
          <th scope="col">Rol</th>
          <th scope="col">Estado</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="user in userList" :key="user.userId">
        <td>
          <img
            class="avatar-rounded"
            with="50"
            height="50"
            :src="getImage(user)"
          />
        </td>
        <td>{{ user.userName }} {{ user.userLastN }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone1 }}</td>
        <td>{{ user.position }}</td>
        <td>{{ user.rol }}</td>
        <td>{{ user.status }}</td>
        <td>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
            v-on:click.prevent="viewUser(user)"
          >
            <font-awesome-icon icon="eye" />
          </a>
        </td>
        <td>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
            v-on:click.prevent="editUser(user)"
          >
            <font-awesome-icon icon="pen" />
          </a>
        </td>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import controllers from "@/controllers/RequestController";
import { Vue } from "vue-class-component";
import type { user } from "@/registerDataType";
export default class userCrud extends Vue {
  newUser: user = {
    userId: NaN,
    userName: "",
    userLastN: "", //apellidos
    email: "", //correo empresarial
    perEmail: "", //correo personal
    minDate: "", // fecha minima para reportar actividades
    rol: "",
    status: "",
    initialDate: "", // fecha de ingreso
    endDate: "", //fecha de terminación de contrato
    phone1: "",
    phone2: "",
    phone3: "", // contacto de emergencia
    birthday: "", //cumpleaños
    address: "", //dirección
    position: "", //cargo en la empresa
    contact: "", //nombre contacto de emergencia
    profileimage: "",
  };
  maxDate!: Date;
  userList!: user[];
  validFields: string[] = [];
  validatedFields: string[] = [];
  requiredFields: string[] = [
    "email",
    "rol",
    "status",
    "initialDate",
    "position",
  ]; // Lista de campos requeridos
  opccrud!: string;
  async beforeMount() {
    this.userList = (await controllers.getUser()) || [
      {
        userId: "39393939",
        userName: "Esteban",
        userLastN: "Rosa",
        rol: "Administrador",
        minDate: "2023/11/11",
        status: "Disponible",
        email: "estebanrosa@empresa.com",
        perEmail: "estebanrosa@personal.com",
        phone1: 3103030303,
        phone2: 3104040404,
        phone3: 3105050505,
        birthday: "1987/06/11",
        address: "calle 1 # 10 - 10",
        position: "Director",
        contact: "Julian Rosa",
        profileimage:
          "https://www.imagenesbonitasname.com/covers/preview/fondo-de-perfil-watsapp-flor-rosa.jpg",
        initialDate: "2023/08/09",
        endDate: "2024/08/09",
      },
      {
        userId: "39393938",
        userName: "Maria",
        userLastN: "Rosa",
        rol: "Lider de equipo",
        minDate: "2023/11/11",
        status: "Disponible",
        email: "mariarosa@empresa.com",
        perEmail: "mariarosa@personal.com",
        phone1: 3103030303,
        phone2: 3104040404,
        phone3: 3105050505,
        birthday: "1987/06/11",
        address: "calle 1 # 10 - 10",
        position: "Director",
        contact: "Julian Rosa",
        profileimage:
          "https://www.imagenesbonitasname.com/covers/preview/fondo-de-perfil-watsapp-flor-rosa.jpg",
        initialDate: "2023/06/09",
      },
    ];
  }
  data() {
    return {
      userList: this.userList,
      opccrud: this.opccrud,
      newUser: this.newUser,
      validFields: this.validFields,
      maxDate: new Date(),
    };
  }
  getImage(user: user): string {
    let userimage = this.userList.filter((userin) => {
      if (user === userin) return user;
    });
    if (userimage) {
      return userimage[0].profileimage;
    } else {
      return "";
    }
  }

  editUser(user: user) {
    this.opccrud = "Edición";
    this.requiredFields = [
      "email",
      "rol",
      "status",
      "initialDate",
      "position",
      "minDate",
    ]; // Lista de campos requeridos
    this.newUser.userId = user.userId;
    /* 
    this.newUser.birthday = new Date(user.birthday);
    this.newUser.userName = user.userName; 
    this.newUser.contact = user.contact;
    this.newUser.phone1 = user.phone1;
    this.newUser.phone2 = user.phone2;
    this.newUser.phone3 = user.phone3;
    this.newUser.address = user.address;
    this.newUser.perEmail = user.perEmail;*/
    this.newUser.rol = user.rol;
    this.newUser.status = user.status;
    this.newUser.email = user.email;
    this.newUser.position = user.position;
    this.newUser.initialDate = new Date(user.initialDate);
    this.newUser.minDate = new Date(user.minDate);
    this.newUser.endDate = new Date(user.endDate);
    const diaHabilitado = document.querySelector(
      ".diaHabilitado"
    ) as HTMLElement;
    diaHabilitado.classList.add("show");
  }
  viewUser(user: user) {
    this.opccrud = "Visualización";
    this.newUser.userId = user.userId;
    this.newUser.minDate = new Date(user.minDate);
    this.newUser.endDate = new Date(user.endDate);
    this.newUser.birthday = new Date(user.birthday);
    this.newUser.userName = user.userName;
    this.newUser.userLastN = user.userLastN;
    this.newUser.rol = user.rol;
    this.newUser.status = user.status;
    this.newUser.email = user.email;
    this.newUser.perEmail = user.perEmail;
    this.newUser.contact = user.contact;
    this.newUser.phone1 = user.phone1;
    this.newUser.phone2 = user.phone2;
    this.newUser.phone3 = user.phone3;
    this.newUser.address = user.address;
    this.newUser.position = user.position;
    this.newUser.initialDate = new Date(user.initialDate);
    const btnGuardar = document.querySelector(".btnGuardar") as HTMLElement;
    btnGuardar.classList.add("hide");
    const diaHabilitado = document.querySelector(
      ".diaHabilitado"
    ) as HTMLElement;
    diaHabilitado.classList.add("show");
    const minDate = document.getElementById("minDate") as HTMLInputElement;
    minDate.disabled = true;
    const endDate = document.getElementById("endDate") as HTMLInputElement;
    endDate.disabled = true;
    const birthday = document.getElementById("birthday") as HTMLInputElement;
    birthday.disabled = true;
    const email = document.getElementById("email") as HTMLInputElement;
    email.disabled = true;
    const perEmail = document.getElementById("perEmail") as HTMLInputElement;
    perEmail.disabled = true;
    const contact = document.getElementById("contact") as HTMLInputElement;
    contact.disabled = true;
    const phone1 = document.getElementById("phone1") as HTMLInputElement;
    phone1.disabled = true;
    const phone2 = document.getElementById("phone2") as HTMLInputElement;
    phone2.disabled = true;
    const phone3 = document.getElementById("phone3") as HTMLInputElement;
    phone3.disabled = true;
    const address = document.getElementById("address") as HTMLTextAreaElement;
    address.disabled = true;
    const position = document.getElementById("position") as HTMLSelectElement;
    position.disabled = true;
    const rol = document.getElementById("rol") as HTMLSelectElement;
    rol.disabled = true;
    const status = document.getElementById("status") as HTMLSelectElement;
    status.disabled = true;
    const userName = document.getElementById("userName") as HTMLSelectElement;
    userName.disabled = true;
    const userLastN = document.getElementById("userLastN") as HTMLSelectElement;
    userLastN.disabled = true;
    const initialDate = document.getElementById(
      "initialDate"
    ) as HTMLInputElement;
    initialDate.disabled = true;
    const datosPersonales = document.querySelectorAll(".datosPersonales");
    datosPersonales.forEach((element) => {
      element.classList.add("show");
    });
  }
  validateFields(fieldName: string, condition: boolean) {
    if (!this.validatedFields.includes(fieldName))
      this.validatedFields.push(fieldName); // cdc: cuando el campo llama a esta funcion es porque se ha digitado algo, entonces al validarlo se añade el campo a este array para mostrar error
    const field = document.getElementById(fieldName) as HTMLInputElement;
    if (condition && field !== null) {
      if (!this.validFields.includes(fieldName) && field.checkValidity())
        this.validFields.push(fieldName);
    } else {
      const index = this.validFields.indexOf(fieldName);
      if (this.validFields.includes(fieldName))
        this.validFields.splice(index, 1);
    }
  }
  submitForm() {
    this.validateFields("email", this.newUser.email.length > 0);
    this.validateFields("name", this.newUser.userName.length > 0);
    this.validateFields("lastN", this.newUser.userLastN.length > 0);
    this.validateFields("minDate", this.newUser.minDate !== "");
    this.validateFields("initialDate", this.newUser.initialDate !== "");
    this.validateFields("rol", this.newUser.rol.length > 0);
    this.validateFields("position", this.newUser.position.length > 0);
    this.validateFields("status", this.newUser.status !== null);
    // Validar que todos los campos requeridos estén diligenciados
    if (
      this.requiredFields.every((field) => this.validFields.includes(field))
    ) {
      // Todos los campos requeridos están diligenciados, puedes proceder a guardar los cambios.
      // Agrega tu lógica para guardar los cambios aquí.
    } else {
      // Muestra un mensaje de error o realiza alguna acción si no se han diligenciado todos los campos.
      alert("Por favor diligencie todos los campos requeridos.");
    }
  }
  clearModal() {
    // cdc: para limpiar los campos y arreglos al cancelar
    this.validatedFields = [];
    this.validFields = [];
    this.requiredFields = ["email", "rol", "status", "initialDate", "position"];
    this.newUser = {
      //cambiado a 0
      userId: NaN,
      userName: "",
      userLastN: "", //apellidos
      email: "", //correo empresarial
      perEmail: "", //correo personal
      minDate: "", // fecha minima para reportar actividades
      rol: "",
      status: "",
      initialDate: "", // fecha de ingreso
      endDate: "", // fecha de terminación de contrato
      phone1: "",
      phone2: "",
      phone3: "", // contacto de emergencia
      birthday: "", //cumpleaños
      address: "", //dirección
      position: "", //cargo en la empresa
      contact: "", //nombre contacto de emergencia
      profileimage: "",
    };
    const btnGuardar = document.querySelector(".btnGuardar") as HTMLElement;
    btnGuardar.classList.remove("hide");
    const diaHabilitado = document.querySelector(
      ".diaHabilitado"
    ) as HTMLElement;
    if (diaHabilitado.classList.contains("show")) {
      diaHabilitado.classList.remove("show");
    }
    const minDate = document.getElementById("minDate") as HTMLInputElement;
    minDate.disabled = false;
    const endDate = document.getElementById("endDate") as HTMLInputElement;
    endDate.disabled = false;
    const birthday = document.getElementById("birthday") as HTMLInputElement;
    birthday.disabled = false;
    const email = document.getElementById("email") as HTMLInputElement;
    email.disabled = false;
    const perEmail = document.getElementById("perEmail") as HTMLInputElement;
    perEmail.disabled = false;
    const contact = document.getElementById("contact") as HTMLInputElement;
    contact.disabled = false;
    const phone1 = document.getElementById("phone1") as HTMLInputElement;
    phone1.disabled = false;
    const phone2 = document.getElementById("phone2") as HTMLInputElement;
    phone2.disabled = false;
    const phone3 = document.getElementById("phone3") as HTMLInputElement;
    phone3.disabled = false;
    const address = document.getElementById("address") as HTMLTextAreaElement;
    address.disabled = false;
    const position = document.getElementById("position") as HTMLSelectElement;
    position.disabled = false;
    const rol = document.getElementById("rol") as HTMLSelectElement;
    rol.disabled = false;
    const status = document.getElementById("status") as HTMLSelectElement;
    status.disabled = false;
    const userName = document.getElementById("userName") as HTMLSelectElement;
    userName.disabled = false;
    const initialDate = document.getElementById(
      "initialDate"
    ) as HTMLInputElement;
    initialDate.disabled = false;
    const datosPersonales = document.querySelectorAll(".datosPersonales");
    datosPersonales.forEach((element) => {
      element.classList.remove("show");
    });
  }
}
</script>

<!--Estilos-->
<style scoped lang="scss">
.text-left {
  // cdc: para alinear el texto a la izquierda
  text-align: left;
}
.table-contain {
  overflow: auto;
  max-height: 380px;
  padding: 16px;
}

.right-search {
  width: 500px;
  margin: 25px;
}

.left-options {
  margin: auto 25px;
  width: 100%;
  text-align: left;
}
.titulo {
  position: relative;
  z-index: 1;
}
.titulo:before {
  border-top: 2px solid #141b27;
  content: "";
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 95%;
  z-index: -1;
}
.titulo span {
  background: #fff;
  padding: 0 15px;
}
.modal-header {
  border-bottom: 1px solid #141b27;
}
.diaHabilitado,
.datosPersonales {
  display: none;
}
.diaHabilitado.show,
.datosPersonales.show {
  display: flex;
  text-align: center;
}

.datosPersonales.show {
  display: flex;
  text-align: center;
}
p.datosPersonales.show {
  display: block !important;
}
#btnGuardar.hide {
  display: none;
}
</style>
