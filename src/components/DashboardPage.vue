<template>
  <div class="maintitle px-4 mt-3">
    <h1>Dashboard {{ username }}</h1>
  </div>
  <div class="boxes">
    <div class="box">
      <font-awesome-icon icon="timeline"></font-awesome-icon>
      <span class="text">Horas trabajadas</span>
      <span class="number">1075</span>
    </div>
    <div class="box">
      <font-awesome-icon icon="arrow-trend-up"></font-awesome-icon>
      <span class="text">Porcentaje de avance</span>
      <span class="number">71</span>
    </div>
    <div class="box">
      <font-awesome-icon icon="users-gear"></font-awesome-icon>
      <span class="text">Porcentaje de adherencia</span>
      <span class="number">45</span>
    </div>
  </div>
  <div class="charts">
    <apexchart
      width="500"
      type="bar"
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
    this.username = session.getUserData().userName;
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
}

.boxes .box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  width: calc((100% / 3) - 15px);
  padding: 15px 20px;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))
    #000083;
  color: #dbdbdb;
}

.boxes .box i {
  font-size: 45px;
}

.boxes .box .text {
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
  margin: 12px;
}

.boxes .box .number {
  font-size: 40px;
  font-weight: 500;
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
