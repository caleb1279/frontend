<template>
  <div class="maintitle px-4 mt-3">
    <h1>Reporte de actividades</h1>
  </div>
  <div class="d-flex">
    <div class="left-options">
      <button
        type="button"
        class="btn btn-primary btn-create"
        v-on:click.prevent=""
      >
        <font-awesome-icon icon="plus" /> Crear actividad
      </button>
    </div>
    <div class="right-search nav">
      <form class="d-flex" role="search" v-on:click.prevent="">
        <input
          class="form-control me-2 shadow-none"
          id="search"
          type="search"
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
  <nav class="navigation" aria-label="Page navigation">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a
          class="page-link shadow-none"
          href="#"
          v-on:click.prevent="updateRecords(-1)"
          >Previous</a
        >
      </li>
      <li class="page-item disabled">
        <a class="page-link shadow-none">
          {{
            new Date(actualDate).toLocaleString("default", {
              month: "long",
            })
          }}
          <i
            v-if="
              new Date(actualDate).getFullYear() !== new Date().getFullYear()
            "
          >
            - {{ new Date(actualDate).getFullYear() }}
          </i>
        </a>
      </li>
      <li
        class="page-item"
        :class="{
          disabled:
            actualDate.getMonth() === new Date().getMonth() &&
            actualDate.getFullYear() === new Date().getFullYear(),
        }"
      >
        <a
          class="page-link shadow-none"
          href="#"
          v-on:click.prevent="updateRecords(1)"
          >Next</a
        >
      </li>
    </ul>
  </nav>
  <div class="table-contain">
    <table class="table text-left">
      <thead>
        <tr>
          <th scope="col">Fecha creaci&oacute;n</th>
          <th scope="col">Descripci&oacute;n</th>
          <th scope="col">Horas Estimadas</th>
          <th scope="col">Horas Reales</th>
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
          <td>{{ report.estimatedHours }}</td>
          <td>{{ report.hours }}</td>
          <td>{{ report.title }}</td>
          <td>{{ report.activity === null ? "" : report.activity.name }}</td>
          <td>{{ report.project === null ? "" : report.project.name }}</td>
          <td>
            <a href="#" v-on:click.prevent="">
              <font-awesome-icon icon="pen" />
            </a>
          </td>
          <td>
            <a href="#" v-on:click.prevent="deleteReport(report.id)">
              <font-awesome-icon icon="trash" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import datos from "@/controllers/DataController";
import session from "@/controllers/SessionController";
import request from "@/controllers/RequestController";
import type { activity, project, report } from "@/registerDataType";
import { Vue } from "vue-class-component";

export default class ReportCrud extends Vue {
  actualDate!: Date;
  user = session.getUserData();
  newReport: report = {} as report;
  opccrud!: string;
  projects!: string[];
  activitylist!: activity[];
  reportlist!: report[];
  projectlist!: project[];

  createReport() {
    this.opccrud = "Creación";
    this.clearModal();
  }

  async beforeMount() {
    this.actualDate = new Date();
    await datos.collectData();
    this.projectlist = datos.getProjects();
    this.activitylist = datos.getActivities("");
    this.projects = this.projectlist.map((project) => project.name);
    this.reportlist = datos
      .getReports("")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    document.querySelector(".spinner")?.classList.add("hidden");
  }

  data() {
    return {
      activitylist: this.activitylist,
      reportlist: this.reportlist,
      projectlist: this.projectlist,
      opccrud: this.opccrud,
      actualDate: this.actualDate,
      newReport: this.newReport,
      projects: this.projects,
    };
  }

  async deleteReport(id: number) {
    /* let answer = window.confirm("Seguro que desea eliminar el registro?");
    if (answer) {
      await request.deleteReport(id);
      this.updateRecords(0);
    } */
    console.log("eliminar registro working paused");
  }

  beforeUnmount() {
    document.querySelector(".spinner")?.classList.remove("hidden");
  }

  async updateRecords(dir: number) {
    this.reportlist = [];
    let date = this.actualDate;
    this.actualDate = new Date(date.getFullYear(), date.getMonth() + dir, 1);
    datos.setActualDate(this.actualDate);
    await datos.collectData();
    this.reportlist = datos
      .getReports("")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  clearModal() {
    this.newReport = {} as report;
  }

  beforeCreate(): void {
    if (!session.validateSession) {
      this.$router.push("/login");
    }
  }
}
</script>

<style>
.navigation {
  margin: 0 25px;
}

.navigation a {
  color: black;
}

.navigation a:hover,
.navigation a:focus {
  color: initial;
}
</style>
