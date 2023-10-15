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
  labDate: string;
  proDate: string;
  source: string;
  status: string;
};

export type report = {
  id: string | number;
  date: string;
  description: string;
  hours: number;
  title: string;
  stage: string;
  project: string;
};
