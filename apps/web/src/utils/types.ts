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

  export type PostWithCallbackParams = {
    postFunction: () => Promise<AxiosResponse<any, any>>;
    onSuccess?: () => void;
    onError?: () => void;
  }