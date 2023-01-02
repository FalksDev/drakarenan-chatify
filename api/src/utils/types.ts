import { Friend, FriendRequest, User } from "./typeorm";
import { Request } from 'express';

export type ValidateUserDetails = {
    username: string;
    password: string;
};

export type CreateUserDetails = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type FindUserParams = Partial<{
    id: number;
    email: string;
    username: string;
}>;

export type FindUserOptions = Partial<{
    selectAll: boolean;
}>;

export interface AuthenticatedRequest extends Request {
    user: User;
}

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';

export type DeleteFriendRequestParams = {
    id: number;
    userId: number;
  };

  export type UpdateStatusMessageParams = {
    user: User;
    statusMessage: string;
  };

  export type FriendRequestParams = {
    id: number;
    userId: number;
  };
  
  export type CancelFriendRequestParams = {
    id: number;
    userId: number;
  };

  export type CreateFriendParams = {
    user: User;
    username: string;
  };

  export type AcceptFriendRequestResponse = {
    friend: Friend;
    friendRequest: FriendRequest;
  };