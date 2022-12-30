import { AxiosResponse } from "axios";

export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };

  export type UserCredentialsParams = {
    username: string;
    password: string;
  };

  export type RegisterUserParams = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  export interface ExtendedRegisterUserParams extends RegisterUserParams {
    otherPassword: string;
  }

  export type PostWithCallbackParams = {
    postFunction: () => Promise<AxiosResponse<any, any>>;
    onSuccess?: () => void;
    onError?: () => void;
  }

  export type ConversationType = "group" | "private";