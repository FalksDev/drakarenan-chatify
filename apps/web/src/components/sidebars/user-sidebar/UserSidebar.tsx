import { useContext } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { UserSidebarItem } from "./UserSidebarItem"
import { IoLogOutOutline, IoPeopleOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { Divider } from "../../../ui/Divider";
import { UserSidebarAvatar } from "./UserSidebarAvatar";

export const UserSidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="h-full bg-slate-800 flex-initial w-20">
            <div className="flex flex-col">
                <UserSidebarAvatar />
                <Divider />
                <div className="">
                    <UserSidebarItem toolTip="Sign out" icon={<IoPeopleOutline />} />
                    <UserSidebarItem toolTip="Sign out" icon={<IoChatboxEllipsesOutline />} />
                </div>

                <UserSidebarItem toolTip="Sign out" icon={<IoLogOutOutline />} isLoginIcon={true} />
            </div>
        </div>
    )
}