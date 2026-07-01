import { createContext } from "react";
import type { User } from "../types/auth";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;

  token: string | null;
  setToken: (token: string | null) => void;

  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);