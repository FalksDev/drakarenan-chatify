import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { AuthContext } from "utils/context/AuthContext";
import { Friend } from "utils/types"

type Props = {
    friend: Friend,
    online: boolean
}

export const FriendListItem = ({ friend, online } : Props) => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch<AppDispatch>();

    const friendUserInstance =
        user?.id === friend.sender.id ? friend.receiver : friend.sender;

    return (
        <div className="text-zinc-400 w-full rounded-md bg-zinc-800 p-3 mb-3 grid grid-cols-3 justify-between">
            <div className="flex flex-col">
                <div>
                    Name
                </div>
                <div className="text-zinc-200">
                    {friendUserInstance.firstName} {friendUserInstance.lastName}
                </div>
            </div>
        </div>
    )
}