export type user = {
  email: string;
  password: string;
};

export type activity = {
  id: string | number;
  name: string;
};

export type project = {
  id: string | number;
  projectId: string;
  name: string;
  labDate: Date | null;
  proDate: Date | null;
  source: string;
  status: boolean | null;
};

export type report = {
  id: string | number;
  date: Date | null;
  detail: string;
  hours: number;
  title: string;
  activity: activity | null;
  project: project | null;
};
