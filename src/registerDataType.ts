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
  labDate: number;
  proDate: number;
  source: string;
  status: boolean;
};
