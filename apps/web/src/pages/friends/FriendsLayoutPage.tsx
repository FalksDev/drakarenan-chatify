import { FriendsSidebar } from "components/sidebars/friends/FriendsSidebar";
import { Outlet, useLocation } from "react-router-dom";
import FriendsPage from "./FriendsPage";

export default function FriendsLayoutPage() {
    const { pathname } = useLocation();

    return (
        <div className="flex flex-1">
            <FriendsSidebar />
            {pathname === "/friends" && <FriendsPage />}
            <div className="bg-zinc-800 bg-opacity-75 grow">
                <Outlet />
            </div>
        </div>
    )
} 