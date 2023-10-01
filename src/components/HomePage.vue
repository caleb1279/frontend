<template>
  <div class="d-flex flex-column">
    <nav class="navbar bg-body-tertiary navbar-expand-lg" id="navbar">
      <div class="container-fluid justify-content-start">
        <div class="m-0">
          <div class="navbar-brand">
            <img src="/img/logo.png" width="140" />
          </div>
        </div>
      </div>
      <div class="container-fluid justify-content-end">
        <div class="dropdown p-3">
          <a
            class="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <font-awesome-icon icon="bell"></font-awesome-icon>
          </a>
          <ul class="dropdown-menu dropdown-menu-lg-end">
            <li class="dropdown-item">No tienes notificaciones</li>
          </ul>
        </div>
        <div class="m-0">
          <a class="navbar-brand">
            <img
              class="avatar-rounded"
              src="/img/avatar.jpg"
              width="40"
              height="40"
            />
          </a>
        </div>
      </div>
    </nav>

    <div class="wrapper-dock">
      <div class="sidebar">
        <ul>
          <li></li>
          <a href="" v-on:click.prevent="$router.push('/')">
            <li class="sidebar-item">
              <font-awesome-icon icon="home"></font-awesome-icon>
              Dashboard
            </li>
          </a>
          <a href="" v-on:click.prevent="$router.push('/report')">
            <li class="sidebar-item">
              <font-awesome-icon icon="chart-line"></font-awesome-icon>
              Actividades
            </li>
          </a>
          <a href="" v-on:click.prevent="$router.push('/project')">
            <li class="sidebar-item">
              <font-awesome-icon icon="list-check"></font-awesome-icon>
              Proyectos
            </li>
          </a>
        </ul>
        <div class="logout">
          <ul>
            <a href="" v-on:click.prevent="$router.push('/login')">
              <li class="sidebar-item">
                <font-awesome-icon
                  icon="right-from-bracket"
                ></font-awesome-icon>
                Cerrar sesión
              </li>
            </a>
          </ul>
        </div>
      </div>

      <div class="container-dock">
        <div class="figure-content d-flex">
          <figure>
            <img src="/img/decorador.png" />
          </figure>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class ErrorNotFound extends Vue {}
</script>

<style scoped lang="scss">
.logout {
  height: fit-content;
  padding: 40px 0;
}

.logout * {
  margin: 0 auto;
}
</style>
