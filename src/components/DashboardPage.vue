<template>
  <div class="maintitle px-4 mt-3">
    <h1>Dashboard de {{ username }}</h1>
  </div>
  <div class="boxes">
    <div class="box">
      <i
        ><font-awesome-icon icon="timeline" float="left"></font-awesome-icon
      ></i>

      <div class="informacion">
        <span class="text">Horas totales</span>
        <span class="number">1075</span>
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
        <span class="number">45%</span>
      </div>
    </div>
    <div class="box">
      <i><font-awesome-icon icon="calendar"></font-awesome-icon></i>
      <div class="informacion">
        <span class="text">Mes actual</span>
        <span class="number">Dic</span>
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
    <apexchart
      width="400"
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
          height: 375,
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
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import session from "@/controllers/SessionController";
export default class DashboardPage extends Vue {
  username!: string;
  beforeMount() {
    this.username = session.getUserData() === undefined ? "" : session.getUserData().userName;
  }

  data() {
    return {
      username: this.username,
    };
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
</style>
