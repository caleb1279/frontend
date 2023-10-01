<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class App extends Vue {}
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
