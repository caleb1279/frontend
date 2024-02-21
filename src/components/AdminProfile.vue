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
                  v-model="newUser.name"
                  class="form-control shadow-none"
                  type="text"
                  id="name"
                  :class="{
                    'is-valid': validFields.includes('name'),
                    'is-invalid':
                      !validFields.includes('name') &&
                      validatedFields.includes('name'),
                  }"
                  @input="validateFields('name', newUser.name.length > 0)"
                />
              </div>
              <div class="col-md-6">
                <label for="lastN">Apellidos:</label>
                <input
                  v-model="newUser.lastName"
                  class="form-control shadow-none"
                  type="text"
                  id="lastName"
                  :class="{
                    'is-valid': validFields.includes('lastName'),
                    'is-invalid':
                      !validFields.includes('lastName') &&
                      validatedFields.includes('lastName'),
                  }"
                  @input="
                    validateFields('lastName', newUser.lastName.length > 0)
                  "
                />
              </div>
            </div>
            <!--Email personal-->
            <div class="row datosPersonales">
              <div class="total-row form-group">
                <label for="personalEmail">Email Personal:</label>
                <input
                  type="email"
                  class="form-control shadow-none"
                  v-model="newUser.personalEmail"
                  id="personalEmail"
                  :class="{
                    'is-valid': validFields.includes('personalEmail'),
                    'is-invalid':
                      !validFields.includes('personalEmail') &&
                      validatedFields.includes('personalEmail'),
                  }"
                  @input="
                    validateFields('user', newUser.personalEmail.length > 0)
                  "
                />
              </div>
            </div>
            <!--Telefonos-->
            <div class="row datosPersonales">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">Telefono 1:</label>
                  <input
                    v-model="newUser.phone"
                    class="form-control shadow-none"
                    type="text"
                    id="phone"
                    :class="{
                      'is-valid': validFields.includes('phone'),
                      'is-invalid':
                        !validFields.includes('phone') &&
                        validatedFields.includes('phone'),
                    }"
                    @input="validateFields('phone', newUser.phone > 0)"
                  />
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
                  inputFormat="yyyy-MM-dd"
                  :class="{
                    'is-valid': validFields.includes('birthday'),
                    'is-invalid':
                      !validFields.includes('birthday') &&
                      validatedFields.includes('birthday'),
                  }"
                  @blur="validateFields('birthday', newUser.birthday !== '')"
                />
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
              </div>
            </div>
            <p class="titulo datosPersonales">
              <span>emergencyContacto de Emergencia</span>
            </p>
            <div class="row datosPersonales">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="emergencyContact">Nombre:</label>
                  <input
                    v-model="newUser.emergencyContact"
                    class="form-control shadow-none"
                    type="text"
                    id="emergencyContact"
                    :class="{
                      'is-valid': validFields.includes('emergencyContact'),
                      'is-invalid':
                        !validFields.includes('emergencyContact') &&
                        validatedFields.includes('emergencyContact'),
                    }"
                    @input="
                      validateFields(
                        'emergencyContact',
                        newUser.emergencyContact.length > 0
                      )
                    "
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="relationshipContact">Parentesco:</label>
                  <input
                    v-model="newUser.relationshipContact"
                    class="form-control shadow-none"
                    type="text"
                    id="relationshipContact"
                    :class="{
                      'is-valid': validFields.includes('relationshipContact'),
                      'is-invalid':
                        !validFields.includes('relationshipContact') &&
                        validatedFields.includes('relationshipContact'),
                    }"
                    @input="
                      validateFields(
                        'relationshipContact',
                        newUser.relationshipContact.length > 0
                      )
                    "
                  />
                </div>
              </div>
              <div class="total-row">
                <label for="emergencyPhone">Telefono :</label>
                <input
                  v-model="newUser.emergencyPhone"
                  class="form-control shadow-none"
                  type="text"
                  id="emergencyPhone"
                  :class="{
                    'is-valid': validFields.includes('emergencyPhone'),
                    'is-invalid':
                      !validFields.includes('emergencyPhone') &&
                      validatedFields.includes('emergencyPhone'),
                  }"
                  @input="validateFields('phone', newUser.emergencyPhone > 0)"
                />
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
                  <label for="workPosition">Seleccione un Cargo:</label>
                  <input
                    type="text"
                    v-model="newUser.workPosition"
                    class="form-control shadow-none"
                    id="workPosition"
                    :class="{
                      'is-valid': validFields.includes('workPosition'),
                      'is-invalid':
                        !validFields.includes('workPosition') &&
                        validatedFields.includes('workPosition'),
                    }"
                    @change="
                      validateFields(
                        'workPosition',
                        newUser.workPosition.length > 0
                      )
                    "
                  />
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
                    @change="
                      validateFields('rol', newUser.rol.rolName.length > 0)
                    "
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
                <label for="startContract">Fecha de ingreso:</label>
                <date-picker
                  v-model="newUser.startContract"
                  class="form-control shadow-none"
                  id="startContract"
                  inputFormat="yyyy-MM-dd"
                  :class="{
                    'is-valid': validFields.includes('startContract'),
                    'is-invalid':
                      !validFields.includes('startContract') &&
                      validatedFields.includes('startContract'), // cdc otro array para saber si lo ha validado
                  }"
                  @blur="
                    validateFields(
                      'startContract',
                      newUser.startContract !== null
                    )
                  "
                ></date-picker>
              </div>
              <div class="col-md-6 form-group">
                <label for="finishContract">Fecha de terminación:</label>
                <date-picker
                  v-model="newUser.finishContract"
                  class="form-control shadow-none"
                  id="finishContract"
                  inputFormat="yyyy-MM-dd"
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
                  <label for="minimumReportDate">Fecha mínima:</label>
                  <date-picker
                    v-model="newUser.minimumReportDate"
                    class="form-control shadow-none"
                    id="minimumReportDate"
                    inputFormat="yyyy-MM-dd"
                    :class="{
                      'is-valid': validFields.includes('minimumReportDate'),
                      'is-invalid':
                        !validFields.includes('minimumReportDate') &&
                        validatedFields.includes('minimumReportDate'),
                    }"
                    @blur="
                      validateFields(
                        'minimumReportDate',
                        newUser.minimumReportDate !== ''
                      )
                    "
                  />
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
                    inputFormat="yyyy-MM-dd"
                    :disabled="true"
                  />
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
        <input
          class="form-control me-2 shadow-none"
          id="search"
          type="search"
        />
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
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="user in userList" :key="user.id">
        <td>
          <img
            class="avatar-rounded"
            with="30"
            height="30"
            :src="getImage(user)"
          />
        </td>
        <td>{{ user.name }} {{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.workPosition }}</td>
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
import { Vue } from "vue-class-component";
import data from "@/controllers/DataController";
import session from "@/controllers/SessionController"
import type { user } from "@/registerDataType";
import router from "@/router";
export default class userCrud extends Vue {
  newUser: user = {
    id: NaN,
    name: "",
    lastName: "", //apellidos
    email: "", //correo empresarial
    personalEmail: "", //correo personal
    minimumReportDate: "", // fecha minima para reportar actividades
    rol: { id: 0, rolName: "" },
    status: "",
    startContract: "", // fecha de ingreso
    finishContract: "", //fecha de terminación de contrato
    phone: 0,
    phone2: 0,
    emergencyPhone: 0, // emergencyContacto de emergencia
    birthday: "", //cumpleaños
    address: "", //dirección
    workPosition: "", //cargo en la empresa
    emergencyContact: "", //nombre emergencyContacto de emergencia
    profilePicture: "",
    vacationDays: 0,
    password: "",
    relationshipContact: "",
    tipId: 0,
    numId: 0,
  };
  maxDate!: Date;
  userList!: user[];
  validFields: string[] = [];
  validatedFields: string[] = [];
  requiredFields: string[] = [
    "email",
    "rol",
    "status",
    "startContract",
    "workPosition",
  ]; // Lista de campos requeridos
  opccrud!: string;

  async beforeMount() {
    await data.collectData();
    this.userList = data.getUsers();
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
      return userimage[0].profilePicture;
    } else {
      return "";
    }
  }

  editUser(user: user) {
    this.opccrud = "Edición";
    this.hideOptions();
    this.requiredFields = [
      "email",
      "rol",
      "status",
      "startContract",
      "workPosition",
      "minimumReportDate",
    ]; // Lista de campos requeridos
    this.newUser.id = user.id;
    /* 
    this.newUser.birthday = new Date(user.birthday);
    this.newUser.name = user.name; 
    this.newUser.emergencyContact = user.emergencyContact;
    this.newUser.phone = user.phone;
    this.newUser.phone2 = user.phone2;
    this.newUser.emergencyPhone = user.emergencyPhone;
    this.newUser.address = user.address;
    this.newUser.personalEmail = user.personalEmail;*/
    this.newUser.rol = user.rol;
    this.newUser.status = user.status;
    this.newUser.email = user.email;
    this.newUser.workPosition = user.workPosition;
    this.newUser.startContract = new Date(user.startContract);
    this.newUser.minimumReportDate = new Date(user.minimumReportDate);
    this.newUser.finishContract = new Date(user.finishContract);
    const diaHabilitado = document.querySelector(
      ".diaHabilitado"
    ) as HTMLElement;
    diaHabilitado.classList.add("show");
  }
  viewUser(user: user) {
    this.opccrud = "Visualización";
    this.newUser.id = user.id;
    this.newUser.minimumReportDate = new Date(user.minimumReportDate);
    this.newUser.finishContract = new Date(user.finishContract);
    this.newUser.birthday = new Date(user.birthday);
    this.newUser.name = user.name;
    this.newUser.lastName = user.lastName;
    this.newUser.rol = user.rol;
    this.newUser.status = user.status;
    this.newUser.email = user.email;
    this.newUser.personalEmail = user.personalEmail;
    this.newUser.emergencyContact = user.emergencyContact;
    this.newUser.phone = user.phone;
    this.newUser.phone2 = user.phone2;
    this.newUser.emergencyPhone = user.emergencyPhone;
    this.newUser.address = user.address;
    this.newUser.workPosition = user.workPosition;
    this.newUser.relationshipContact = user.relationshipContact;
    this.newUser.startContract = new Date(user.startContract);
    const btnGuardar = document.querySelector(".btnGuardar") as HTMLElement;
    btnGuardar.classList.add("hide");
    const diaHabilitado = document.querySelector(
      ".diaHabilitado"
    ) as HTMLElement;
    diaHabilitado.classList.add("show");
    const minimumReportDate = document.getElementById(
      "minimumReportDate"
    ) as HTMLInputElement;
    minimumReportDate.disabled = true;
    const finishContract = document.getElementById(
      "finishContract"
    ) as HTMLInputElement;
    finishContract.disabled = true;
    const birthday = document.getElementById("birthday") as HTMLInputElement;
    birthday.disabled = true;
    const email = document.getElementById("email") as HTMLInputElement;
    email.disabled = true;
    const personalEmail = document.getElementById(
      "personalEmail"
    ) as HTMLInputElement;
    personalEmail.disabled = true;
    const emergencyContact = document.getElementById(
      "emergencyContact"
    ) as HTMLInputElement;
    emergencyContact.disabled = true;
    const phone = document.getElementById("phone") as HTMLInputElement;
    phone.disabled = true;
    const phone2 = document.getElementById("phone2") as HTMLInputElement;
    phone2.disabled = true;
    const emergencyPhone = document.getElementById(
      "emergencyPhone"
    ) as HTMLInputElement;
    emergencyPhone.disabled = true;
    const address = document.getElementById("address") as HTMLTextAreaElement;
    address.disabled = true;
    const workPosition = document.getElementById(
      "workPosition"
    ) as HTMLSelectElement;
    workPosition.disabled = true;
    const rol = document.getElementById("rol") as HTMLSelectElement;
    rol.disabled = true;
    const status = document.getElementById("status") as HTMLSelectElement;
    status.disabled = true;
    const name = document.getElementById("name") as HTMLSelectElement;
    name.disabled = true;
    const lastName = document.getElementById("lastName") as HTMLSelectElement;
    lastName.disabled = true;
    const relationshipContact = document.getElementById(
      "relationshipContact"
    ) as HTMLSelectElement;
    relationshipContact.disabled = true;
    const startContract = document.getElementById(
      "startContract"
    ) as HTMLInputElement;
    startContract.disabled = true;
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
    this.validateFields("name", this.newUser.name.length > 0);
    this.validateFields("lastN", this.newUser.lastName.length > 0);
    this.validateFields(
      "minimumReportDate",
      this.newUser.minimumReportDate !== ""
    );
    this.validateFields("startContract", this.newUser.startContract !== "");
    this.validateFields("rol", this.newUser.rol.rolName.length > 0);
    this.validateFields("workPosition", this.newUser.workPosition.length > 0);
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
    this.requiredFields = [
      "email",
      "rol",
      "status",
      "startContract",
      "workPosition",
    ];
    this.newUser = {
      //cambiado a 0
      id: NaN,
      name: "",
      lastName: "", //apellidos
      email: "", //correo empresarial
      personalEmail: "", //correo personal
      minimumReportDate: "", // fecha minima para reportar actividades
      rol: { id: 0, rolName: "" },
      status: "",
      startContract: "", // fecha de ingreso
      finishContract: "", // fecha de terminación de contrato
      phone: 0,
      phone2: 0,
      emergencyPhone: 0, // emergencyContacto de emergencia
      birthday: "", //cumpleaños
      address: "", //dirección
      workPosition: "", //cargo en la empresa
      emergencyContact: "", //nombre emergencyContacto de emergencia
      profilePicture: "",
      vacationDays: 0,
      password: "",
      relationshipContact: "",
      tipId: 0,
      numId: 0,
    };
    this.hideOptions();
  }
  hideOptions() {
    const btnGuardar = document.querySelector(".btnGuardar") as HTMLElement;
    btnGuardar.classList.remove("hide");
    const diaHabilitado = document.querySelector(
      ".diaHabilitado"
    ) as HTMLElement;
    if (diaHabilitado.classList.contains("show")) {
      diaHabilitado.classList.remove("show");
    }
    const minimumReportDate = document.getElementById(
      "minimumReportDate"
    ) as HTMLInputElement;
    minimumReportDate.disabled = false;
    const finishContract = document.getElementById(
      "finishContract"
    ) as HTMLInputElement;
    finishContract.disabled = false;
    const birthday = document.getElementById("birthday") as HTMLInputElement;
    birthday.disabled = false;
    const email = document.getElementById("email") as HTMLInputElement;
    email.disabled = false;
    const personalEmail = document.getElementById(
      "personalEmail"
    ) as HTMLInputElement;
    personalEmail.disabled = false;
    const emergencyContact = document.getElementById(
      "emergencyContact"
    ) as HTMLInputElement;
    emergencyContact.disabled = false;
    const phone = document.getElementById("phone") as HTMLInputElement;
    phone.disabled = false;
    const phone2 = document.getElementById("phone2") as HTMLInputElement;
    phone2.disabled = false;
    const emergencyPhone = document.getElementById(
      "emergencyPhone"
    ) as HTMLInputElement;
    emergencyPhone.disabled = false;
    const address = document.getElementById("address") as HTMLTextAreaElement;
    address.disabled = false;
    const workPosition = document.getElementById(
      "workPosition"
    ) as HTMLSelectElement;
    workPosition.disabled = false;
    const rol = document.getElementById("rol") as HTMLSelectElement;
    rol.disabled = false;
    const status = document.getElementById("status") as HTMLSelectElement;
    status.disabled = false;
    const name = document.getElementById("name") as HTMLSelectElement;
    name.disabled = false;
    const startContract = document.getElementById(
      "startContract"
    ) as HTMLInputElement;
    startContract.disabled = false;
    const datosPersonales = document.querySelectorAll(".datosPersonales");
    datosPersonales.forEach((element) => {
      element.classList.remove("show");
    });
  }

  beforeCreate(): void {
      if (!session.validateSession) {
        this.$router.push("/login")
      }
  }
}
</script>

<!--Estilos-->
<style scoped lang="scss">
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

.avatar-rounded {
  padding: 2px;
}
</style>
