import api from "./axios";
import type { Activity } from "../types/activity";

interface ActivityResponse {
  success: boolean;
  count: number;
  data: Activity[];
}

export const getActivities = async (): Promise<Activity[]> => {
  const response =
    await api.get<ActivityResponse>("/activities");

  return response.data.data;
};