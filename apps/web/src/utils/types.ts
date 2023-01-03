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

  export type ConversationType =  "group" | "private";

  export type FriendsSidebarItemType = {
    id: string;
    label: string;
    pathname: string;
  }

  export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';

  export type Friend = {
    id: number;
    sender: User;
    receiver: User;
    createdAt: number;
  };

  export type FriendRequest = {
    id: number;
    sender: User;
    receiver: User;
    createdAt: number;
    status: FriendRequestStatus;
  };
  
  export type HandleFriendRequestAction = 'accept' | 'reject' | 'cancel';
  
  export type CancelFriendRequestResponse = {
    id: number;
  };
  
  export type AcceptFriendRequestResponse = {
    friend: Friend;
    friendRequest: FriendRequest;
  };

  export type FriendRequestDetailsType = {
    status: string;
    displayName: string;
    user: User;
    incoming: boolean;
  };