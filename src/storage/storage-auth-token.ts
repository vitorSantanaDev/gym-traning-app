import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE_KEY } from "./storage-config";

export async function saveAuthTokenOnStorage(token: string): Promise<void> {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export async function getAuthTokenFromStorage(): Promise<string> {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  return token || "";
}

export async function removeAuthTokenFromStorage(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}
