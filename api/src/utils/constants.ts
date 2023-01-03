import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export enum Routes {
    USER = "user",
    USER_PRESENCE = "user/presence",
    AUTH = "auth",
    FRIEND = "friend",
    FRIEND_REQUEST = "friend/request",
    CONVERSATION = "conversations",
    GROUP = "groups",
    GROUP_MESSAGE = 'groups/:id/messages',
    GROUP_RECIPIENT = 'groups/:id/recipients',
    MESSAGE = 'conversations/:id/messages',
    PROFILE = 'users/profiles',
    EXISTS = 'exists',
}

export enum Repositories {
    Session = "SESSION_REPOSITORY",
    USER = "USER_REPOSITORY",
    USER_PRESENCE = "USER_PRESENCE_REPOSITORY",
    FRIEND = "FRIEND_REPOSITORY",
    FRIEND_REQUEST = "FRIEND_REQUEST_REPOSITORY",
    CONVERSATION = "CONVERSATION_REPOSITORY",
    MESSAGE = "MESSAGE_REPOSITORY",
    MESSAGE_ATTACHMENT = "MESSAGE_ATTACHMENT_REPOSITORY",
    GROUP_MESSAGE_ATTACHMENT = "GROUP_MESSAGE_ATTACHMENT_REPOSITORY",
    GROUP = "GROUP_REPOSITORY",
    GROUP_MESSAGE = "GROUP_MESSAGE_REPOSITORY",
    PROFILE = "USER_PROFILE_REPOSITORY",
}

export enum Database {
    DataSource = "DATA_SOURCE"
}

export enum Services {
    USER = "USER_SERVICE",
    AUTH = "AUTH_SERVICE",
    USER_PRESENCE = "USER_PRESENCE_SERVICE",
    FRIEND = "FRIEND_SERVICE",
    FRIEND_REQUEST = "FRIEND_REQUEST_SERVICE",
    GATEWAY_SESSION_MANAGER = "GATEWAY_SESSION_MANAGER",
    SPACE_CLIENT = "SPACE_CLIENT",
    IMAGE_UPLOAD_SERVICE = "IMAGE_UPLOAD_SERVICE",
    CONVERSATION = "CONVERSATION_SERVICE",
    MESSAGE_ATTACHMENT = "MESSAGE_ATTACHMENT_SERVICE",
    GROUP_MESSAGE_ATTACHMENT = "GROUP_MESSAGE_ATTACHMENT_SERVICE",
    GROUP = "GROUP_SERVICE",
    GROUP_MESSAGE = "GROUP_MESSAGE_SERVICE",
    GROUP_RECIPIENT = "GROUP_RECIPIENT_SERVICE",
    MESSAGE = "MESSAGE_SERVICE",
    PROFILE = 'PROFILE_SERVICE',
}

export enum ServerEvents {
    FRIEND_REQUEST_ACCEPTED = 'friendrequest.accepted',
    FRIEND_REQUEST_CREATED = "friendrequest.created",
    FRIEND_REQUEST_REJECTED = 'friendrequest.rejected',
    FRIEND_REQUEST_CANCELLED = 'friendrequest.cancelled',
    FRIEND_REMOVED = 'friend.removed',
}

export enum WebsocketEvents {
    FRIEND_REQUEST_ACCEPTED = 'onFriendRequestAccepted',
    FRIEND_REQUEST_REJECTED = 'onFriendRequestRejected',
    FRIEND_REQUEST_CANCELLED = "onFriendRequestCancelled",
    FRIEND_REQUEST_RECEIVED = "onFriendRequestReceived",
    GET_ONLINE_FRIENDS = "getOnlineFriends",
}

export const UserProfileFileFields: MulterField[] = [
    {
      name: 'banner',
      maxCount: 1,
    },
    {
      name: 'avatar',
      maxCount: 1,
    },
  ];