import {
  activity,
  project,
  report,
  user,
  ticket,
  TicketStatus,
} from "@/registerDataType";
import request from "@/controllers/RequestController";
import session from "@/controllers/SessionController";

class DataController {
  reports: report[] = [];
  projects: project[] = [];
  activities: activity[] = [];
  actualDate: Date = new Date();
  userid: number;
  users: user[] = [];
  tickets: ticket[] = [];
  validTicketStatuses: TicketStatus[] = [];

  constructor() {
    this.actualDate = new Date();
    const user = session.getUserData();
    this.userid = user.id;
  }

  async collectData() {
    this.tickets = await request.getTickets();
    this.users = await request.getUsers();
    this.reports = await request.getReports(this.userid, this.actualDate);
    this.projects = await request.getProjects(this.userid);
    this.activities = await request.getActivities();
    this.validTicketStatuses = await request.getValidStatuses();
  }

  totalHours(): number {
    return this.reports.reduce((total, obj) => total + obj.hours, 0);
  }

  projectlist(): string[] {
    const projectlist: string[] = [];
    this.projects.forEach((project) => {
      if (project.status === true) {
        projectlist.push(project.name);
      }
    });

    return projectlist;
  }

  getReports(filteredReport: string): report[] {
    if (filteredReport === "") {
      return this.reports;
    }

    const reportlist: report[] = [];
    this.reports.forEach((report) => {
      if (report.project.name === filteredReport) {
        reportlist.push(report);
      }
    });

    return reportlist;
  }

  getProjects(): project[] {
    /* ******************** */
    return this.projects === undefined ? [] : this.projects;
  }

  getActivities(filteredActivity: string): activity[] {
    if (filteredActivity === "") {
      return this.activities;
    }

    const activitylist: activity[] = [];
    this.activities.forEach((activity) => {
      if (activity.name === filteredActivity) {
        activitylist.push(activity);
      }
    });

    return activitylist;
  }

  getActualDate(): Date {
    return this.actualDate;
  }

  setActualDate(date: Date) {
    this.actualDate = date;
  }

  getUsers(): user[] {
    if (session.getUserData().rol.rolId == "1") {
      return this.users;
    } else {
      return [];
    }
  }

  getTickets(): ticket[] {
    if (session.getUserData().rol.rolId == "1") {
      return this.tickets;
    } else {
      return this.tickets.filter((ticket) => ticket.user === this.userid);
    }
  }

  getValidStatuses(): TicketStatus[] {
    return this.validTicketStatuses;
  }
}

const datos: DataController = new DataController();
export default datos;
