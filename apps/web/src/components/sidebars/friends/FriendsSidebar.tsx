import { FriendsSidebarHeader } from "./FriendsSidebarHeader"
import { friendsSidebarItems } from "utils/constants";
import { FriendsSidebarItem } from "./FriendsSidebarItem";
import { useLocation } from "react-router-dom";
import { SidebarLayout } from "components/layouts/SidebarLayout";

export const FriendsSidebar = () => {
    const location = useLocation();

    return (
        <SidebarLayout classes="p-2 pr-5 pl-5 flex-none">
            <FriendsSidebarHeader />
                {friendsSidebarItems.map(item => {
                    return <FriendsSidebarItem isActive={location.pathname === item.pathname} item={item} key={item.id} />
                })}
        </SidebarLayout>
    )
}