export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assigneeEmail?: string;
  createdBy: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}
