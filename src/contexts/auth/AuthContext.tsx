import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProviderProps, AuthContextStateType } from "./types";
import { UserDTO } from "@dtos/user.dto";
import { api } from "@services/api";

import {
  getUserFromStorage,
  saveUserOnStorage,
  removeUserFromStorage,
} from "@storage/storage-user";
import {
  getAuthTokenFromStorage,
  removeAuthTokenFromStorage,
  saveAuthTokenOnStorage,
} from "@storage/storage-auth-token";

export const AuthContext = createContext<AuthContextStateType>(
  {} as AuthContextStateType
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userState, setUserState] = useState<UserDTO>({} as UserDTO);
  const [loadingUserStorageData, setLoadingStorageData] = useState(true);

  function userAndTokenUpdate({
    user: userData,
    token,
  }: {
    user: UserDTO;
    token: string;
  }) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUserState(userData);
  }

  async function userAndTokenStorageSave({
    user: userData,
    token,
  }: {
    user: UserDTO;
    token: string;
  }) {
    try {
      setLoadingStorageData(true);
      await saveUserOnStorage(userData);
      await saveAuthTokenOnStorage(token);
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  }

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        setLoadingStorageData(true);
        await userAndTokenStorageSave({ user: data.user, token: data.token });
        userAndTokenUpdate({ user: data.user, token: data.token });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  }

  async function signOut() {
    try {
      setLoadingStorageData(true);
      setUserState({} as UserDTO);
      await removeUserFromStorage();
      await removeAuthTokenFromStorage();
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
      const token = await getAuthTokenFromStorage();

      if (token && userLogged) {
        userAndTokenUpdate({ user: userLogged, token });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUserState(userUpdated);
      await saveUserOnStorage(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: userState,
        signIn,
        signOut,
        loadingUserStorageData,
        updateUserProfile,
      }}
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
