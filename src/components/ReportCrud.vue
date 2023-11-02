<template>
  <div class="border-top">
    <div class="modal fade" id="activityModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form class="modal-form" v-on:submit.prevent="" novalidate>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {{ opccrud }} de Actividades
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                v-on:click="clearModal()"
              ></button
              ><!-- cdc: se añade la funcion clearModal para limpiar el modal al cerrar con x -->
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="total-row form-group">
                  <label for="title">Nombre de la actividad:</label>
                  <input
                    v-model="newReport.title"
                    class="form-control shadow-none"
                    type="text"
                    id="title"
                    :class="{
                      'is-valid': validFields.includes('title'),
                      'is-invalid':
                        !validFields.includes('title') &&
                        validatedFields.includes('title'), // cdc: otro array para saber si lo ha validado
                    }"
                    @input="validateFields('title', newReport.title.length > 0)"
                  />
                  <!-- cdc: mensaje de campo valido -->
                  <div class="valid-feedback text-left">¡Se ve bien!</div>
                  <!-- cdc: mensaje de campo no valido -->
                  <div class="invalid-feedback text-left">
                    Por favor diligencia este campo
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="description">Descripción de la actividad:</label>
                  <textarea
                    v-model="newReport.detail"
                    id="description"
                    class="form-control shadow-none"
                    :class="{
                      'is-valid': validFields.includes('description'),
                      'is-invalid':
                        !validFields.includes('description') &&
                        validatedFields.includes('description'), // cdc otro array para saber si lo ha validado
                    }"
                    @input="
                      validateFields('description', newReport.detail.length > 0)
                    "
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="date">Fecha en que se realiza:</label>
                    <date-picker
                      v-model="newReport.date"
                      class="form-control shadow-none"
                      id="date"
                      inputFormat="yyyy/MM/dd"
                      :class="{
                        'is-valid': validFields.includes('date'),
                        'is-invalid':
                          !validFields.includes('date') &&
                          validatedFields.includes('date'), // cdc otro array para saber si lo ha validado
                      }"
                      @closed="validateFields('date', newReport.date !== null)"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="hours">Duración en horas:</label>
                    <input
                      v-model="newReport.hours"
                      type="number"
                      class="form-control shadow-none"
                      id="hours"
                      min="0"
                      :class="{
                        'is-valid': validFields.includes('hours'),
                        'is-invalid':
                          !validFields.includes('hours') &&
                          validatedFields.includes('hours'), // cdc otro array para saber si lo ha validado
                      }"
                      @input="validateFields('hours', newReport.hours > 0)"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="project">Nombre del proyecto:</label>
                  <vue3-simple-typeahead
                    v-model="newReport.project.name"
                    class="form-control shadow-none"
                    :minInputLength="1"
                    id="project"
                    :items="projectlist"
                    :class="{
                      'is-valid': validFields.includes('project'),
                      'is-invalid':
                        !validFields.includes('project') &&
                        validatedFields.includes('project'), // cdc otro array para saber si lo ha validado
                    }"
                    @input="
                      validateFields(
                        'project',
                        newReport.project.name.length > 0
                      )
                    "
                  />
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="stage">Seleccione una etapa:</label>
                  <select
                    v-model="newReport.activity"
                    class="form-select shadow-none"
                    id="stage"
                    :class="{
                      'is-valid': validFields.includes('stage'),
                      'is-invalid':
                        !validFields.includes('stage') &&
                        validatedFields.includes('stage'), // cdc otro array para saber si lo ha validado
                    }"
                    @change="
                      validateFields(
                        'stage',
                        newReport.activity !== null // cdc: solo se necesita validar que haya algo debido al for de abajo
                      )
                    "
                  >
                    <option
                      v-for="activity in activitylist"
                      v-bind:key="activity.id"
                    >
                      {{ activity.name }}
                    </option>
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
                <!-- cdc: se añade clearModal para el boton cerrar para no dejar datos -->
                Cerrar
              </button>
              <button type="submit" class="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="maintitle px-4 mt-3">
      <h1>Reporte de actividades</h1>
    </div>
    <div class="d-flex">
      <div class="left-options">
        <button
          type="button"
          class="btn btn-primary btn-create"
          data-bs-toggle="modal"
          data-bs-target="#activityModal"
          v-on:click="opccrud = 'Creación'"
        >
          <font-awesome-icon icon="plus" /> Crear actividad
        </button>
      </div>
      <div class="right-search nav">
        <form class="d-flex" role="search" v-on:click.prevent="">
          <input class="form-control me-2 shadow-none" type="search" />
          <button
            class="btn btn-primary"
            type="submit"
            onclick.prevent="searchdata(searchinput)"
          >
            Buscar
          </button>
        </form>
      </div>
    </div>
    <div class="table-contain">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Fecha creaci&oacute;n</th>
            <th scope="col">Descripci&oacute;n</th>
            <th scope="col">horas</th>
            <th scope="col">Actividad</th>
            <th scope="col">Etapa</th>
            <th scope="col">Proyecto</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reportlist" v-bind:key="report.id">
            <td>{{ report.date }}</td>
            <td>{{ report.detail }}</td>
            <td>{{ report.hours }}</td>
            <td>{{ report.title }}</td>
            <td>{{ report.activity !== null ? report.activity.name : "" }}</td>
            <td>{{ report.project !== null ? report.project.name : "" }}</td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#activityModal"
                v-on:click.prevent=""
              >
                <font-awesome-icon icon="pen" />
              </a>
            </td>
            <td>
              <a href="#" v-on:click.prevent="">
                <font-awesome-icon icon="trash" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import controllers from "@/controllers/RequestController";
import type { activity, project, report } from "@/registerDataType";
import { Vue } from "vue-class-component";

export default class ReportCrud extends Vue {
  newReport: report = {
    id: 0,
    title: "",
    detail: "",
    date: null,
    hours: NaN,
    project: {
      id: "",
      projectId: "",
      name: "",
      labDate: null,
      proDate: null,
      source: "",
      status: null,
    },
    activity: {
      id: "",
      name: "",
    },
  };
  activitylist!: activity[];
  reportlist!: report[];
  projectlist!: string[];
  validFields: string[] = [];
  validatedFields: string[] = []; // cdc: nuevo arreglo para saber si ha sido validado un campo
  opccrud!: string;

  async beforeMount() {
    this.activitylist = (await controllers.getActivities()) || [
      // cdc: datos de prueba aqui: actividades o stages de prueba
      {
        id: 1,
        name: "Desarrollo",
      },
      {
        id: 2,
        name: "Pruebas",
      },
    ];
    this.reportlist = (await controllers.getReports()) || [];
    let projects: project[] = (await controllers.getProjects(1)) || [];
    this.projectlist = projects.map((item) => item.name);
  }

  data() {
    return {
      activitylist: this.activitylist,
      opccrud: this.opccrud,
      reportlist: this.reportlist,
      newReport: this.newReport,
      validFields: this.validFields,
      projectlist: this.projectlist,
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

  clearModal() {
    // cdc: para limpiar los campos y arreglos al cancelar
    this.validatedFields = [];
    this.validFields = [];
    this.newReport = {
      id: 0,
      title: "",
      detail: "",
      date: null,
      hours: NaN,
      project: {
        id: "",
        projectId: "",
        name: "",
        labDate: null,
        proDate: null,
        source: "",
        status: null,
      },
      activity: {
        id: "",
        name: "",
      },
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
