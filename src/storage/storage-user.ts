import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/user.dto";

import { USER_STORAGE_KEY } from "./storage-config";

export async function saveUserOnStorage(user: UserDTO): Promise<void> {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export async function getUserFromStorage(): Promise<UserDTO> {
  const data = await AsyncStorage.getItem(USER_STORAGE_KEY);

  const user: UserDTO = data ? JSON.parse(data) : {};

  return user;
}

export async function removeUserFromStorage(): Promise<void> {
  await AsyncStorage.removeItem(USER_STORAGE_KEY);
}
