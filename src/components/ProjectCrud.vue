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
                v-on:click="clearModal()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="total-row form-group">
                  <label for="projectid">Número</label>
                  <input
                    v-model="newProject.projectId"
                    class="form-control shadow-none"
                    type="text"
                    id="projectid"
                    :class="{
                      'is-valid': validFields.includes('projectid'),
                      'is-invalid':
                        !validFields.includes('projectid') &&
                        validatedFields.includes('projectid'), // Corregido a 'projectId'
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
                      'is-valid': validFields.includes('project'),
                      'is-invalid':
                        !validFields.includes('project') &&
                        validatedFields.includes('project'),
                    }"
                    @input="
                      validateFields('project', newProject.name.length > 0)
                    "
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
                      inputFormat="yyyy-MM-dd"
                      :class="{
                        'is-valid': validFields.includes('labdate'),
                        'is-invalid':
                          !validFields.includes('labdate') &&
                          validatedFields.includes('labdate'),
                      }"
                      @blur="
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
                      inputFormat="yyyy-MM-dd"
                      :class="{
                        'is-valid': validFields.includes('prodate'),
                        'is-invalid':
                          !validFields.includes('prodate') &&
                          validatedFields.includes('prodate'),
                      }"
                      @blur="
                        validateFields('prodate', newProject.proDate !== '')
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
                      'is-invalid':
                        !validFields.includes('source') &&
                        validatedFields.includes('source'),
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
                    v-model="newProject.status"
                    class="form-select shadow-none"
                    id="status"
                    :class="{
                      'is-valid': validFields.includes('status'),
                      'is-invalid':
                        !validFields.includes('status') &&
                        validatedFields.includes('status'),
                    }"
                    @change="
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
                v-on:click="clearModal()"
              >
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
          v-on:click.prevent="clearModal()"
        >
          <font-awesome-icon icon="plus" /> Crear Proyecto
        </button>
      </div>
      <div class="right-search nav">
        <form class="d-flex" role="search" v-on:click.prevent="">
          <input
            class="form-control me-2 shadow-none"
            id="search"
            type="search"
          />
          <button class="btn btn-primary" type="submit" v-on:click.prevent="">
            Buscar
          </button>
        </form>
      </div>
    </div>
    <div class="table-contain">
      <table class="table text-left">
        <thead>
          <tr>
            <th scope="col">N&uacute;mero</th>
            <th scope="col">Nombre del proyecto</th>
            <th scope="col">Fecha laboratorio</th>
            <th scope="col">Fecha producci&oacute;n</th>
            <th scope="col">Fuente</th>
            <th scope="col">Estado</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projectlist" :key="project.id">
            <td>{{ project.projectId }}</td>
            <td>{{ project.name }}</td>
            <td>
              {{ new Date(project.labDate).toISOString().substring(0, 10) }}
            </td>
            <td>
              {{ new Date(project.proDate).toISOString().substring(0, 10) }}
            </td>
            <td>{{ project.source }}</td>
            <td>{{ project.status ? "Activo" : "Inactivo" }}</td>
            <td>
              <div class="btn-group">
                <a
                  href="#"
                  v-on:click.prevent=""
                  data-bs-toggle="offcanvas"
                  :data-bs-target="'#offcanvas' + project.id"
                  aria-controls="offcanvasExample"
                >
                  <font-awesome-icon icon="user-plus" />
                </a>
                <div
                  class="offcanvas offcanvas-end"
                  tabindex="-1"
                  :id="'offcanvas' + project.id"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                      Administrar usuarios
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="offcanvas-body">
                    <form class="d-flex" role="search" v-on:click.prevent="">
                      <input
                        class="form-control me-2 shadow-none"
                        id="search"
                        type="search"
                      />
                      <button
                        class="btn btn-primary"
                        type="submit"
                        v-on:click.prevent=""
                      >
                        Buscar
                      </button>
                    </form>
                    <div class="table-contain">
                      <table class="table text-left">
                        <thead>
                          <tr>
                            <th></th>
                            <th scope="col">Usuarios</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody
                          v-for="user in users.sort((a: user, b: user) => (a.id - b.id))"
                          :key="user.id"
                        >
                          <td>
                            <img
                              class="avatar-rounded"
                              with="30"
                              height="30"
                              :src="getImage(user)"
                            />
                          </td>
                          <td>{{ user.name }}</td>
                          <td>{{ user.status }}</td>
                          <td>
                            <a
                              href="#"
                              v-on:click.prevent="
                                updateUserProjectStatus(user, project)
                              "
                            >
                              <font-awesome-icon
                                :icon="
                                  project.users.some(
                                    (obj) => obj.name === user.name
                                  )
                                    ? 'minus'
                                    : 'plus'
                                "
                              />
                            </a>
                          </td>
                        </tbody>
                      </table>
                      <div class="modal-footer flex-side">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Cerrar
                        </button>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                          @click=""
                        >
                          Guardar cambios
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
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
import { Vue } from "vue-class-component";
import data from "@/controllers/DataController";
import type { project, user } from "@/registerDataType";
import session from "@/controllers/SessionController";

export default class ProjectCrud extends Vue {
  projectlist: project[] = [];
  users: user[] = [];

  newProject: project = {} as project;
  validFields: string[] = [];
  validatedFields: string[] = [];
  requiredFields: string[] = [
    "projectid",
    "project",
    "labdate",
    "source",
    "status",
  ]; // Lista de campos requeridos
  opccrud!: string;

  async beforeMount() {
    data.setActualDate(new Date());
    await data.collectData();
    this.projectlist = data.getProjects();
    this.users = data.getUsers();
    document.querySelector('.spinner')?.classList.add('hidden');
  }

  beforeUnmount() {
    document.querySelector('.spinner')?.classList.remove('hidden');      
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

  submitForm() {
    this.validateFields("projectid", this.newProject.projectId.length > 0);
    this.validateFields("project", this.newProject.name.length > 0);
    this.validateFields("labdate", this.newProject.labDate !== "");
    this.validateFields("prodate", this.newProject.proDate !== "");
    this.validateFields("source", this.newProject.source.length > 0);
    this.validateFields("status", this.newProject.status !== null);
    // Validar que todos los campos requeridos estén diligenciados
    if (
      this.requiredFields.every((field) => this.validFields.includes(field))
    ) {
      // Todos los campos requeridos están diligenciados, puedes proceder a guardar los cambios.
      // Agrega tu lógica para guardar los cambios aquí.
    } else {
      // Muestra un mensaje de error o realiza alguna acción si no se han diligenciado todos los campos.
    }
  }

  updateUserProjectStatus(user: user, project: project) {
    if (project.users.some((obj) => obj.id == user.id)) {
      // quitar el usuario del proyecto
    } else {
      // agregar el usuario al proyecto
    }
  }

  getImage(user: user): string {
    let userimage = this.users.filter((userin) => {
      if (user === userin) return user;
    });
    if (userimage) {
      return userimage[0].profilePicture;
    } else {
      return "";
    }
  }

  clearModal() {
    // cdc: para limpiar los campos y arreglos al cancelar
    this.validatedFields = [];
    this.validFields = [];
    this.newProject = {} as project;
  }

  beforeCreate(): void {
    if (!session.validateSession) {
      this.$router.push("/login");
    }
  }
}
</script>

<style>
.flex-side {
  display: flex;
  position: absolute;
  bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
}

.flex-side button {
  margin: 5px;
}

.offcanvas-body .d-flex input {
  width: 300px !important;
}

.spinner.active {
  visibility: visible;
}
</style>
