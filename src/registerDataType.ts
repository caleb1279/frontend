export type user = {
  email: string;
  userName: string;
  userId: string | number;
  rol: string;
  status: string;
  minDate: Date | string;
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
