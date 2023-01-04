import { AxiosResponse } from "axios";

export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profile?: Profile;
    presence?: UserPresence;
  };

  export type UserPresence = {
    id: number;
    statusMessage?: string;
    showOffline: boolean;
  };

  export type Profile = {
    id: number;
    about?: string;
    avatar?: string;
    banner?: string;
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

  export type Conversation = {
    id: number;
    creator: User;
    recipient: User;
    createdAt: string;
    lastMessageSent: MessageType;
  };
  
  export type CreateConversationParams = {
    username: string;
    message: string;
  };

  export type MessageAttachment = {
    key: string;
  };
  
  export type MessageType = {
    id: number;
    content?: string;
    createdAt: string;
    author: User;
    conversation: Conversation;
    attachments?: MessageAttachment[];
  };
  
  export type GroupMessageType = {
    id: number;
    content?: string;
    createdAt: string;
    author: User;
    group: Group;
    attachments?: MessageAttachment[];
  };
  
  export type FetchMessagePayload = {
    id: number;
    messages: MessageType[];
  };
  
  export type FetchGroupMessagePayload = {
    id: number;
    messages: GroupMessageType[];
  };
  
  export type MessageEventPayload = {
    message: MessageType;
    conversation: Conversation;
  };
  
  export type CreateMessageParams = {
    id: number;
    content: string;
  };
  
  export type ConversationMessage = {
    id: number;
    messages: MessageType[];
  };
  
  export type GroupMessage = {
    id: number;
    messages: GroupMessageType[];
  };
  
  export type DeleteMessageParams = {
    id: number;
    messageId: number;
  };
  
  export type DeleteGroupMessageParams = {
    id: number;
    messageId: number;
  };
  
  export type DeleteMessageResponse = {
    conversationId: number;
    messageId: number;
  };
  
  export type DeleteGroupMessageResponse = {
    groupId: number;
    messageId: number;
  };
  
  export type MessagePanelBodyProps = {
    isTyping: boolean;
  };
  
  export type EditMessagePayload = {
    id: number;
    messageId: number;
    content: string;
  };

  export type Group = {
    id: number;
    title?: string;
    users: User[];
    creator: User;
    owner: User;
    messages: GroupMessageType[];
    createdAt: number;
    lastMessageSent: MessageType;
    lastMessageSentAt: Date;
    avatar?: string;
  };

export type SystemMessageLevel = 'info' | 'warning' | 'error';
export type SystemMessageType = {
  id: number;
  content: string;
  level: SystemMessageLevel;
};

export type GroupMessageEventPayload = {
  message: GroupMessageType;
  group: Group;
};

export type CreateGroupParams = {
  users: string[];
  title: string;
};

export type AddGroupRecipientParams = {
  id: number;
  username: string;
};

export type RemoveGroupRecipientParams = {
  id: number;
  userId: number;
};

export type Points = {
  x: number;
  y: number;
};

export type UserContextMenuActionType = 'kick' | 'transfer_owner' | 'profile';
export type ContextMenuItemType = {
  label: string;
  action: UserContextMenuActionType;
  color: string;
  ownerOnly: boolean;
};

export type AddGroupUserMessagePayload = {
  group: Group;
  user: User;
};

export type RemoveGroupUserMessagePayload = {
  group: Group;
  user: User;
};

export type UpdateGroupOwnerParams = {
  id: number;
  newOwnerId: number;
};

export type UpdateGroupDetailsPayload = {
  id: number;
  data: FormData;
};

export enum UpdateGroupAction {
  NEW_MESSAGE = 'newMessage',
}

export type UpdateGroupPayload = {
  type?: UpdateGroupAction;
  group: Group;
};

export type GroupParticipantLeftPayload = {
  group: Group;
  userId: number;
};

export type Attachment = {
  id: number;
  file: File;
};

  