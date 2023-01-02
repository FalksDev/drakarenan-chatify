export enum Routes {
    USER = "user",
    USER_PRESENCE = "user/presence",
    AUTH = "auth",
    FRIEND = "friend",
    FRIEND_REQUEST = "friend/request"
}

export enum Repositories {
    Session = "SESSION_REPOSITORY",
    USER = "USER_REPOSITORY",
    USER_PRESENCE = "USER_PRESENCE_REPOSITORY",
    FRIEND = "FRIEND_REPOSITORY",
    FRIEND_REQUEST = "FRIEND_REQUEST_REPOSITORY"
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
    GATEWAY_SESSION_MANAGER = "GATEWAY_SESSION_MANAGER"
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