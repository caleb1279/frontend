<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class App extends Vue {
  created() {
    document.title = "Reporte de Actividades";
  }
}
</script>

<style lang="scss">
#app {
  isolation: isolate;
  width: 100vw;
  height: 100vh;
}

#app > div {
  width: 100%;
  height: 100%;
}
</style>
