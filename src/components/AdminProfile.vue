<template>
  <!--formulario de edición-->
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
            <!--Email-->
            <div class="row">
              <div class="total-row form-group">
                <label for="email">Email:</label>
                <input
                  type="text"
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
            <!--Días habilitados para reportar actividades-->
            <div class="row">
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

            <!--Status-->
            <div class="row">
              <div class="total-row form-group has-validation">
                <label for="status">Seleccione un estado:</label>
                <select
                  v-bind:value="newUser.status"
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
            <!--Rol-->
            <div class="row">
              <div class="total-row form-group has-validation">
                <label for="rol">Seleccione un rol:</label>
                <select
                  v-bind:value="newUser.rol"
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
    email: "",
    minDate: "",
    rol: "",
    status: "",
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
        email: "estebanrosa@algo.com",
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
    this.opccrud = "Edicion";
    this.newUser.userId = user.userId;
    this.newUser.minDate = new Date(user.minDate);
    this.newUser.userName = user.userName;
    this.newUser.rol = user.rol;
    this.newUser.status = user.status;
    this.newUser.email = user.email;
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
      userId: NaN, // Cambiado a 0,
      userName: "",
      minDate: "",
      rol: "",
      status: "",
      email: "",
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
</style>
