import { activity, project, report, user } from "@/registerDataType";
import request from "@/controllers/RequestController";
import session from "@/controllers/SessionController";

class DataController {
  reports: report[] = [];
  projects: project[] = [];
  activities: activity[] = [];
  actualDate: Date = new Date();
  userid: number;
  users: user[] = [];

  constructor() {
    this.actualDate = new Date();
    let user = session.getUserData();
    this.userid = user.id;
  }

  async collectData() {
    this.users = await request.getUsers() || [
      {
        userId: "39393939",
        name: "Esteban",
        lastName: "Rosa",
        rol: "Administrador",
        minimumReportDate: "2023/11/11",
        status: "Disponible",
        email: "estebanrosa@empresa.com",
        personalEmail: "estebanrosa@personal.com",
        phone: 3103030303,
        phone2: 3104040404,
        emergencyPhone: 3105050505,
        birthday: "1987/06/11",
        address: "calle 1 # 10 - 10",
        workPosition: "Director",
        emergencyContact: "Julian Rosa",
        profilePicture:
          "https://www.imagenesbonitasname.com/covers/preview/fondo-de-perfil-watsapp-flor-rosa.jpg",
        startContract: "2023/08/09",
        finishContract: "2024/08/09",
        relationshipContact: "Padre",
      },
      {
        userId: "39393938",
        name: "Maria",
        lastName: "Rosa",
        rol: "Lider de equipo",
        minimumReportDate: "2023/11/11",
        status: "Disponible",
        email: "mariarosa@empresa.com",
        personalEmail: "mariarosa@personal.com",
        phone: 3103030303,
        phone2: 3104040404,
        emergencyPhone: 3105050505,
        birthday: "1987/06/11",
        address: "calle 1 # 10 - 10",
        workPosition: "Director",
        emergencyContact: "Julian Rosa",
        profilePicture:
          "https://www.imagenesbonitasname.com/covers/preview/fondo-de-perfil-watsapp-flor-rosa.jpg",
        startContract: "2023/06/09",
        relationshipContact: "Padre",
      },
    ];
    this.reports = (await request.getReports(
      this.userid,
      this.actualDate
    )) || [
      {
        id: 101,
        title: "Nombre programa",
        detail: "Detalle alineado a la izquierda",
        date: new Date(),
        hours: 8,
        estimatedHours: 5,
        project: { name: "Leasing" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 102,
        title: "Programa de Leasing",
        detail: "Detalle alineado a la derecha",
        date: new Date(),
        hours: 3,
        estimatedHours: 3,
        project: { name: "Leasing" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 103,
        title: "Prueba de Leasing",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 5,
        estimatedHours: 2,
        project: { name: "Leasing" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 104,
        title: "Reporte de circular",
        detail: "Modificacion",
        date: new Date(),
        hours: 4,
        estimatedHours: 4,
        project: { name: "Circular 006" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 105,
        title: "Otra Prueba",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 15,
        estimatedHours: 4,
        project: { name: "Leasing" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 106,
        title: "Prueba de Leasing II",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 6,
        estimatedHours: 3,
        project: { name: "Leasing" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 101,
        title: "Programa de desembolsos",
        detail: "Detalle alineado a la izquierda",
        date: new Date(),
        hours: 8,
        estimatedHours: 7,
        project: { name: "Desembolsos digitales" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 102,
        title: "Prueba de cargos fijos",
        detail: "Detalle alineado a la derecha",
        date: new Date(),
        hours: 7,
        estimatedHours: 13,
        project: { name: "cajitas" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 103,
        title: "Programa masivo",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 5,
        estimatedHours: 4,
        project: { name: "Desembolsos digitales" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 104,
        title: "Modificacion de pointers",
        detail: "Modificacion",
        date: new Date(),
        hours: 9,
        estimatedHours: 8,
        project: { name: "Cajitas" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 105,
        title: "PAD de cargue masivo",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 1,
        estimatedHours: 1,
        project: { name: "Desembolsos digitales" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 106,
        title: "PAD de cargue masivo II",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 6,
        estimatedHours: 4,
        project: { name: "Desembolsos digitales" },
        activity: { id: 2, name: "Desarrollo" },
      },

      {
        id: 104,
        title: "Modificacion de pointers",
        detail: "Modificacion",
        date: new Date(),
        hours: 8,
        estimatedHours: 8,
        project: { name: "Proyecto Reportes" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 105,
        title: "PAD de cargue masivo",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 8,
        estimatedHours: 8,
        project: { name: "Proyecto Reportes" },
        activity: { id: 2, name: "Desarrollo" },
      },
      {
        id: 106,
        title: "PAD de cargue masivo II",
        detail: "Analisis de la prueba de leasing",
        date: new Date(),
        hours: 8,
        estimatedHours: 8,
        project: { name: "Proyecto Reportes" },
        activity: { id: 2, name: "Desarrollo" },
      },
    ];

    this.projects = (await request.getProjects(this.userid)) || [
      {
        id: 1,
        projectId: "PROY0442",
        name: "Cajitas",
        labDate: new Date(),
        proDate: new Date(),
        source: "fmca046390",
        status: true,
      },
      {
        id: 2,
        projectId: "PROY0784",
        name: "Desembolsos digitales",
        labDate: new Date(),
        proDate: new Date(),
        source: "fmca046391",
        status: true,
      },
      {
        id: 2,
        projectId: "PROY0562",
        name: "Leasing",
        labDate: new Date(),
        proDate: new Date(),
        source: "fmca047344",
        status: true,
      },
      {
        id: 2,
        projectId: "PROY07643",
        name: "Circular 006",
        labDate: new Date(),
        proDate: new Date(),
        source: "fmca0473473",
        status: true,
      },
      {
        id: 2,
        projectId: "PROY0734",
        name: "Proyecto Reportes",
        labDate: new Date(),
        proDate: new Date(),
        source: "fmca0473473",
        status: true,
      },
    ];

    this.activities = (await request.getActivities()) || [
      { id: 0, name: "Analisis" },
      { id: 1, name: "Diseño" },
      { id: 2, name: "Desarrollo" },
      { id: 3, name: "Pruebas" },
      { id: 4, name: "Soporte" },
      { id: 5, name: "capacitación" },
    ];
  }

  totalHours() {
    return this.reports.reduce((total, obj) => total + obj.hours, 0);
  }

  projectlist() {
    let projectlist: string[] = [];
    this.projects.forEach((project) => {
      if (project.status === true) {
        projectlist.push(project.name);
      }
    });

    return projectlist;
  }

  getReports(filteredReport: string) {
    if (filteredReport === "") {
      return this.reports;
    }

    let reportlist: report[] = [];
    this.reports.forEach((report) => {
      if (report.project.name === filteredReport) {
        reportlist.push(report);
      }
    });

    return reportlist;
  }

  getProjects() {
    return this.projects;
  }

  getActivities(filteredActivity: string) {
    if (filteredActivity === "") {
      return this.activities;
    }

    let activitylist: activity[] = [];
    this.activities.forEach((activity) => {
      if (activity.name === filteredActivity) {
        activitylist.push(activity);
      }
    }); 

    return activitylist;
  }

  getActualDate() {
    return this.actualDate;
  }

  setActualDate(date: Date) {
    this.actualDate = date;
  }

  getUsers() {
    return this.users;
  }
}

var datos: DataController = new DataController();
export default datos
