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