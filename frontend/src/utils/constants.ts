export const API_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const TOKEN_KEY = "task_manager_token";

export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export const TASK_STATUS = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;

export const TASK_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export const USER_KEY = "task_manager_user";