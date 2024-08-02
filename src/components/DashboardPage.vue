<template>
  <br />
  <div class="boxes">
    <div class="box">
      <i
        ><font-awesome-icon icon="timeline" float="left"></font-awesome-icon
      ></i>

      <div class="informacion">
        <span class="text">Horas totales</span>
        <span class="number">{{ getTotalHours()[0] }}</span>
      </div>
    </div>
    <div class="box">
      <i><font-awesome-icon icon="arrow-trend-up"></font-awesome-icon></i>
      <div class="informacion">
        <span class="text">Actividades Totales</span>
        <span class="number">{{ reports.length }}</span>
      </div>
    </div>
    <div class="box">
      <i><font-awesome-icon icon="arrow-trend-up"></font-awesome-icon></i>
      <div class="informacion">
        <span class="text">Promedio de Horas</span>
        <span class="number">{{
          Math.round(getTotalHours()[0] / reports.length)
        }}</span>
      </div>
    </div>
    <div class="box">
      <i><font-awesome-icon icon="users-gear"></font-awesome-icon></i>
      <div class="informacion">
        <span class="text">Adherencia</span>
        <span class="number"
          >{{
            Math.round((getTotalHours()[1] * 100) / getTotalHours()[0])
          }}%</span
        >
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
            /*animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 10,
              animateGradually: {
                  enabled: true,
                  delay: 800,
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350,
              }},
            */
            stacked: false,
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
          title: {
            text: '',
            align: 'left',
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            categories: reports.map((obj) => obj.title),
            labels: {
              show: false,
            },
          },
        }"
        :series="[
          {
            name: 'Horas Reales',
            data: reports.map((obj) => obj.hours),
          },
          {
            name: 'Horas Estimadas',
            data: reports.map((obj) => obj.estimatedHours),
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
              color: '#C9345D',
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
            categories: activities.map((obj) => obj.name),
            labels: {
              show: false,
            },
          },
        }"
        :series="[
          {
            name: 'data',
            data: getActivityResume(),
          },
        ]"
      ></apexchart>
      <div class="projects">
        <h2>Proyectos Activos</h2>
        <br />
        <ul v-for="project in projects">
          <a href="#" v-on:click.prevent="filtrarProyecto(project.name)"
            ><li
              :class="{
                active: filteredReport === project.name,
              }"
            >
              {{ project.name }}
            </li></a
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import type { activity, project, report } from "@/registerDataType";
import datacontroller from "@/controllers/DataController";
import session from "@/controllers/SessionController";

export default class DashboardPage extends Vue {
  actualDate!: Date;
  datos: any = datacontroller;

  reports: report[] = [];
  projects: project[] = [];
  activities: activity[] = [];

  filteredReport: string = "";

  async beforeMount() {
    this.actualDate = new Date();
    await this.collectData();
    document.querySelector(".spinner")?.classList.add("hidden");
  }

  beforeUnmount() {
    document.querySelector(".spinner")?.classList.remove("hidden");
  }

  data() {
    return {
      filteredReport: this.filteredReport,
      projects: this.projects,
      reports: this.reports,
      activities: this.activities,
    };
  }

  async collectData() {
    this.datos.setActualDate(this.actualDate);
    await this.datos.collectData();
    this.reports = this.datos.getReports(this.filteredReport);
    this.projects = this.datos.getProjects();
    this.activities = this.datos.getActivities("");
  }

  filtrarProyecto(proy: string) {
    if (this.filteredReport === "" || this.filteredReport !== proy) {
      this.filteredReport = proy;
    } else {
      this.filteredReport = "";
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

    let date = this.actualDate;
    this.actualDate = new Date(date.getFullYear(), date.getMonth() + dir, 1);

    this.collectData();
  }

  getActivityResume() {
    let totalActivityHours: number[] = [];
    this.activities.forEach((activity) => {
      let totalHours = 0;

      this.reports.forEach((report) => {
        if (report.activity.id === activity.id) {
          totalHours += report.hours;
        }
      });

      totalActivityHours.push(totalHours);
    });

    return totalActivityHours;
  }

  getTotalHours() {
    let totalHours = 0;
    let totalEstimated = 0;
    this.reports.forEach((report) => {
      totalHours += report.hours;
      totalEstimated += report.estimatedHours;
    });

    return [totalHours, totalEstimated];
  }

  beforeCreate(): void {
    if (!session.validateSession) {
      this.$router.push("/login");
    }
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
