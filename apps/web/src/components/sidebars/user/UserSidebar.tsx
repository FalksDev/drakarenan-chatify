import { useContext } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { UserSidebarItem } from "./UserSidebarItem"
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd, AiOutlineMessage } from 'react-icons/ai'
import { UserSidebarAvatar } from "./UserSidebarAvatar";
import { Divider } from "ui";
import { useLocation } from "react-router-dom";
import { UserAvatar } from "components/avatars/UserAvatar";

export const UserSidebar = () => {
    const { user } = useContext(AuthContext);
    const location  = useLocation();

    return (
        <div className="h-full bg-zinc-800 bg-opacity-75 w-20">
            <div className="grid grid-cols-1 h-full">
                <div className="place-content-start">
                    <div className="pl-3 pr-3 pt-3">
                        <UserAvatar user={user!} />
                    </div>
                    <Divider classes="m-3" />
                    <div className="">
                        <UserSidebarItem
                            navigateTo="/conversations"
                            isActive={location.pathname.includes("/conversation") || location.pathname.includes("/groups")} 
                            toolTip="Sign out" 
                            icon={<AiOutlineMessage />} 
                        />
                        <UserSidebarItem
                            navigateTo="/friends"
                            isActive={location.pathname.includes("/friends")}
                            toolTip="Sign out" 
                            icon={<AiOutlineUsergroupAdd />} 
                        />
                    </div>
                </div>
                <div className="place-self-end w-full mb-1">
                    <UserSidebarItem navigateTo="/login" toolTip="Sign out" icon={<IoLogOutOutline />} isLoginIcon={true} />
                </div>
            </div>
        </div>
    )
}