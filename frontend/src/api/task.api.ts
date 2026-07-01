import api from "./axios";
import type { Task, CreateTaskRequest } from "../types/task";

interface TasksResponse {
  success: boolean;
  count?: number;
  data: Task[];
}

interface TaskResponse {
  success: boolean;
  data: Task;
}

export const getTasks = async (): Promise<Task[]> => {
  const response =
    await api.get<TasksResponse>("/tasks");

  return response.data.data;
};

export const getTaskById = async (
  id: number
): Promise<Task> => {
  const response =
    await api.get<TaskResponse>(`/tasks/${id}`);

  return response.data.data;
};

export const createTask = async (
  data: CreateTaskRequest
) => {
  const response = await api.post(
    "/tasks",
    data
  );

  return response.data;
};

export const updateTask = async (
  id: number,
  data: CreateTaskRequest
) => {
  const response = await api.put(
    `/tasks/${id}`,
    data
  );

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const updateTaskStatus = async (
  id: number,
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
) => {
  const response = await api.patch(
    `/tasks/${id}/status`,
    { status }
  );

  return response.data;
};