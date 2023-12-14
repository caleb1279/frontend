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
        <span class="number">{{  meanHours }}</span>
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
          actualDate.toLocaleString("default", { month: "short" })
        }}</span>
      </div>
    </div>
  </div>

  <div class="chart">
    <apexchart
      type="line"
      height="300"
      width="850"
      :options="{
        chart: {
          height: 300,
          width: 850,
          type: 'line',
          toolbar: {
            show: false,
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
        },
      }"
      :series="series"
    ></apexchart>
    <div class="projects">
      <h2>Proyectos Activos</h2>
      <br>
      <ul v-for="project in projectlist">
        <li>{{ project }}</li>
      </ul>
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
  projectlist: string[] = [];

  series = [
    {
      name: "Horas",
      data: [
      10, 41, 35, 51, 49, 62, 69, 91, 148, 25,
      ],
    },
  ];

  activities = [
    "SLDA043",
    "SLB042A",
    "SL1346",
    "SL600",
    "SIIL01",
    "SLB001",
    "SL1348",
    "SIRV006",
    "SL1346",
    "SL600",
  ];

  beforeMount() {
    this.username =
      session.getUserData() === undefined || session.getUserData() === null
        ? ""
        : session.getUserData().name;

    if (session.getLocals()) {
      this.actualDate = new Date(session.getLocals().actualdate) || new Date();
    } else {
      this.actualDate = new Date();
    }

    this.reportlist = session.getLocals().reportlist || [];
    let projects: project[] = session.getLocals().projectlist || [];

    if (projects.length > 0) {
      projects.forEach((project) => {
        if (project.name) {
          this.projectlist.push(project.name);
        }
      });
    }

    this.collectData();
  }

  collectData() {
    this.totalHours = 0;
    this.adhierance = 0;
    this.dayActivity = 0;
    this.meanHours = 0;
    let counter = 0;
    let countedDays: (string | Date)[] = [];
    if (this.reportlist !== undefined) {
      this.reportlist.forEach((report) => {
        if (typeof report.hours === "number" && !isNaN(report.hours)) {
          this.totalHours += report.hours;
        }

        if (!countedDays.includes(report.date)) {
          this.dayActivity += 1;
          countedDays.push(report.date);
        }

        this.adhierance += (report.hours / report.estimatedHours) * 100;
        counter += 1;
      });

      this.adhierance = Math.round(this.adhierance / counter);
      this.meanHours = Math.round(this.totalHours / counter);
    }
  }

  data() {
    return {
      username: this.username,
      actualDate: this.actualDate,
    };
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
    if (this.reportlist === undefined) {
      this.reportlist = [];
    }
    let locals = session.getLocals();
    locals.reportlist = this.reportlist;
    locals.actualdate = this.actualDate;
    session.setLocals(locals);
    this.collectData();
  }
}
</script>

<style>
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
  border-radius: 12px;
  width: calc((90% / 5) - 0.4rem);
  padding: 15px 20px;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))
    #000083;
  color: #dbdbdb;
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

.chart {
  display: flex;
  flex-direction: row;
}

.projects {
  border: 1px solid #dbdbdb;
  border-top: none;
  margin: 1.8rem 0.4rem;
  padding: 1.2rem;
}

.projects li {
  text-align: left;
  margin: auto;
}

.projects h2 {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 6px;
}
</style>
