import { AiOutlineUserSwitch } from "react-icons/ai";
import { FriendsSidebarItemType } from "./types";

export const friendsSidebarItems: FriendsSidebarItemType[] = [
    {
        id: "friends",
        label: "My Friends",
        pathname: "/friends",
    },
    {
        id: "requests",
        label: "Friend Requests",
        pathname: "/friends/requests",
    },
    {
        id: "blocked",
        label: "Blocked",
        pathname: "/friends/blocked"
    },
]

export enum WebsocketEvents {
    FRIEND_REQUEST_ACCEPTED = 'onFriendRequestAccepted',
    FRIEND_REQUEST_REJECTED = 'onFriendRequestRejected',
    FRIEND_REQUEST_CANCELLED = "onFriendRequestCancelled",
    FRIEND_REQUEST_RECEIVED = "onFriendRequestReceived",
    GET_ONLINE_FRIENDS = "getOnlineFriends",
}

export enum CDN_URL {
    BASE = 'https://chuachat.ams3.cdn.digitaloceanspaces.com/',
    ORIGINAL = 'https://chuachat.ams3.cdn.digitaloceanspaces.com/original/',
    PREVIEW = 'https://chuachat.ams3.digitaloceanspaces.com/preview/',
  }