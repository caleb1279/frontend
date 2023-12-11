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
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="description">Descripción de la actividad:</label>
                  <textarea
                    v-model="newReport.detail"
                    id="detail"
                    class="form-control shadow-none"
                    :class="{
                      'is-valid': validFields.includes('detail'),
                      'is-invalid':
                        !validFields.includes('detail') &&
                        validatedFields.includes('detail'), // cdc otro array para saber si lo ha validado
                    }"
                    @input="
                      validateFields('detail', newReport.detail.length > 0)
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
                      @blur="validateFields('date', newReport.date !== null)"
                    ></date-picker>
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
                      step="0.5"
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
                    v-model="nomproject"
                    @selectItem="
                      (item: string) => {
                      nomproject = item;
                    }
                    "
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
                    @input="validateFields('project', nomproject.length > 0)"
                  ></vue3-simple-typeahead>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="stage">Seleccione una etapa:</label>
                  <select
                    v-model="newReport.activity.name"
                    class="form-select shadow-none"
                    id="activity"
                    :class="{
                      'is-valid': validFields.includes('activity'),
                      'is-invalid':
                        !validFields.includes('activity') &&
                        validatedFields.includes('activity'), // cdc otro array para saber si lo ha validado
                    }"
                    @change="
                      validateFields(
                        'activity',
                        newReport.activity.name.length > 0 // cdc: solo se necesita validar que haya algo debido al for de abajo
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
              <button type="submit" class="btn btn-primary" @click="submitForm">
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
      <table class="table text-left">
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
          <tr v-for="report in reportlist" :key="report.id">
            <td>{{ new Date(report.date).toISOString().substring(0, 10) }}</td>
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
                v-on:click.prevent="editReport(report)"
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
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
          <li class="page-item">
            <a class="page-link" href="#" v-on:click.prevent="updateRecords(-1)"
              >Previous</a
            >
          </li>
          <!--  <li class="page-item">
            <a class="page-link" href="#" v-on:click.prevent="">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" v-on:click.prevent="">2</a>
          </li-->
          <li class="page-item disabled">
            <a class="page-link">
              {{
                actualDate.toLocaleString("default", {
                  month: "long",
                })
              }}</a
            >
          </li>
          <li
            class="page-item"
            :class="{
              disabled: actualDate.getMonth() === new Date().getMonth(),
            }"
          >
            <a class="page-link" href="#" v-on:click.prevent="updateRecords(1)"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import controllers from "@/controllers/RequestController";
import session from "@/controllers/SessionController";
import type { activity, project, report } from "@/registerDataType";
import { Vue } from "vue-class-component";

export default class ReportCrud extends Vue {
  actualDate = new Date();
  newReport: report = {
    id: 0,
    date: "",
    hours: NaN,
    detail: "",
    title: "",
    activity: {
      id: "",
      name: "",
    },
    project: {
      id: "",
      projectId: "",
      name: "",
      labDate: "",
      proDate: "",
      source: "",
      status: null,
    },
    user: session.getUserData(),
  };
  nomproject = "";
  activitylist!: activity[];
  reportlist!: report[];
  projectlist!: string[];
  projects!: project[];
  validFields: string[] = [];
  validatedFields: string[] = []; // cdc: nuevo arreglo para saber si ha sido validado un campo
  requiredFields: string[] = [
    "title",
    "detail",
    "date",
    "hours",
    "project",
    "activity",
  ];
  opccrud!: string;

  async beforeMount() {
    this.activitylist = await controllers.getActivities(); /* || [
      // cdc: datos de prueba aqui: actividades o stages de prueba
      {
        id: 1,
        name: "Desarrollo",
      },
      {
        id: 2,
        name: "Pruebas",
      },
    ]; */
    this.projects = await controllers.getProjects(1); /* || [
      {
        id: 2,
        labDate: new Date("2023-10-10"),
        name: "ampliacion cargos fijos",
        proDate: new Date("2023-10-10"),
        projectId: "proy0245",
        source: "fmca046390",
        status: true,
      },
    ]; */
    this.projectlist = this.projects.map((item) => item.name);
    this.reportlist = await controllers.getReports(1, this.actualDate); /*  || [
      {
        id: 1,
        title: "SIIL05S",
        detail: "Se crea archivo para extensión de cargos fijos idk.",
        date: new Date(),
        hours: 1,
        project: projects[0],
        activity: this.activitylist[0],
      },
    ]; */
  }

  data() {
    return {
      activitylist: this.activitylist,
      opccrud: this.opccrud,
      reportlist: this.reportlist,
      newReport: this.newReport,
      validFields: this.validFields,
      projectlist: this.projectlist,
      nomproject: this.nomproject,
      actualDate: this.actualDate,
    };
  }

  editReport(report: report) {
    this.opccrud = "Edición";
    this.newReport.id = report.id;
    this.newReport.title = report.title;
    this.newReport.detail = report.detail;
    this.newReport.hours = report.hours;
    this.newReport.project = report.project;
    this.nomproject = report.project.name;
    this.newReport.date = report.date;
    this.newReport.activity = report.activity;
  }

  async submitForm() {
    this.newReport.project.name = this.nomproject;
    this.validateFields("title", this.newReport.title.length > 0);
    this.validateFields("detail", this.newReport.detail.length > 0);
    this.validateFields("date", this.newReport.date !== "");
    this.validateFields("hours", this.newReport.hours !== 0);
    this.validateFields("project", this.newReport.project.name.length > 0);
    this.validateFields("activity", this.newReport.activity.name.length > 0);
    // Validar que todos los campos requeridos estén diligenciados
    if (
      this.requiredFields.every((field) => this.validFields.includes(field))
    ) {
      // Todos los campos requeridos están diligenciados, puedes proceder a guardar los cambios.
      // Agrega tu lógica para guardar los cambios aquí.
      let activity = this.activitylist.filter((name) => {
        if (name.name === this.newReport.activity.name) return name;
      });
      let project = this.projects.filter((name) => {
        if (name.name === this.newReport.project.name) return name;
      });
      this.newReport.activity = activity[0];
      this.newReport.project = project[0];
      console.log(await controllers.sendReport(this.newReport));
    } else {
      // Muestra un mensaje de error o realiza alguna acción si no se han diligenciado todos los campos.
    }
  }

  async updateRecords(dir: number) {
    this.reportlist = [];
    let date = this.actualDate;
    this.actualDate = new Date(date.getFullYear(), date.getMonth() + dir, 1);
    this.reportlist = await controllers.getReports(1, this.actualDate);
    console.log(this.actualDate);
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

  clearModal() {
    // cdc: para limpiar los campos y arreglos al cancelar
    this.validatedFields = [];
    this.nomproject = "";
    this.validFields = [];
    this.newReport = {
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
      user: session.getUserData(),
    };
  }
}
</script>

<style scoped lang="scss">
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

.text-left {
  // cdc: para alinear el texto a la izquierda
  text-align: left;
}
</style>
