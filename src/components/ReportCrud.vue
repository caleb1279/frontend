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
                  />
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="description">Descripción de la actividad:</label>
                  <textarea
                    v-model="newReport.description"
                    id="description"
                    class="form-control shadow-none"
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
                      :clearable="true"
                      id="date"
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
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="project">Nombre del proyecto:</label>
                  <vue3-simple-typeahead
                    v-model="newReport.project"
                    class="form-control shadow-none"
                    :minInputLength="1"
                    id="project"
                    :items="['One', 'Two', 'Tree']"
                  />
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="stage">Seleccione una etapa:</label>
                  <select
                    v-model="newReport.stage"
                    class="form-select shadow-none"
                    id="stage"
                  >
                    <option value="default">Seleccionar</option>
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
                v-on:click.prevent=""
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
    </div>
  </div>
</template>

<script lang="ts">
import controllers from "@/controllers/RequestController";
import type { activity, report } from "@/registerDataType";
import { Vue } from "vue-class-component";

export default class ReportCrud extends Vue {
  newReport: report = {
    id: 0,
    title: "",
    description: "",
    date: "",
    hours: NaN,
    project: "",
    stage: "",
  };
  activitylist!: activity[];
  reportlist!: report[];
  opccrud!: string;

  async beforeMount() {
    this.activitylist = (await controllers.getActivities()) || [];
    this.reportlist = (await controllers.getReports(1)) || [];
  }

  data() {
    return {
      activitylist: this.activitylist,
      opccrud: this.opccrud,
      reportlist: this.reportlist,
      newReport: this.newReport,
    };
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
