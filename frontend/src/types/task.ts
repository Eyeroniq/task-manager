export type TaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface Creator {
  id: number;
  fullName: string;
}

export interface TaskAssignment {
  user: {
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
  };
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;

  creator: Creator;

  assignments: TaskAssignment[];
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignedUserIds: number[];
}