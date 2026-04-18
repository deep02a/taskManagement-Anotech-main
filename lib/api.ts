export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface TaskPayload {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  assigneeEmail?: string;
}
