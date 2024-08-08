import { ticket, TicketStatus } from "@/registerDataType";
import request from "@/controllers/RequestController";
import session from "@/controllers/SessionController";

class DataController {
  /* reports: report[] = [];
  projects: project[] = [];
  activities: activity[] = [];
  actualDate: Date = new Date();
  userid: number;
  users: user[] = []; */
  tickets: ticket[] = [];
  validTicketStatuses: TicketStatus[] = [];

  constructor() {
    const user = session.getUserData();
  }

  async collectData() {
    this.tickets = await request.getTickets();
    /* this.users = await request.getUsers();
    this.reports = await request.getReports(this.userid, this.actualDate);
    this.projects = await request.getProjects(this.userid);
    this.activities = await request.getActivities(); */
    this.validTicketStatuses = await request.getValidStatuses();
  }

  getTickets(): ticket[] {
    if (session.getUserData().rol.rolId == "1") {
      return this.tickets;
    } else {
      return this.tickets; //.filter((ticket) => ticket.user === 1);
    }
  }

  getValidStatuses(): TicketStatus[] {
    return this.validTicketStatuses;
  }
}

const datos: DataController = new DataController();
export default datos;
