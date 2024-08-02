<template>
  <div
    class="d-flex justify-content-center spinner"
    style="
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      width: 100%;
      height: 100%;
      z-index: 999;
    "
  >
    <div
      class="spinner-border text-primary m-auto"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="d-flex flex-column">
    <nav class="navbar" id="navbar">
      <div class="container-fluid justify-content-start">
        <div class="m-0">
          <div class="navbar-brand">
            <img src="/img/logo.png" width="135" />
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
        <div class="m-0 usuario">
          <div class="dropdown p-3">
            <a
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                class="avatar-rounded"
                :src="user.profilePicture"
                width="35"
                height="35"
              />
            </a>
            <ul class="dropdown-menu dropdown-menu-lg-end usuario">
              <li class="userbrand">
                {{ user.name }} {{ user.lastName }}
                <span>{{ user.email }}</span>
              </li>
              <li class="dropdown-divider"></li>
              <a
                href=""
                v-on:click.prevent="$router.push('/profile')"
                id="profile"
              >
                <li class="sidebar-item">
                  <font-awesome-icon icon="pen"></font-awesome-icon>
                  Editar Perfil
                </li>
              </a>

              <a href="" v-on:click.prevent="logout()">
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
            <li class="sidebar-item" v-if="user.rol.id >= 2">
              <font-awesome-icon icon="gears"></font-awesome-icon>
              Administrar
            </li>
          </a>

          <div style="min-height: 120px" v-if="user.rol.id >= 2">
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
                <a
                  href=""
                  v-on:click.prevent="$router.push('/admin')"
                  id="admin"
                >
                  <li class="sidebar-item">
                    <font-awesome-icon icon="users"></font-awesome-icon>
                    Usuarios
                  </li>
                </a>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <!--panel de particulas-->
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
                enable: false,
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
                    area: 800,
                  },
                  value: 200,
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
import { loadFull } from "tsparticles";
import { Engine, Container } from "tsparticles-engine";
import { user } from "@/registerDataType";
import session from "@/controllers/SessionController";

export default class HomePage extends Vue {
  user = session.getUserData();
  logout = session.Logout;
  particlesContainer!: Container;

  data() {
    return {
      user: this.user,
    };
  }

  particlesInit = async (engine: Engine) => {
    if (session.validateSession() === true) {
      await loadFull(engine);
    }
  };

  particlesLoaded = async (container: Container) => {
    this.particlesContainer = container;
  };

  beforeUnmount() {
    if (this.particlesContainer) {
      this.particlesContainer.destroy();
    }
  }

  beforeCreate(): void {
    if (!session.validateSession) {
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped lang="scss">
.logout {
  height: fit-content;
  padding: 40px 0;
}

.logout * {
  margin: 0 auto;
}

.card .dropdown-menu.show {
  display: contents;
}

#admin {
  padding: 1px 0px;
  text-align: left;
}

#collapseWidthExample > * {
  background-color: inherit;
  border: none;
  padding-left: 20px;
}
ul li {
  text-align: center;
  padding: 4px;
}

.userbrand {
  padding: 6px;
  display: block;
}

.userbrand span {
  font-size: 0.8rem;
}

.spinner.hidden {
  visibility: hidden;
}
</style>
