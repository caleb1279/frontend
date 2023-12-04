export type user = {
  userId: string | number;
  email: string; //correo empresarial
  perEmail: string; // correo personal
  userName: string;
  rol: string;
  status: string;
  minDate: Date | string; // fecha minima para reportar actividades
  initialDate: Date | string; // fecha de ingreso
  phone1: string | number;
  phone2: string | number;
  phone3: string | number;
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
};
