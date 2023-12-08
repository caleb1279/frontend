export type rol = {
  id: string | number;
  rolName: string;
};

export type user = {
  userId: string | number;
  email: string; //correo empresarial
  perEmail: string; // correo personal
  userName: string;
  userLastN: string; //apellidos
  rol: string;
  status: string;
  minDate: Date | string; // fecha minima para reportar actividades
  initialDate: Date | string; // fecha de ingreso
  endDate: Date | string; // fecha de terminacion de contrato
  phone1: string | number;
  phone2: string | number;
  phone3: string | number; //telefono contacto de emergencia
  contact: string; //nombre contacto de emergencia
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
