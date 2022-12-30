import { useContext } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { UserSidebarItem } from "./UserSidebarItem"
import { IoLogOutOutline, IoPeopleOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { UserSidebarAvatar } from "./UserSidebarAvatar";
import { Divider } from "ui";
import { useEffect } from "react";

export const UserSidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="h-full bg-zinc-800 flex-initial w-20">
            <div className="flex flex-col">
                <UserSidebarAvatar user={user} />
                <Divider classes="m-3" />
                <div className="">
                    <UserSidebarItem toolTip="Sign out" icon={<IoPeopleOutline />} />
                    <UserSidebarItem toolTip="Sign out" icon={<IoChatboxEllipsesOutline />} />
                </div>

                <UserSidebarItem navigateTo="/login" toolTip="Sign out" icon={<IoLogOutOutline />} isLoginIcon={true} />
            </div>
        </div>
    )
}