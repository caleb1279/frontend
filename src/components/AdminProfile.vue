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
            <p>Datos personales</p>
            <hr />
            <!--Nombre de usuario-->
            <div class="row">
              <div class="total-row form-group">
                <label for="name">Nombre de usuario:</label>
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
            </div>
            <!--Email personal-->
            <div class="row">
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
            <div class="row">
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
                    @input="validateFields('phone1', newUser.phone1 > 0)"
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
            <div class="row">
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
            <p>Contacto de emergencia</p>
            <hr />
            <div class="row">
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
                    @input="validateFields('phone1', newUser.phone3 > 0)"
                  />
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
            </div>
            <p>Datos empresariales</p>
            <hr />
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

            <!--Días habilitados para reportar actividades-->
            <div class="row">
              <div class="titulo">
                <p>Días habilitados para reportar actividades</p>
                <hr />
              </div>

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
                  <label for="minDate">Fecha máxima:</label>
                  <date-picker
                    :value="new Date().toISOString().substring(0, 10)"
                    class="form-control shadow-none"
                    id=""
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
            <button type="submit" class="btn btn-primary" @click="submitForm">
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
        v-on:click.prevent=""
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
          <th scope="col">Usuarios</th>
          <th scope="col">Email</th>
          <th scope="col">Rol</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody v-for="user in userList" :key="user.userId">
        <td>{{ user.userName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.rol }}</td>
        <td>{{ user.status }}</td>
        <td>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
            v-on:click="opccrud = 'Edicion'"
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
    email: "", //correo empresarial
    perEmail: "", //correo personal
    minDate: "", // fecha minima para reportar actividades
    rol: "",
    status: "",
    initialDate: "", // fecha de ingreso
    phone1: 0,
    phone2: 0,
    phone3: 0, // contacto de emergencia
    birthday: "", //cumpleaños
    adress: "", //dirección
    position: "", //cargo en la empresa
    contact: "", //nombre contacto de emergencia
  };

  userList!: user[];
  validFields: string[] = [];
  validatedFields: string[] = [];
  requiredFields: string[] = ["userName", "rol", "status", "minDate"]; // Lista de campos requeridos
  opccrud!: string;
  async beforeMount() {
    this.userList = (await controllers.getUser()) || [
      {
        userId: "39393939",
        userName: "esteban rosa",
        rol: "Administrador",
        minDate: "2023/11/11",
        status: "Disponible",
        email: "estebanrosa@empresa.com",
        perEmail: "estebanrosa@personal.com",
      },
    ];
  }
  data() {
    return {
      userList: this.userList,
      opccrud: this.opccrud,
      newUser: this.newUser,
      validFields: this.validFields,
    };
  }

  editUser(user: user) {
    this.opccrud = "Edición";
    this.newUser.userId = user.userId;
    this.newUser.minDate = new Date(user.minDate);
    this.newUser.userName = user.userName;
    this.newUser.rol = user.rol;
    this.newUser.status = user.status;
    this.newUser.email = user.email;
    this.newUser.perEmail = user.perEmail;
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
    this.validateFields("minDate", this.newUser.minDate !== "");
    this.validateFields("rol", this.newUser.rol.length > 0);
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
    this.newUser = {
      //cambiado a 0
      userId: NaN,
      userName: "",
      email: "", //correo empresarial
      perEmail: "", //correo personal
      minDate: "", // fecha minima para reportar actividades
      rol: "",
      status: "",
      initialDate: "", // fecha de ingreso
      phone1: 0,
      phone2: 0,
      phone3: 0, // contacto de emergencia
      birthday: "", //cumpleaños
      adress: "", //dirección
      position: "", //cargo en la empresa
      contact: "", //nombre contacto de emergencia
    };
  }
}
</script>

<!--Estilos-->
<style scoped lang="scss">
.table-contain {
  overflow: auto;
  max-height: 380px;
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
.titulo hr {
  z-index: 1;
  margin-bottom: 12px;
  position: relative;
}
</style>
