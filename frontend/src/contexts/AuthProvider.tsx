import { useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";

import type { User } from "../types/auth";
import { TOKEN_KEY, USER_KEY } from "../utils/constants";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUserState] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(USER_KEY);

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  const setUser = (newUser: User | null) => {
    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER_KEY);
    }

    setUserState(newUser);
  };

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }

    setTokenState(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setUserState(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}