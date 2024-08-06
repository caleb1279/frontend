<template>
  <div class="border-top">
    <div class="modal fade" id="projectModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form class="modal-form" v-on:submit.prevent="" novalidate>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {{ opccrud }} de Tickets
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
                  <label for="subject">Asunto</label>
                  <input
                    v-model="subject"
                    class="form-control shadow-none"
                    type="text"
                    id="subject"
                    :class="{
                      'is-valid': false,
                      'is-invalid': false,
                    }"
                    @input="function () {}"
                  />
                </div>
                <div class="total-row form-group">
                  <label for="description">Descripción</label>
                  <input
                    v-model="description"
                    class="form-control shadow-none"
                    type="text"
                    id="description"
                    :class="{
                      'is-valid': false,
                      'is-invalid': false,
                    }"
                    @input="function () {}"
                  />
                </div>
                <div class="total-row form-group">
                  <label for="stage">Seleccione un estado:</label>
                  <select
                    v-model="status"
                    class="form-select shadow-none"
                    id="activity"
                    :class="{
                      'is-valid': false,
                      'is-invalid': false,
                    }"
                    :disabled="opccrud == 'Creación'"
                  >
                    <option v-for="status in validStatus" :key="status.state">
                      {{ status }}
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
                v-on:click="clearModal()"
              >
                Cerrar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="sendCreateTicket()"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="maintitle px-4 mt-3">
    <h1>Modulo Helpdesk</h1>
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
        <font-awesome-icon icon="plus" /> Crear Ticket
      </button>
    </div>
    <div class="right-search nav">
      <form class="d-flex" role="search" v-on:click.prevent="searchTicket()">
        <input
          class="form-control me-2 shadow-none"
          id="search"
          type="search"
        />
        <button class="btn btn-primary" type="submit">Buscar</button>
      </form>
    </div>
  </div>
  <div class="table-contain">
    <table class="table text-left">
      <thead>
        <tr>
          <th scope="col">Ticket</th>
          <th scope="col">Asunto</th>
          <th scope="col">Descripción</th>
          <th scope="col">Estado</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.incident.hash">
          <td>{{ ticket.incident.ticket }}</td>
          <td>{{ ticket.subject }}</td>
          <td>{{ ticket.description }}</td>
          <td>{{ ticket.status.state }}</td>
          <td>
            <a
              href="#"
              v-on:click.prevent="updateTicket(ticket)"
              @click="opccrud = 'Edición'"
              data-bs-toggle="modal"
              data-bs-target="#projectModal"
            >
              <font-awesome-icon icon="pen" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import session from "@/controllers/SessionController";
import { ticket, TicketStatus } from "@/registerDataType";
import data from "@/controllers/DataController";
import request from "@/controllers/RequestController";

export default class TicketsCrud extends Vue {
  tickets!: ticket[];
  opccrud = "";
  subject = "";
  description = "";
  status!: string;
  validStatus!: TicketStatus[];
  activeTicket!: ticket | null;

  async beforeMount() {
    await data.collectData();
    this.tickets = data.getTickets();
    this.tickets = this.tickets.filter((i) => i.subject !== "origin");
    this.validStatus = data.getValidStatuses();
    document.querySelector(".spinner")?.classList.add("hidden");
  }

  data() {
    return {
      tickets: this.tickets,
      subject: this.subject,
      description: this.description,
      status: this.status,
    };
  }

  clearModal() {
    this.subject = "";
    this.description = "";
    this.activeTicket = null;
  }

  async searchTicket() {
    const query = document.getElementById("search") as HTMLInputElement;
    if (query.value == "") {
      await data.collectData();
      this.tickets = data.getTickets();
      this.tickets = this.tickets.filter((i) => i.subject !== "origin");
      return;
    }

    const result = await request.getIncidentTicket(query.value);
    if (result !== null) {
      this.tickets = [result];
    } else {
      this.tickets = this.tickets.filter(
        (ticket: ticket) =>
          ticket.subject.includes(query.value) ||
          ticket.description.includes(query.value) ||
          ticket.status.state === query.value
      );
      console.log(this.tickets);
    }
  }

  async sendCreateTicket() {
    if (this.opccrud == "Creación") {
      await request.createTicket(
        session.getUserData().id,
        this.subject,
        this.description
      );
    } else {
      if (this.activeTicket !== null) {
        await request.updateTicketStatus(this.activeTicket, this.status);
      } else {
        console.log("error, not active ticket in this");
      }
    }
    await data.collectData();
    this.tickets = data.getTickets();
    this.tickets = this.tickets.filter((i) => i.subject !== "origin");
  }

  async updateTicket(ticket: ticket) {
    this.subject = ticket.subject;
    this.description = ticket.description;
    this.status = ticket.status.state;
    this.activeTicket = ticket;
  }

  beforeUnmount() {
    document.querySelector(".spinner")?.classList.remove("hidden");
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
