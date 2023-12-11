export type rol = {
  id: string | number;
  rolName: string;
};

export type user = {
  id: string | number;
  email: string; //correo empresarial
  perEmail: string; // correo personal
  userName: string;
  userLastN: string; //apellidos
  /* fullName: string; */
  password: string;
  tipId: number; //tipo de id
  numId: number; //cédula
  /* phone: number; */
  vacationDays: number;
  startContract: Date | string; // fecha de ingreso
  finshContract: Date | string; // fecha de terminacion de contrato
  rol: rol;
  status: string;
  minDate: Date | string; // fecha minima para reportar actividades
  phone1: number;
  phone2: number;
  phone3: number; //telefono contacto de emergencia
  contact: string; //nombre contacto de emergencia
  relatedTo: string; // parentesco del contacto de emergencia
  birthday: Date | string; //cumpleaños
  address: string; //dirección
  position: string; //cargo en la empresa
  profileimage: string; // imagen de perfil
};

export type activity = {
  id: string | number;
  name: string;
};

export type project = {
  id: string | number;
  projectId: string;
  name: string;
  labDate: Date | string;
  proDate: Date | string;
  source: string;
  status: boolean | null;
};

export type report = {
  id: string | number;
  date: Date | string;
  detail: string;
  hours: number;
  title: string;
  activity: activity;
  project: project;
  user: user;
};
