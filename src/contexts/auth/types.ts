import { UserDTO } from "@dtos/user.dto";

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type AuthContextStateType = {
  user: UserDTO;
  signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void>;
};
