export type AuthPayload = {
  username: string;
  email: string;
  user_id: string | null;
};

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  deadline: string;
  createdOn: string;
  backlog: string;
  timeline: string;
  createdBy: string;
  collaborators: string[];
  tasks: string[];
  statistics: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdOn: string;
  createdBy: string;
  projectId: string;
  status: string;
  priority: number;
  assigneeId: string;
}

export interface User {
  username: string;
  email: string;
  password: number;
}
export interface UserDetails {
  username: string;
  email: string;
}
