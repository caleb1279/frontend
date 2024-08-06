export type rol = {
  rolId: number;
  rolName: string;
};

export type user = {
  id: number;
  email: string; //correo empresarial
  personalEmail: string; // correo personal
  name: string;
  lastName: string; //apellidos
  /* fullName: string; */
  password: string;
  tipId: number; //tipo de id
  numId: number; //cédula
  /* phone: number; */
  vacationDays: number;
  startContract: Date | string; // fecha de ingreso
  finishContract: Date | string; // fecha de terminacion de contrato
  rol: rol;
  status: string;
  minimumReportDate: Date | string; // fecha minima para reportar actividades
  phone: number;
  phone2: number;
  emergencyPhone: number; //telefono contacto de emergencia
  emergencyContact: string; //nombre contacto de emergencia
  relationshipContact: string; // parentesco del contacto de emergencia
  birthday: Date | string; //cumpleaños
  address: string; //dirección
  workPosition: string; //cargo en la empresa
  profilePicture: string; // imagen de perfil
};

export type activity = {
  id: number;
  name: string;
};

export type project = {
  id: number;
  project_id: string;
  name: string;
  labDate: Date | string;
  proDate: Date | string;
  source: string;
  status: boolean | null;
  users: user[];
};

export type report = {
  id: number;
  date: Date | string;
  detail: string;
  hours: number; // horas reales
  estimatedHours: number; // horas estimadas
  title: string;
  activity: activity;
  project: project;
  user: user;
};

export type TicketStatus = {
  state: string;
};

export type TicketIncident = {
  ticket: string;
  hash: string;
};

export type ticket = {
  user: number;
  subject: string;
  description: string;
  status: TicketStatus;
  incident: TicketIncident;
};

export type googleUserData = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  hd: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: number;
}