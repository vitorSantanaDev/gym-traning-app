import { createContext, useContext, useState } from "react";
import { AuthContextProviderProps, AuthContextStateType } from "./types";
import { UserDTO } from "@dtos/user.dto";
import { api } from "@services/api";

export const AuthContext = createContext<AuthContextStateType>(
  {} as AuthContextStateType
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userState, setUserState] = useState<UserDTO>({} as UserDTO);

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user) {
        setUserState(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user: userState, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
}
