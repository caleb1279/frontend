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
              v-model="user.name"
              class="form-control shadow-none"
              type="text"
              id="name"
              :class="{
                'is-valid': validFields.includes('name'),
                'is-invalid':
                  !validFields.includes('name') &&
                  validatedFields.includes('name'),
              }"
              @input="validateFields('name', user.name.length > 0)"
            />
          </div>
          <div class="col-md-6">
            <label for="lastN">Apellidos:</label>
            <input
              v-model="user.lastName"
              class="form-control shadow-none"
              type="text"
              id="lastName"
              :class="{
                'is-valid': validFields.includes('lastName'),
                'is-invalid':
                  !validFields.includes('lastName') &&
                  validatedFields.includes('lastName'),
              }"
              @input="validateFields('lastName', user.lastName.length > 0)"
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
              v-model="user.personalEmail"
              id="personalEmail"
              :class="{
                'is-valid': validFields.includes('personalEmail'),
                'is-invalid':
                  !validFields.includes('personalEmail') &&
                  validatedFields.includes('personalEmail'),
              }"
              @input="validateFields('user', user.personalEmail.length > 0)"
            />
          </div>
        </div>
        <!--Telefonos-->
        <div class="row datosPersonales">
          <div class="col-md-6">
            <div class="form-group">
              <label for="phone">Telefono 1:</label>
              <input
                v-model="user.phone"
                class="form-control shadow-none"
                type="text"
                id="phone"
                :class="{
                  'is-valid': validFields.includes('phone'),
                  'is-invalid':
                    !validFields.includes('phone') &&
                    validatedFields.includes('phone'),
                }"
                @input="validateFields('phone', user.phone > 0)"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="phone2">Telefono 2:</label>
              <input
                v-model="user.phone2"
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
              v-model="user.birthday"
              class="form-control shadow-none"
              id="birthday"
              inputFormat="yyyy-MM-dd"
              :class="{
                'is-valid': validFields.includes('birthday'),
                'is-invalid':
                  !validFields.includes('birthday') &&
                  validatedFields.includes('birthday'),
              }"
              @blur="validateFields('birthday', user.birthday !== '')"
            />
          </div>
        </div>
        <!--Dirección-->
        <div class="row datosPersonales">
          <div class="total-row form-group">
            <label for="address">Dirección:</label>
            <input
              v-model="user.address"
              class="form-control shadow-none"
              type="text"
              id="address"
              :class="{
                'is-valid': validFields.includes('address'),
                'is-invalid':
                  !validFields.includes('address') &&
                  validatedFields.includes('address'),
              }"
              @input="validateFields('address', user.address.length > 0)"
            />
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
                v-model="user.emergencyContact"
                class="form-control shadow-none"
                type="text"
                id="contact"
                :class="{
                  'is-valid': validFields.includes('contact'),
                  'is-invalid':
                    !validFields.includes('contact') &&
                    validatedFields.includes('contact'),
                }"
                @input="validateFields('contact', user.emergencyContact.length > 0)"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="relationshipContact">Parentesco:</label>
              <input
                v-model="user.relationshipContact"
                class="form-control shadow-none"
                type="text"
                id="relationshipContact"
                :class="{
                  'is-valid': validFields.includes('relationshipContact'),
                  'is-invalid':
                    !validFields.includes('relationshipContact') &&
                    validatedFields.includes('relationshipContact'),
                }"
                @input="validateFields('relationshipContact', user.relationshipContact.length > 0)"
              />
            </div>
          </div>
          <div class="total-row">
            <label for="emergencyPhone">Telefono :</label>
            <input
              v-model="user.emergencyPhone"
              class="form-control shadow-none"
              type="text"
              id="emergencyPhone"
              :class="{
                'is-valid': validFields.includes('emergencyPhone'),
                'is-invalid':
                  !validFields.includes('emergencyPhone') &&
                  validatedFields.includes('emergencyPhone'),
              }"
              @input="validateFields('phone', user.emergencyPhone > 0)"
            />
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
              v-model="user.email"
              id="email"
              :class="{
                'is-valid': validFields.includes('email'),
                'is-invalid':
                  !validFields.includes('email') &&
                  validatedFields.includes('email'),
              }"
              @input="validateFields('user', user.email.length > 0)"
            />
          </div>
        </div>
        <!--Status-->
        <div class="row">
          <div class="total-row form-group has-validation">
            <label for="status">Estado:</label>
            <input
              v-model="user.status"
              class="form-control shadow-none datosEmpresariales"
              id="status"
              :class="{
                'is-valid': validFields.includes('status'),
                'is-invalid':
                  !validFields.includes('status') &&
                  validatedFields.includes('status'),
              }"
              @change="validateFields('status', user.status.length > 0)"
            />
          </div>
        </div>
        <!--Rol y cargo-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group has-validation">
              <label for="workPosition">Cargo:</label>
              <select
                v-model="user.workPosition"
                class="form-control shadow-none datosEmpresariales"
                id="workPosition"
                :class="{
                  'is-valid': validFields.includes('workPosition'),
                  'is-invalid':
                    !validFields.includes('workPosition') &&
                    validatedFields.includes('workPosition'),
                }"
                @change="validateFields('workPosition', user.workPosition.length > 0)"
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
                v-bind:value="user.rol.rolName"
                class="form-control shadow-none datosEmpresariales"
                id="rol"
                :class="{
                  'is-valid': validFields.includes('rol'),
                  'is-invalid':
                    !validFields.includes('rol') &&
                    validatedFields.includes('rol'),
                }"
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
                new Date(user.startContract).toISOString().substring(0, 10)
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
                validateFields('startContract', user.startContract !== null)
              "
            />
          </div>
          <div class="col-md-6 form-group">
            <label for="finshContract">Fecha de terminación:</label>
            <input
              v-bind:value="
                new Date(user.finishContract).toISOString().substring(0, 10)
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
              <label for="minimumReportDate">Fecha mínima:</label>
              <input
                v-bind:value="
                  new Date(user.minimumReportDate).toISOString().substring(0, 10)
                "
                class="form-control shadow-none datosEmpresariales"
                id="minimumReportDate"
                :class="{
                  'is-valid': validFields.includes('minimumReportDate'),
                  'is-invalid':
                    !validFields.includes('minimumReportDate') &&
                    validatedFields.includes('minimumReportDate'),
                }"
                @blur="validateFields('minimumReportDate', user.minimumReportDate !== '')"
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
import session from "@/controllers/SessionController";
import { Vue } from "vue-class-component";

export default class userCrud extends Vue {
  user = session.getUserData();
  maxDate = new Date();
  validFields: string[] = [];
  validatedFields: string[] = [];
  requiredFields: string[] = [
    "personalEmail",
    "name",
    "lastName",
    "birthday",
    "phone",
    "emergencyPhone",
    "address",
    "contact",
    "relationshipContact",
  ]; // Lista de campos requeridos

  data() {
    return {
      user: this.user,
      validFields: this.validFields,
    };
  }

  mounted() {
    this.user.birthday = new Date(this.user.birthday);
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
      if (!this.validFields.includes(fieldName))
        this.validFields.push(fieldName);
    } else {
      const index = this.validFields.indexOf(fieldName);
      if (this.validFields.includes(fieldName))
        this.validFields.splice(index, 1);
    }
  }

  submitForm() {
    this.validateFields("personalEmail", this.user.personalEmail.length > 0);
    this.validateFields("name", this.user.name.length > 0);
    this.validateFields("lastName", this.user.lastName.length > 0);
    this.validateFields("birthday", this.user.birthday !== "");
    this.validateFields("phone", this.user.phone > 0);
    this.validateFields("emergencyPhone", this.user.emergencyPhone > 0);
    this.validateFields("address", this.user.address.length > 0);
    this.validateFields("contact", this.user.emergencyContact.length > 0);
    this.validateFields("relationshipContact", this.user.relationshipContact.length > 0);

    // Validar que todos los campos requeridos estén diligenciados
    if (
      this.requiredFields.every((field) => this.validFields.includes(field))
    ) {
      // Todos los campos requeridos están diligenciados, puedes proceder a guardar los cambios.
      // Agrega tu lógica para guardar los cambios aquí.
    } else {
      // Muestra un mensaje de error o realiza alguna acción si no se han diligenciado todos los campos.
    }
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
.form-control {
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
