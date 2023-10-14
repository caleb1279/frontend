<template>
  <div class="border-top">
    <div class="maintitle px-4 mt-3">
      <h1>Reporte de actividades</h1>
    </div>
    <div class="modal" tabindex="-1" id="activityModal" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="processcrud()" novalidate>
            <div class="modal-header">
              <h5 class="modal-title">{{ opccrud }} de Actividades</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                v-on:click="resetcrud()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="total-row form-group has-validation">
                  <label for="title">Nombre de la actividad:</label>
                  <input
                    v-model="newReport.title"
                    class="form-control shadow-none"
                    type="text"
                    id="title"
                    @input="validateField(newReport.title)"
                    :class="[
                      fieldValidation.title ? 'is-valid' : '',
                      !fieldValidation.title ? 'is-invalid' : '',
                    ]"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group has-validation">
                  <label for="description">Descripción de la actividad:</label>
                  <textarea
                    v-model="newReport.description"
                    id="description"
                    class="form-control shadow-none"
                    @input="validateField(newReport.description)"
                    :class="{
                      'is-valid': fieldValidation.description,
                      'is-invalid': !fieldValidation.description,
                    }"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <!-- <div class="col-md-6">
                  <div class="form-group has-validation">
                    <label for="date">Fecha en que se realiza:</label>
                    <b-form-datepicker
                      placeholder=""
                      :min="min"
                      :max="max"
                      v-model="newReport.date"
                      class="form-control shadow-none"
                      :date-format-options="{
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                      }"
                      locale="es"
                      id="date"
                    ></b-form-datepicker>
                  </div>
                </div> -->
                <div class="col-md-6">
                  <div class="form-group has-validation">
                    <label for="hours">Duración en horas:</label>
                    <input
                      type="number"
                      v-model="newReport.hours"
                      class="form-control shadow-none"
                      id="hours"
                      @input="validateField(newReport.hours)"
                      :class="{
                        'is-valid': fieldValidation.hours,
                        'is-invalid': !fieldValidation.hours,
                      }"
                      required
                    />
                  </div>
                </div>
              </div>
              <!-- <div class="row">
                <div class="total-row form-group has-validation">
                  <label for="project">Nombre del proyecto:</label>
                  <vue-bootstrap-autocomplete
                    v-model="newReport.project"
                    class="shadow-none"
                    :minMatchingChars="1"
                    inputClass="shadow-none project-input"
                    id="project"
                    :data="projectlist"
                    required
                  />
                </div>
              </div> -->
              <div class="row">
                <div class="total-row form-group has-validation">
                  <label for="stage">Seleccione una etapa:</label>
                  <select
                    v-model="newReport.stage"
                    class="form-select shadow-none"
                    aria-label="Default select example"
                    id="stage"
                    required
                  >
                    <option v-for="stage in stagelist" v-bind:key="stage">
                      {{ stage }}
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
                @click="resetcrud()"
              >
                Cerrar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="processcrud()"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="left-options">
        <button
          type="submit"
          class="btn btn-primary btn-create"
          data-bs-toggle="modal"
          data-bs-target="#activityModal"
          v-on:click="opccrud = 'Creación'"
        >
          <i class="fa-solid fa-plus"></i> Crear actividad
        </button>
      </div>
      <div class="right-search nav">
        <form class="d-flex" role="search" v-on:click.prevent="">
          <input
            class="form-control me-2 shadow-none"
            type="search"
            aria-label="Search"
          />
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
          <tr v-for="(report, index) in reportlist" v-bind:key="index">
            <td>{{ report.date }}</td>
            <td>{{ report.description }}</td>
            <td>{{ report.hours }}</td>
            <td>{{ report.title }}</td>
            <td>{{ report.stage }}</td>
            <td>{{ report.project }}</td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#activityModal"
                v-on:click.prevent="datedit(report)"
              >
                <i class="fa-solid fa-pen"></i>
              </a>
            </td>
            <td>
              <a href="#" v-on:click.prevent="deletereport(report)">
                <i class="fa-solid fa-trash"></i>
              </a>
            </td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#activityModal"
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
import $ from "jquery";

const today = new Date();
const mindate = new Date(today);
mindate.setDate(mindate.getDate() - 3);

export default class ReportCrud extends Vue {
  min = mindate;
  max = today;
  newReport = {
    title: "",
    description: "",
    date: "",
    hours: "",
    project: "",
    stage: "",
  };

  actualReport!: number;
  reportlist = [this.newReport];
  opccrud!: string;
  stagelist = ["Desarrollo", "Pruebas"];
  pageitemlist!: Array<string>;
  projectlist = ["Ampliacion de cargos fijos"];
  fieldValidation: Record<string, boolean> = {
    title: false,
    description: false,
    date: false,
    hours: false,
    project: false,
    stage: false,
  };

  resetcrud() {
    this.newReport = {
      title: "",
      description: "",
      date: "",
      hours: "",
      project: "",
      stage: "",
    };
    // Restablece todos los estados de validación a falso
    for (const field in this.fieldValidation) {
      this.fieldValidation[field] = false;
    }
    this.actualReport = NaN;
  }
  // Valida que no esté vacío
  validateField(fieldName: string) {
    switch (fieldName) {
      case "title":
        this.fieldValidation.title = fieldName.length > 0;
        break;
      case "description":
        this.fieldValidation.description = fieldName.length > 5;
        break;
      case "hours":
        this.fieldValidation.hours =
          fieldName.length > 0 &&
          Number(fieldName) <= 9 &&
          Number(fieldName) > 0;
        break;
      case "date":
        this.fieldValidation.date = fieldName.length > 0;
        break;
      case "stage":
        this.fieldValidation.stage = fieldName.length > 0;
        break;
      case "project":
        this.fieldValidation.project = fieldName.length > 0;
        break;
    }
  }

  deletereport(report: any) {
    this.reportlist.splice(this.reportlist.indexOf(report), 1);
  }
  datedit(report: any) {
    this.opccrud = "Modificación";
    this.newReport = { ...report };
    this.actualReport = this.reportlist.indexOf(report);
  }

  processcrud() {
    // Validar que ningun campo esté vacío
    this.validateField(this.newReport.title);
    this.validateField(this.newReport.description);
    this.validateField(this.newReport.hours);
    this.validateField(this.newReport.date);
    this.validateField(this.newReport.stage);
    this.validateField(this.newReport.project);
    const isValid = Object.values(this.fieldValidation).every((valid) => valid);
    if (isValid) {
      if (this.opccrud == "Creación") {
        this.reportlist.push({ ...this.newReport });
      } else if (this.opccrud == "Modificación") {
        this.reportlist[this.actualReport] = { ...this.newReport };
      }
      $("#activityModal").modal("hide");
      this.resetcrud();
    }
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
</style>
