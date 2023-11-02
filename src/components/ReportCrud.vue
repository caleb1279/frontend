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
              ></button>
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
                      'is-invalid': !validFields.includes('title'),
                    }"
                    @input="validateFields('title', newReport.title.length > 0)"
                  />
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
                      'is-invalid': !validFields.includes('description'),
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
                        'is-invalid': !validFields.includes('date'),
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
                      :class="{
                        'is-valid': validFields.includes('hours'),
                        'is-invalid': !validFields.includes('hours'),
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
                    v-bind:value="nomProyecto"
                    class="form-control shadow-none"
                    :minInputLength="1"
                    id="project"
                    :items="projectlist"
                    :class="{
                      'is-valid': validFields.includes('project'),
                      'is-invalid': !validFields.includes('project'),
                    }"
                    @input="validateFields('project', nomProyecto.length > 0)"
                  />
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="stage">Seleccione una etapa:</label>
                  <select
                    v-bind:value="newReport.activity"
                    class="form-select shadow-none"
                    id="stage"
                    :class="{
                      'is-valid': validFields.includes('stage'),
                      'is-invalid': !validFields.includes('stage'),
                    }"
                    @change="
                      validateFields(
                        'stage',
                        newReport.activity !== null &&
                          newReport.activity.name.length > 0
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
              >
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
          v-on:click.prevent=""
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
            <td>{{ report.activity != null ? report.activity.name : "" }}</td>
            <td>
              {{ report.project.name !== null ? report.project.name : "" }}
            </td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#activityModal"
                v-on:click="opccrud = 'Edicion'"
                v-on:click.prevent="editActivity(report)"
              >
                <font-awesome-icon icon="pen" />
              </a>
            </td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#activityModal"
                v-on:click="opccrud = 'Eliminacion'"
                v-on:click.prevent=""
              >
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
  nomProyecto = "";
  newReport: report = {
    id: 0,
    title: "",
    detail: "",
    date: "",
    hours: NaN,
    project: {
      id: "",
      projectId: "",
      name: "",
      labDate: "",
      proDate: "",
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
  opccrud!: string;

  async beforeMount() {
    this.activitylist = (await controllers.getActivities()) || [
      {
        id: 1,
        name: "desarrollo",
      },
    ];
    this.reportlist = (await controllers.getReports(1)) || [
      {
        id: 123,
        title: "PAD123",
        detail: "se modifica el pad",
        date: "2023/10/10",
        hours: 2,
        project: {
          id: 1,
          projectId: "proy0245",
          name: "ampliacion cargos fijos",
          labDate: null,
          proDate: null,
          source: "fmca046390",
          status: true,
        },

        activity: "desarrollo",
      },
    ];
    let projects: project[] = (await controllers.getProjects(1)) || [
      {
        id: 1,
        projectId: "proy0245",
        name: "ampliacion cargos fijos",
        labDate: null,
        proDate: null,
        source: "fmca046390",
        status: true,
      },
    ];
    //this.projectlist = (await controllers.getProjects(1)) || [];
    this.projectlist = projects.map((project) => project.name);
  }

  editActivity(report: report) {
    this.opccrud = "Edicion";
    this.newReport.id = report.id;
    this.newReport.title = report.title;
    this.newReport.detail = report.detail;
    this.newReport.date = new Date(report.date);
    this.newReport.hours = report.hours;
    this.nomProyecto = report.project.name;
    this.newReport.activity = report.activity;
  }

  /* deleteActivity(report: report) {
    if (confirm("¿Está seguro de que desea eliminar el registro?")) {
      // Elimina el registro de la base de datos
      controllers.deleteActivity(report.id);

      // Mostrar un mensaje de éxito al usuario
      this.$toast.success("El registro se eliminó correctamente.");
    } else {
      // Mostrar un mensaje de error al usuario
      this.$toast.error("El registro no se pudo eliminar.");
    }
  } */

  data() {
    return {
      activitylist: this.activitylist,
      opccrud: this.opccrud,
      reportlist: this.reportlist,
      newReport: this.newReport,
      validFields: this.validFields,
      projectlist: this.projectlist,
      nomProyecto: this.nomProyecto,
    };
  }

  validateFields(fieldName: string, condition: boolean) {
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
