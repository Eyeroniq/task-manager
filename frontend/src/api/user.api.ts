import api from "./axios";
import type { UsersResponse, UserOption } from "../types/user";

export const getUsers = async (): Promise<UserOption[]> => {
  const response = await api.get<UsersResponse>("/users");
  return response.data.data;
};