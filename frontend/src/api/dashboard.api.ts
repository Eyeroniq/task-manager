import api from "./axios";
import type {
  AdminDashboard,
  UserDashboard,
} from "../types/dashboard";

interface AdminResponse {
  success: boolean;
  data: AdminDashboard;
}

interface UserResponse {
  success: boolean;
  data: UserDashboard;
}

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const response =
    await api.get<AdminResponse>("/dashboard/admin");

  return response.data.data;
};

export const getUserDashboard = async (): Promise<UserDashboard> => {
  const response =
    await api.get<UserResponse>("/dashboard/user");

  return response.data.data;
};