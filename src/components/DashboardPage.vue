<template>
  <br />
  <div class="boxes">
    <div class="box">
      <i
        ><font-awesome-icon icon="timeline" float="left"></font-awesome-icon
      ></i>

      <div class="informacion">
        <span class="text">Horas totales</span>
        <span class="number">{{ totalHours }}</span>
      </div>
    </div>
    <div class="box">
      <i><font-awesome-icon icon="arrow-trend-up"></font-awesome-icon></i>
      <div class="informacion">
        <span class="text">Actividades Totales</span>
        <span class="number">{{ dayActivity }}</span>
      </div>
    </div>
    <div class="box">
      <i><font-awesome-icon icon="arrow-trend-up"></font-awesome-icon></i>
      <div class="informacion">
        <span class="text">Promedio de Horas</span>
        <span class="number">{{ meanHours }}</span>
      </div>
    </div>
    <div class="box">
      <i><font-awesome-icon icon="users-gear"></font-awesome-icon></i>
      <div class="informacion">
        <span class="text">Adherencia</span>
        <span class="number">{{ adhierance }}%</span>
      </div>
    </div>
    <div class="box">
      <i class="clickable" v-on:click.prevent="updateRecords(-1)"
        ><font-awesome-icon icon="less-than"></font-awesome-icon>
      </i>
      <i class="clickable" v-on:click.prevent="updateRecords(1)"
        ><font-awesome-icon icon="greater-than"></font-awesome-icon
      ></i>
      <div class="informacion">
        <span class="text">Mes Actual</span>
        <span class="number">{{
          new Date(actualDate).toLocaleString("default", { month: "short" })
        }}</span>
      </div>
    </div>
  </div>

  <h1
    class="text-left"
    style="margin: 0; margin-top: 12px; margin-left: 56px; margin-bottom: -8px"
  >
    Horas reales vs Horas estimadas
  </h1>
  <div class="container">
    <div class="chart">
      <apexchart
        type="area"
        height="255"
        width="500"
        :key="numberData.length"
        :options="{
          theme: {
            monochrome: {
              enabled: false,
              shadeTo: 'light',
              shadeIntensity: 0.8,
              color: '#000083',
            },
          },
          colors: ['#FC6945', '#960075'],
          chart: {
            stacked: true,
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          title: {
            text: '',
            align: 'left',
          },
          xaxis: {
            categories: activities,
            labels: {
              show: false,
            },
          },
        }"
        :series="[
          {
            name: 'Horas Reales',
            data: numberData2,
          },
          {
            name: 'Horas Estimadas',
            data: numberData,
          },
        ]"
      ></apexchart>
      <apexchart
        type="bar"
        height="225"
        width="300"
        :options="{
          theme: {
            monochrome: {
              enabled: true,
              shadeTo: 'light',
              shadeIntensity: 0.8,
              color: '#D9005C',
            },
          },
          chart: {
            stacked: true,
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: '',
            align: 'left',
          },
          xaxis: {
            reversed: true,
            categories: ['Analisis', 'Desarrollo', 'Pruebas', 'Soporte', 'Documentacion', 'capacitacion'],
            labels: {
              show: false,
            },
          },
          yaxis: {
            reversed: true,
          },
        }"
        :series="[
          {
            name: 'data',
            data: [6, 3, 65, 3, 6, 89]
          }
        ]"
      ></apexchart>
      <div class="projects">
        <h2>Proyectos Activos</h2>
        <br />
        <ul v-for="project in projectlist">
          <a href="#" v-on:click.prevent="filtrarProyecto(project)"
            ><li
              :class="{
                active: filteredID === project,
              }"
            >
              {{ project }}
            </li></a
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import session from "@/controllers/SessionController";
import type { project, report } from "@/registerDataType";
import request from "@/controllers/RequestController";

export default class DashboardPage extends Vue {
  username!: string;
  actualDate!: Date;
  totalHours = 0;
  adhierance = 0;
  meanHours = 0;
  dayActivity = 0;
  reportlist!: report[];
  projects: project[] = [];
  projectlist: string[] = [];
  activities: string[] = [];
  numberData: number[] = [];
  numberData2: number[] = [];
  filteredReport!: string;
  filteredID!: string;

  async beforeMount() {
    this.filteredReport = "";
    this.filteredID = "";

    this.username =
      session.getUserData() === undefined || session.getUserData() === null
        ? ""
        : session.getUserData().name;

    if (session.getLocals()) {
      this.reportlist = session.getLocals().reportlist || [];
      this.projects = session.getLocals().projectlist || [];
      console.log(session.getLocals());
    } else {
      await this.getBackData();
    }

    this.actualDate = new Date(session.getLocals().actualdate) || new Date();

    this.projects.forEach((project) => {
      if (project.name && project.status === true) {
        this.projectlist.push(project.name);
      }
    });

    this.collectData();
  }

  collectData() {
    this.totalHours = 0;
    this.adhierance = 0;
    this.dayActivity = 0;
    this.meanHours = 0;
    let counter = 0;
    this.numberData = [];
    this.numberData2 = [];
    this.activities = [];

    this.reportlist.forEach((report) => {
      if (
        this.filteredReport !== "" &&
        this.filteredReport !== report.project.name
      ) {
        return;
      }

      this.activities.push(report.title);

      if (typeof report.hours === "number" && !isNaN(report.hours)) {
        this.totalHours += report.hours;
        this.numberData.push(report.hours);
      }

      if (
        typeof report.estimatedHours === "number" &&
        !isNaN(report.estimatedHours)
      ) {
        this.numberData2.push(report.estimatedHours);
      }
      this.dayActivity += 1;

      this.adhierance += report.hours / report.estimatedHours;
      counter += 1;
    });

    this.adhierance = Math.round(this.adhierance / counter) * 10;
    this.meanHours = Math.round(this.totalHours / counter);

    if (isNaN(this.adhierance)) this.adhierance = 0;
    if (isNaN(this.meanHours)) this.meanHours = 0;
  }

  data() {
    return {
      username: this.username,
      actualDate: this.actualDate,
      numberData: this.numberData,
      numberData2: this.numberData2,
    };
  }

  filtrarProyecto(proy: string) {
    if (this.filteredReport === "" || this.filteredReport !== proy) {
      this.filteredReport = proy;
      this.filteredID = proy;
    } else {
      this.filteredReport = "";
      this.filteredID = "";
    }

    this.collectData();
  }

  async updateRecords(dir: number) {
    if (
      this.actualDate.getMonth() === new Date().getMonth() &&
      this.actualDate.getFullYear() === new Date().getFullYear() &&
      dir == 1
    )
      return;
    this.reportlist = [];
    let date = this.actualDate;
    this.actualDate = new Date(date.getFullYear(), date.getMonth() + dir, 1);
    this.reportlist = await request.getReports(
      session.getUserData().id,
      this.actualDate
    );
    if (this.reportlist === undefined || this.reportlist === null) {
      this.reportlist = [];
    }
    let locals = session.getLocals();
    locals.reportlist = this.reportlist;
    locals.actualdate = this.actualDate;
    session.setLocals(locals);
    this.collectData();
  }

  async getBackData() {
    let reports = await request.getReports(
      session.getUserData().id,
      new Date()
    );
    let projects: project[] = await request.getProjects(
      session.getUserData().id
    );

    this.reportlist = reports === undefined ? [] : reports;
    this.projects = projects !== undefined ? projects : [];

    this.actualDate = new Date();

    session.setLocals({
      reportlist: this.reportlist,
      projectlist: this.projects,
      actualdate: this.actualDate,
    });
  }
}
</script>

<style scoped lang="scss">
.boxes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 90%;
  margin: auto;
}

.boxes .box {
  display: flex;
  flex-direction: row;
  align-items: right;
  justify-content: space-between;
  width: calc((90% / 5) - 0.4rem);
  padding: 15px 20px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
}

.boxes .box i {
  font-size: 130%;
  margin: auto 0;
}

.boxes .box .text {
  white-space: nowrap;
  font-size: 80%;
  font-weight: 500;
  margin: 3%;
}

.boxes .box .number {
  font-size: 150%;
  font-weight: 500;
}

.informacion {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.clickable:hover {
  cursor: pointer;
}

.container {
  display: flex;
  align-items: center;
  padding: 0;
}

.chart {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: center;
}

.vue-apexcharts {
  margin: 1rem auto;
}

.projects {
  border-left: 1px solid #dbdbdb;
}

.projects ul {
  margin: 0;
  padding: 0;
}

.projects li {
  text-align: left;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dbdbdb;
}

.projects li:hover {
  background-color: #eee;
}

.projects ul .active {
  background-color: #eee;
}

.projects h2 {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 6px;
}
</style>
