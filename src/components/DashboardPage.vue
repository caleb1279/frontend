<template>
  <div class="maintitle px-4 mt-3">
    <h1>Dashboard de {{ username }}</h1>
  </div>
  <!-- <nav aria-label="Page navigation">
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
  </nav> -->
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
        <span class="text">Avance</span>
        <span class="number">71%</span>
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
        <span class="text">Mes actual</span>
        <span class="number">{{
          actualDate.toLocaleString("default", { month: "short" })
        }}</span>
      </div>
    </div>
  </div>
  <div class="charts">
    <apexchart
      width="500"
      type="bar"
      :options="{
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: '8',
            borderRariusWhenStacked: 'last',
            columnWidth: '20%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.8,
            color: '#000083',
          },
        },
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
      }"
      :series="[
        {
          name: 'En curso',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Realizado',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'Pendiente',
          data: [11, 17, 15, 15, 21, 14],
        },
      ]"
    ></apexchart>
    <div class="list" style="
      padding: 10px;
      background-color: red;
      width: 35%;
      height: 350px;
    ">
    </div>
  </div>
  <apexchart
    type="area"
    :options="{
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.8,
          color: '#000083',
        },
      },
      chart: {
        width: '99%',
        type: 'area',
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
    }"
    :series="[
      {
        name: 'Promedio horas estimadas',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Promedio horas reales',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ]"
  ></apexchart>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import session from "@/controllers/SessionController";
import type { report } from "@/registerDataType";
import request from "@/controllers/RequestController";

export default class DashboardPage extends Vue {
  username!: string;
  actualDate!: Date;
  totalHours = 0;
  adhierance = 0;
  reportlist!: report[];

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

    this.collectData();
  }

  collectData() {
    this.totalHours = 0;
    this.adhierance = 0;
    let counter = 0;
    if (this.reportlist !== undefined) {
      this.reportlist.forEach((report) => {
        if (typeof report.hours === "number" && !isNaN(report.hours)) {
          this.totalHours += report.hours;
        }

        this.adhierance += (report.hours/report.estimatedHours)*100;
        counter += 1;
      });

      this.adhierance = Math.round(this.adhierance/counter);
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
  padding: 25px;
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
  width: calc((90% / 4) - 15px);
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
.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.charts * {
  margin: auto !important;
}

.clickable:hover {
  cursor: pointer;
}
</style>
