import { FC } from "react";
import { FriendsSidebarItemType } from "utils/types";
import { AiOutlineTeam } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type Props = {
    item: FriendsSidebarItemType;
    isActive?: boolean;
};

export const FriendsSidebarItem: FC<Props> = ({item, isActive = false }) => {
    const navigate = useNavigate();

    const isActiveStyle = isActive
        ? "bg-indigo-900"
        : "";

    return (
        <div onClick={() => navigate(item.pathname)} className={`
            cursor-pointer
            text-center rounded-md
          hover:bg-indigo-700 hover:border-indigo-700
            transition ease-in-out duration-200
            mt-3 p-4 drop-shadow-md font-semibold tracking-wider
            ${isActiveStyle}`}>
            {/* <div className="grid grid-cols-4">
                <div className="text-2xl place-self-start ml-2">
                    <AiOutlineTeam />
                </div>
                <div className="place-self-center col-span-2">
                    {item.label}
                </div>
            </div> */}
            {item.label}
        </div>
    )
}