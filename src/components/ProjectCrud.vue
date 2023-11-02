<template>
  <div class="border-top">
    <div class="modal fade" id="projectModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form class="modal-form" v-on:submit.prevent="" novalidate>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {{ opccrud }} de Proyectos
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
                  <label for="projectid">Número del proyecto:</label>
                  <input
                    v-model="newProject.projectId"
                    class="form-control shadow-none"
                    type="text"
                    id="projectid"
                    :class="{
                      'is-valid': validFields.includes('projectid'),
                      'is-invalid': !validFields.includes('projectid'),
                    }"
                    @input="
                      validateFields(
                        'projectid',
                        newProject.projectId.length > 0
                      )
                    "
                  />
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="project">Nombre del proyecto:</label>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    v-model="newProject.name"
                    id="project"
                    :class="{
                      'is-valid': validFields.includes('name'),
                      'is-invalid': !validFields.includes('name'),
                    }"
                    @input="validateFields('name', newProject.name.length > 0)"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="date">Fecha de laboratorio:</label>
                    <date-picker
                      v-model="newProject.labDate"
                      class="form-control shadow-none"
                      id="labdate"
                      inputFormat="yyyy/MM/dd"
                      :class="{
                        'is-valid': validFields.includes('labdate'),
                        'is-invalid': !validFields.includes('labdate'),
                      }"
                      @closed="
                        validateFields('labdate', newProject.labDate !== '')
                      "
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="date">Fecha de producción:</label>
                    <date-picker
                      v-model="newProject.proDate"
                      class="form-control shadow-none"
                      id="prodate"
                      inputFormat="yyyy/MM/dd"
                      :class="{
                        'is-valid': validFields.includes('prodate'),
                        'is-invalid': !validFields.includes('prodate'),
                      }"
                      @closed="
                        validateFields('prodate', newProject.proDate !== null)
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group">
                  <label for="source">Fuente de desarrollo:</label>
                  <input
                    type="text"
                    id="source"
                    v-model="newProject.source"
                    class="form-control shadow-none"
                    :class="{
                      'is-valid': validFields.includes('source'),
                      'is-invalid': !validFields.includes('source'),
                    }"
                    @input="
                      validateFields('source', newProject.source.length > 0)
                    "
                  />
                </div>
              </div>
              <div class="row">
                <div class="total-row form-group has-validation">
                  <label for="status">Seleccione un estado:</label>
                  <select
                    v-bind:value="newProject.status"
                    class="form-select shadow-none"
                    id="status"
                    :class="{
                      'is-valid': validFields.includes('status'),
                      'is-invalid': !validFields.includes('status'),
                    }"
                    @input="
                      validateFields('status', newProject.status !== null)
                    "
                  >
                    <option :value="false">Inactivo</option>
                    <option :value="true">Activo</option>
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
      <h1>Modulo de proyectos</h1>
    </div>
    <div class="d-flex">
      <div class="left-options">
        <button
          type="submit"
          class="btn btn-primary btn-create"
          data-bs-toggle="modal"
          data-bs-target="#projectModal"
          v-on:click="opccrud = 'Creación'"
          v-on:click.prevent=""
        >
          <font-awesome-icon icon="plus" /> Crear Proyecto
        </button>
      </div>
      <div class="right-search nav">
        <form class="d-flex" role="search" v-on:click.prevent="">
          <input class="form-control me-2 shadow-none" type="search" />
          <button class="btn btn-primary" type="submit" v-on:click.prevent="">
            Buscar
          </button>
        </form>
      </div>
    </div>
    <div class="table-contain">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N&uacute;mero de proyecto</th>
            <th scope="col">Nombre del proyecto</th>
            <th scope="col">Fecha laboratorio</th>
            <th scope="col">Fecha producci&oacute;n</th>
            <th scope="col">Fuente</th>
            <th scope="col">Estado del proyecto</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projectlist" :key="project.id">
            <td>{{ project.projectId }}</td>
            <td>{{ project.name }}</td>
            <td>{{ project.labDate }}</td>
            <td>{{ project.proDate }}</td>
            <td>{{ project.source }}</td>
            <td>{{ project.status ? "Activo" : "Inactivo" }}</td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#projectModal"
                v-on:click="opccrud = 'Edicion'"
                v-on:click.prevent="editProject(project)"
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
                <i class="fa-solid fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import controllers from "@/controllers/RequestController";
import type { project } from "@/registerDataType";
export default class ProjectCrud extends Vue {
  newProject: project = {
    id: NaN,
    labDate: "",
    name: "",
    proDate: "",
    projectId: "",
    source: "",
    status: null,
  };
  projectlist!: project[];
  validFields: string[] = [];
  opccrud!: string;

  async beforeMount() {
    this.projectlist = (await controllers.getProjects(1)) || [
      {
        id: 2,
        labDate: "2023/10/10",
        name: "ampliacion cargos fijos",
        proDate: "2023/10/10",
        projectId: "proy0245",
        source: "fmca046390",
        status: true,
      },
    ];
  }
  data() {
    return {
      projectlist: this.projectlist,
      opccrud: this.opccrud,
      newProject: this.newProject,
      validFields: this.validFields,
    };
  }

  editProject(project: project) {
    this.opccrud = "Edicion";
    this.newProject.id = project.id;
    this.newProject.labDate = new Date(project.labDate);
    this.newProject.name = project.name;
    this.newProject.proDate = new Date(project.proDate);
    this.newProject.projectId = project.projectId;
    this.newProject.source = project.source;
    this.newProject.status = project.status;
    console.log(project.labDate);
  }

  validateFields(fieldName: string, condition: boolean) {
    if (condition) {
      if (!this.validFields.includes(fieldName))
        this.validFields.push(fieldName);
    } else {
      const index = this.validFields.indexOf(fieldName);
      if (this.validFields.includes(fieldName))
        this.validFields.splice(index, 0);
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
