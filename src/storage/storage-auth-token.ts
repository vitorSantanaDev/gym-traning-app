import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE_KEY } from "./storage-config";

type StorageAuthTokenData = {
  token: string;
  refresh_token: string;
};

export async function saveAuthTokenOnStorage({
  token,
  refresh_token,
}: StorageAuthTokenData): Promise<void> {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE_KEY,
    JSON.stringify({ token, refresh_token })
  );
}

export async function getAuthTokenFromStorage(): Promise<StorageAuthTokenData> {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  const { token, refresh_token }: StorageAuthTokenData = response
    ? JSON.parse(response)
    : {};

  return { token, refresh_token };
}

export async function removeAuthTokenFromStorage(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}
