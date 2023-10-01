<template>
  <div class="border-top">
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
          v-on:click.prevent=""
        >
          <i class="fa-solid fa-plus"></i> Crear Proyecto
        </button>
      </div>
      <div class="right-search nav">
        <form class="d-flex" role="search" v-on:click.prevent="">
          <input
            class="form-control me-2 shadow-none"
            type="search"
            aria-label="Search"
          />
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#projectModal"
                v-on:click.prevent=""
              >
                <i class="fa-solid fa-pen"></i>
              </a>
            </td>
            <td>
              <a href="#" v-on:click.prevent="">
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
export default class ProjectCrud extends Vue {}
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
