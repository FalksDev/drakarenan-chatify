import { FriendsSidebar } from "components/sidebars/friends/FriendsSidebar";
import { Outlet, useLocation } from "react-router-dom";
import FriendsPage from "./FriendsPage";

export default function FriendsLayoutPage() {
    const { pathname } = useLocation();

    return (
        <>
            <FriendsSidebar />
            {pathname === "/friends" && <FriendsPage />}
            <Outlet />
        </>
    )
} 