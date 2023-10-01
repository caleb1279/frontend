<template>
  <div class="d-flex flex-column">
    <div class="content f-1">
      <h1 class="fw-bold">404</h1>
      <h2>Lo sentimos, esta página no está disponible.</h2>
      <p>
        La url a la que usted está intentando acceder no es válida o no existe.
        <a href="#" v-on:click.prevent="$router.back()">
          <i class="in-link">Volver a la página anterior.</i>
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class ErrorNotFound extends Vue {}
</script>

<style scoped lang="scss">
.content {
  margin: auto;
}
</style>
