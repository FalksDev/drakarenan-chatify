import { Friend, FriendRequest, User } from "./typeorm";
import { Request } from 'express';
import { Message } from "./typeorm/entities/Message";
import { MessageAttachment } from "./typeorm/entities/MessageAttachment";
import { GroupMessageAttachment } from "./typeorm/entities/GroupMessageAttachment";
import { Group } from "./typeorm/entities/Group";
import { Conversation } from "./typeorm/entities/Conversation";
import { GroupMessage } from "./typeorm/entities/GroupMessage";

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

export type ImagePermission = 'public-read' | 'private';

export type UploadImageParams = {
key: string;
file: Express.Multer.File;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Attachment extends Express.Multer.File {}

export type UploadMessageAttachmentParams = {
file: Attachment;
messageAttachment: MessageAttachment;
};


export type GetConversationMessagesParams = {
id: number;
limit: number;
};

export type UpdateConversationParams = Partial<{
id: number;
lastMessageSent: Message;
}>;

export type CreateConversationParams = {
    username: string;
    message: string;
  };

export type AccessParams = {
    id: number;
    userId: number;
};

export type UploadGroupMessageAttachmentParams = {
    file: Attachment;
    messageAttachment: GroupMessageAttachment;
  };

  export type EditGroupMessageParams = {
    groupId: number;
    messageId: number;
    userId: number;
    content: string;
  };
  
  export type CreateGroupParams = {
    creator: User;
    title?: string;
    users: string[];
  };
  
  export type FetchGroupsParams = {
    userId: number;
  };
  
  export type CreateGroupMessageParams = {
    author: User;
    attachments?: Attachment[];
    content: string;
    groupId: number;
  };
  
  export type CreateGroupMessageResponse = {
    message: GroupMessage;
    group: Group;
  };
  
  export type DeleteGroupMessageParams = {
    userId: number;
    groupId: number;
    messageId: number;
  };
  
  export type AddGroupRecipientParams = {
    id: number;
    username: string;
    userId: number;
  };
  
  export type RemoveGroupRecipientParams = {
    id: number;
    removeUserId: number;
    issuerId: number;
  };
  
  export type AddGroupUserResponse = {
    group: Group;
    user: User;
  };
  
  export type RemoveGroupUserResponse = {
    group: Group;
    user: User;
  };
  
  export type TransferOwnerParams = {
    userId: number;
    groupId: number;
    newOwnerId: number;
  };
  
  export type LeaveGroupParams = {
    id: number;
    userId: number;
  };
  
  export type CheckUserGroupParams = {
    id: number;
    userId: number;
  };

  export type CreateParticipantParams = {
    id: number;
  };
  
  export type CreateMessageParams = {
    id: number;
    content?: string;
    attachments?: Attachment[];
    user: User;
  };
  
  export type CreateMessageResponse = {
    message: Message;
    conversation: Conversation;
  };
  
  export type DeleteMessageParams = {
    userId: number;
    conversationId: number;
    messageId: number;
  };
  
  export type FindMessageParams = {
    userId: number;
    conversationId: number;
    messageId: number;
  };
  
  export type EditMessageParams = {
    conversationId: number;
    messageId: number;
    userId: number;
    content: string;
  };

  export type UpdateGroupDetailsParams = {
    id: number;
    title?: string;
    avatar?: Attachment;
  };

  export type UpdateUserProfileParams = Partial<{
    about: string;
    banner: Express.Multer.File;
    avatar: Express.Multer.File;
  }>;

  export type UserProfileFiles = Partial<{
    banner: Express.Multer.File[];
    avatar: Express.Multer.File[];
  }>;
