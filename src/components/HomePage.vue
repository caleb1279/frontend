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
              :src="avatarimage"
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
          <a
            href="#"
            v-on:click.prevent=""
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidthExample"
            aria-expanded="false"
            aria-controls="collapseWidthExample"
          >
            <li class="sidebar-item">
              <font-awesome-icon icon="gears"></font-awesome-icon>
              Administrar
            </li>
          </a>

          <div style="min-height: 120px">
            <div class="collapse" id="collapseWidthExample">
              <div class="card">
                <a
                  href=""
                  v-on:click.prevent="$router.push('/project')"
                  id="project"
                >
                  <li class="sidebar-item">
                    <font-awesome-icon icon="list-check"></font-awesome-icon>
                    Proyectos
                  </li>
                </a>
              </div>
            </div>
          </div>
        </ul>
      </div>

      <div class="container-dock">
        <div id="particles-js">
          <vue-particles
            id="tsparticles"
            :particlesInit="particlesInit"
            :particlesLoaded="particlesLoaded"
            :options="{
              zIndex: {
                value: 99,
              },
              fullScreen: {
                enable: true,
              },
              fpsLimit: 60,
              particles: {
                color: {
                  value: '#ffffff',
                },
                links: {
                  color: '#ffffff',
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: 'none',
                  enable: true,
                  outMode: 'bounce',
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 900,
                  },
                  value: 100,
                },
                opacity: {
                  value: 0.1,
                },
                size: {
                  random: true,
                  value: 5,
                },
              },
              detectRetina: true,
            }"
          />
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import session from "@/controllers/SessionController";
import request from "@/controllers/RequestController";
import { loadFull } from "tsparticles";
import { Engine, Container } from "tsparticles-engine";
import type { activity, report, project } from "@/registerDataType";

export default class HomePage extends Vue {
  user = session.getUserData();

  actualDate = new Date();

  logout = session.Logout;
  particlesContainer!: Container;
  avatarimage = this.user.profileimage;

  particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  particlesLoaded = async (container: Container) => {
    this.particlesContainer = container;
  };

  activitylist!: activity[];
  reportlist!: report[];
  projectlist!: project[];

  mounted() {
    this.$emit("projectlist", this.projectlist);
  }

  async beforeMount() {
    let reports: report[] = await request.getReports(
      this.user.id,
      this.actualDate
    );

    let projects: project[] = await request.getProjects(this.user.id);

    let activities: activity[] = await request.getActivities();

    this.reportlist = reports !== null ? reports : [];
    this.activitylist = activities !== null ? activities : [];
    this.projectlist =
      projects !== null
        ? projects
        : [
            {
              id: 0,
              projectId: "PROY0442",
              name: "Ampliacion de cargos fijos",
              labDate: new Date(),
              proDate: new Date(),
              source: "FMCA046390",
              status: true,
            },
          ];
  }

  beforeUnmount() {
    if (this.particlesContainer) {
      this.particlesContainer.destroy();
    }
  }
}
</script>

<style scoped lang="scss">
.card .dropdown-menu.show {
  display: contents;
}

#admin {
  padding: 1px 3px;
  text-align: left;
}

#collapseWidthExample > * {
  background-color: inherit;
  border: none;
  a {
    padding-left: 20px;
  }
}
</style>
