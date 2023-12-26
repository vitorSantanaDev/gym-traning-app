import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProviderProps, AuthContextStateType } from "./types";
import { UserDTO } from "@dtos/user.dto";
import { api } from "@services/api";

import {
  getUserFromStorage,
  saveUserOnStorage,
  removeUserFromStorage,
} from "@storage/storage-user";

export const AuthContext = createContext<AuthContextStateType>(
  {} as AuthContextStateType
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userState, setUserState] = useState<UserDTO>({} as UserDTO);
  const [loadingUserStorageData, setLoadingStorageData] = useState(true);

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
        await saveUserOnStorage(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setLoadingStorageData(true);
      setUserState({} as UserDTO);
      await removeUserFromStorage();
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  }

  async function loadUserFromStorage() {
    try {
      setLoadingStorageData(true);
      const userLogged = await getUserFromStorage();

      if (userLogged) {
        setUserState(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  }

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userState, signIn, signOut, loadingUserStorageData }}
    >
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
