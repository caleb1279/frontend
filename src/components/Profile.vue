<template>
  <div class="maintitle px-4 mt-3">
    <h1>Datos Personales</h1>
  </div>

  <!--información general a visualizar-->

  <div class="p-12">
    <form v-on:submit.prevent="" novalidate>
      <div>
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
              @input="validateFields('userName', newUser.userName.length > 0)"
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
              @input="validateFields('userLastN', newUser.userLastN.length > 0)"
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
        <div class="row datosPersonales">
          <div class="total-row birthday">
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
            <div class="invalid-feedback">Por favor diligencia este campo</div>
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
                @input="validateFields('contact', newUser.contact.length > 0)"
              />
              <div class="valid-feedback text-left">¡Se ve bien!</div>
              <div class="invalid-feedback text-left">
                Por favor diligencia este campo
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="relatedTo">Parentesco:</label>
              <input
                v-model="newUser.relatedTo"
                class="form-control shadow-none"
                type="text"
                id="relatedTo"
                :class="{
                  'is-valid': validFields.includes('relatedTo'),
                  'is-invalid':
                    !validFields.includes('relatedTo') &&
                    validatedFields.includes('relatedTo'),
                }"
                @input="
                  validateFields('relatedTo', newUser.relatedTo.length > 0)
                "
              />
            </div>
          </div>
          <div class="total-row">
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
        <p class="titulo datosEmpresariales">
          <span>Datos Empresariales</span>
        </p>
        <!--Email empresarial-->
        <div class="row">
          <div class="total-row form-group">
            <label for="email">Email Empresarial:</label>
            <input
              type="email"
              class="form-control shadow-none datosEmpresariales"
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
            <label for="status">Estado:</label>
            <select
              v-model="newUser.status"
              class="form-select shadow-none datosEmpresariales"
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
              <label for="position">Cargo:</label>
              <select
                v-model="newUser.position"
                class="form-select shadow-none datosEmpresariales"
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
              <label for="rol">Rol:</label>
              <input
                type="text"
                v-model="newUser.rol.rolName"
                class="form-select shadow-none datosEmpresariales"
                id="rol"
                :class="{
                  'is-valid': validFields.includes('rol'),
                  'is-invalid':
                    !validFields.includes('rol') &&
                    validatedFields.includes('rol'),
                }"
                @change="validateFields('rol', newUser.rol.rolName.length > 0)"
              />
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
            <input
              v-bind:value="
                new Date(newUser.startContract).toISOString().substring(0, 10)
              "
              class="form-control shadow-none datosEmpresariales"
              id="startContract"
              :class="{
                'is-valid': validFields.includes('startContract'),
                'is-invalid':
                  !validFields.includes('startContract') &&
                  validatedFields.includes('startContract'), // cdc otro array para saber si lo ha validado
              }"
              @blur="
                validateFields('startContract', newUser.startContract !== null)
              "
            />
          </div>
          <div class="col-md-6 form-group">
            <label for="finshContract">Fecha de terminación:</label>
            <input
              v-bind:value="
                new Date(newUser.finshContract).toISOString().substring(0, 10)
              "
              class="form-control shadow-none datosEmpresariales"
              id="finshContract"
            />
          </div>
        </div>
        <!--Días habilitados para reportar actividades-->
        <div class="row">
          <p class="titulo">
            <span>Días habilitados para reportar actividades</span>
          </p>

          <div class="col-md-6">
            <div class="form-group">
              <label for="minDate">Fecha mínima:</label>
              <input
                v-bind:value="
                  new Date(newUser.minDate).toISOString().substring(0, 10)
                "
                class="form-control shadow-none datosEmpresariales"
                id="minDate"
                :class="{
                  'is-valid': validFields.includes('minDate'),
                  'is-invalid':
                    !validFields.includes('minDate') &&
                    validatedFields.includes('minDate'),
                }"
                @blur="validateFields('minDate', newUser.minDate !== '')"
              />
            </div>
          </div>
          <!--fecha limite-->
          <div class="col-md-6">
            <div class="form-group">
              <label for="maxDate">Fecha máxima:</label>
              <input
                v-bind:value="new Date(maxDate).toISOString().substring(0, 10)"
                class="form-control shadow-none"
                id="maxDate"
                :disabled="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
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
  <br />
</template>

<script lang="ts">
import controllers from "@/controllers/RequestController";
import session from "@/controllers/SessionController";
import { Vue } from "vue-class-component";
import type { user } from "@/registerDataType";
export default class userCrud extends Vue {
  user = session.getUserData();
  newUser = this.user;
  maxDate = new Date();
  userList!: user[];
  validFields: string[] = [];
  validatedFields: string[] = [];
  requiredFields: string[] = [
    "email",
    "rol",
    "status",
    "startContract",
    "position",
  ]; // Lista de campos requeridos
  opccrud!: string;

  async beforeMount() {
    this.userList = (await controllers.getUser()) || [];
  }
  data() {
    return {
      userList: this.userList,
      opccrud: this.opccrud,
      newUser: this.newUser,
      validFields: this.validFields,
    };
  }
  getImage(user: number) {
    let image = this.userList[user].profileimage;
    console.log(image);
    if (!image) return "";
    else {
      return image;
    }
  }

  mounted() {
    this.requiredFields = [
      "perEmail",
      "userName",
      "userLastN",
      "phone1",
      "phone3",
      "contact",
      "birthday",
    ]; // Lista de campos requeridos
    /* this.newUser.userId = user.userId;
    this.newUser.birthday = new Date(user.birthday);
    this.newUser.userName = user.userName;
    this.newUser.userLastN = user.userLastN;
    this.newUser.contact = user.contact;
    this.newUser.phone1 = user.phone1;
    this.newUser.phone2 = user.phone2;
    this.newUser.phone3 = user.phone3;
    this.newUser.address = user.address;
    this.newUser.perEmail = user.perEmail;
    this.newUser.rol = user.rol;
    this.newUser.status = user.status;
    this.newUser.email = user.email;
    this.newUser.position = user.position; */
    this.newUser.startContract = new Date(this.newUser.startContract);
    this.newUser.minDate = new Date(this.newUser.minDate);
    this.newUser.finshContract = new Date(this.newUser.finshContract);
    this.newUser.birthday = new Date(this.newUser.birthday);

    const datosEmpresariales = document.querySelectorAll(".datosEmpresariales");
    datosEmpresariales.forEach((element) => {
      (element as HTMLInputElement).disabled = true;
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
    this.validateFields("perEmail", this.newUser.perEmail.length > 0);
    this.validateFields("name", this.newUser.userName.length > 0);
    this.validateFields("lastN", this.newUser.userLastN.length > 0);
    this.validateFields("birthday", this.newUser.birthday !== "");
    this.validateFields("phone1", this.newUser.phone1 > 0);
    this.validateFields("phone2", this.newUser.phone2 > 0);
    this.validateFields("phone3", this.newUser.phone3 > 0);
    this.validateFields("address", this.newUser.address.length > 0);
    this.validateFields("contact", this.newUser.contact.length > 0);

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
}
</script>

<!--Estilos-->
<style scoped lang="scss">
.text-left {
  // cdc: para alinear el texto a la izquierda
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
.form-control,
.form-select {
  margin: 15px !important;
}

.p-12 {
  width: 65%;
  margin: auto;
}
.birthday {
  margin: 15px;
}
</style>
