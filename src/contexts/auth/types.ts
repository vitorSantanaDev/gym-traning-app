import { UserDTO } from "@dtos/user.dto";

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type AuthContextStateType = {
  user: UserDTO;
  loadingUserStorageData: boolean;
  signOut(): Promise<void>;
  signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void>;
  updateUserProfile(userUpdated: UserDTO): Promise<void>;
};
