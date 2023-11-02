<template>
  <div class="border-top">
    <div class="modal fade" id="projectModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form class="modal-form" v-on:submit.prevent="" novalidate>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {{ opccrud }} de Proyectos
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
              <div class="row">
                <div class="total-row form-group">
                  <label for="projectid">Número del proyecto:</label>
                  <input
                    v-model="newProject.projectId"
                    class="form-control shadow-none"
                    type="text"
                    id="projectid"
                    :class="{
                      'is-valid': validFields.includes('projectid'),
                      'is-invalid': !validFields.includes('projectid') &&
                      validatedFields.includes('projectid'), // Corregido a 'projectId'
                    }"
                    @input="
                      validateFields(
                        'projectid',
                        newProject.projectId.length > 0
                      )
                    "
                  />
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">Por favor diligencia este campo</div>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="project">Nombre del proyecto:</label>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    v-model="newProject.name"
                    id="project"
                    :class="{
                      'is-valid': validFields.includes('project'),
                      'is-invalid': !validFields.includes('project') &&
                                    validatedFields.includes('project'),
                    }"
                    @input="validateFields('project', newProject.name.length > 0)"
                  />
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">Por favor diligencia este campo</div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="date">Fecha de laboratorio:</label>
                    <date-picker
                      v-model="newProject.labDate"
                      class="form-control shadow-none"
                      id="labdate"
                      inputFormat="yyyy/MM/dd"
                      :class="{
                        'is-valid': validFields.includes('labdate'),
                        'is-invalid': !validFields.includes('labdate') &&
                          validatedFields.includes('labdate'), 
                      }"
                      @closed="
                        validateFields('labdate', newProject.labDate !== null)
                      "
                    />
                    <div class="valid-feedback">¡Se ve bien!</div>
                    <div class="invalid-feedback">Por favor diligencia este campo</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="date">Fecha de producción:</label>
                    <date-picker
                      v-model="newProject.proDate"
                      class="form-control shadow-none"
                      id="prodate"
                      inputFormat="yyyy/MM/dd"
                      :class="{
                        'is-valid': validFields.includes('prodate'),
                        'is-invalid': !validFields.includes('prodate') &&
                          validatedFields.includes('prodate'),
                      }"
                      @closed="
                        validateFields('prodate', newProject.proDate !== null)
                      "
                    />
                    <div class="valid-feedback">¡Se ve bien!</div>
                    <div class="invalid-feedback">Por favor diligencia este campo</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="source">Fuente de desarrollo:</label>
                  <input
                    type="text"
                    id="source"
                    v-model="newProject.source"
                    class="form-control shadow-none"
                    :class="{
                      'is-valid': validFields.includes('source'),
                      'is-invalid': !validFields.includes('source') &&
                        validatedFields.includes('source'),
                    }"
                    @input="
                      validateFields('source', newProject.source.length > 0)
                    "
                  />
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group has-validation">
                  <label for="status">Seleccione un estado:</label>
                  <select
                    v-model="newProject.status"
                    class="form-select shadow-none"
                    id="status"
                    :class="{
                      'is-valid': validFields.includes('status'),
                      'is-invalid': !validFields.includes('status') &&
                        validatedFields.includes('status'),
                    }"
                    @change="
                      validateFields('status', newProject.status !== null)
                    "
                  >
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <div class="invalid-feedback text-left">
                    Por favor diligencia este campo </div>
                    <option :value="false">Inactivo</option>
                    <option :value="true">Activo</option>
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
      <h1>Modulo de proyectos</h1>
    </div>
    <div class="d-flex">
      <div class="left-options">
        <button
          type="submit"
          class="btn btn-primary btn-create"
          data-bs-toggle="modal"
          data-bs-target="#projectModal"
          v-on:click="opccrud = 'Creación'"
        >
          <font-awesome-icon icon="plus" /> Crear Proyecto
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
    <div class="table-contain">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N&uacute;mero de proyecto</th>
            <th scope="col">Nombre del proyecto</th>
            <th scope="col">Fecha laboratorio</th>
            <th scope="col">Fecha producci&oacute;n</th>
            <th scope="col">Fuente</th>
            <th scope="col">Estado del proyecto</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projectlist" :key="project.id">
            <td>{{ project.projectId }}</td>
            <td>{{ project.name }}</td>
            <td>{{ project.labDate }}</td>
            <td>{{ project.proDate }}</td>
            <td>{{ project.source }}</td>
            <td>{{ project.status }}</td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#projectModal"
                v-on:click.prevent=""
              >
                <i class="fa-solid fa-pen"></i>
              </a>
            </td>
            <td>
              <a href="#" v-on:click.prevent="">
                <i class="fa-solid fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import controllers from "@/controllers/RequestController";
import type { project } from "@/registerDataType";
export default class ProjectCrud extends Vue {
  newProject: project = {
    id: NaN,
    labDate: null,
    name: "",
    proDate: null,
    projectId: "",
    source: "",
    status: null,
  };
  projectlist!: project[];
  validFields: string[] = [];
  validatedFields: string[] = [];
  requiredFields: string[] = ['projectid', 'project', 'labdate', 'source', 'status']; // Lista de campos requeridos
  opccrud!: string;

  async beforeMount() {
    this.projectlist = (await controllers.getProjects(1)) || [
      // cdc: datos de prueba aqui: actividades o stages de prueba
      ];
    this.projectlist = (await controllers.getProjects(1)) || [];
    let projects: project[] = (await controllers.getProjects(1)) || [];
  }

  data() {
    return {
      requiredFields: ['projectid', 'project', 'labdate', 'source', 'status'],
      projectlist: this.projectlist,
      opccrud: this.opccrud,
      newProject: this.newProject,
      validFields: this.validFields,
    };
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
    // Validar que todos los campos requeridos estén diligenciados
    if (
      this.requiredFields.every(field => this.validFields.includes(field))
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
  this.newProject = {
    id: 0, // Cambiado a 0
    projectId: "",
    name: "",
    labDate: null,
    proDate: null,
    source: "",
    status: null,
  };
 }
}
</script>

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
.text-left {
  // cdc: para alinear el texto a la izquierda
  text-align: left;
}
</style>

<style>
.feedback-container {
  display: flex;
  align-items: flex-start;
  /* Alinea al inicio de forma predeterminada */
}

.valid-feedback, .invalid-feedback {
  display: flex;
  align-items: flex-start; /* Alinea al inicio */
  /* Otras reglas de estilo para los mensajes de retroalimentación */
}
</style>
