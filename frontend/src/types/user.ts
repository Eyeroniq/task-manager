export interface UserOption {
  id: number;
  fullName: string;
  role: "ADMIN" | "USER";
}

export interface UsersResponse {
  success: boolean;
  data: UserOption[];
}