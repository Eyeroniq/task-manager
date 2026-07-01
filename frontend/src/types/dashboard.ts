import type { Activity } from "./activity";

export interface AdminDashboard {
  totalUsers: number;
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  recentActivities: Activity[];
}

export interface UserDashboard {
  myTasks: number;
  pending: number;
  inProgress: number;
  completed: number;
  recentActivities: Activity[];
}