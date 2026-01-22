export type TaskStatus = 'TODO' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToUserId: string;
  createdAt: string;
  updatedAt: string;
}
