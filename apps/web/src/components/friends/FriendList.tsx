import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { AuthContext } from "utils/context/AuthContext";
import { FriendListItem } from "./FriendListItem";

export const FriendList = () => {
    const { friends, onlineFriends } = useSelector(
        (state: RootState) => state.friends
      );

    const offlineFriends = friends
    .filter(
    (friend) =>
        !onlineFriends.find((onlineFriend) => onlineFriend.id === friend.id)
    );

    return (
        <div className="m-6 flex flex-col flex-grow h-5/6 overflow-y-auto">
            {onlineFriends.length > 0 && <span className="mb-2 text-lg font-semibold tracking-wide">Online ({onlineFriends.length})</span>}
            {onlineFriends.map((friend) => {
                return <FriendListItem friend={friend} key={friend.id} online={true}/>
            })}

        {offlineFriends.length > 0 && <span className="mb-2 text-lg font-semibold tracking-wide">Offline ({offlineFriends.length})</span>}
        {offlineFriends
            .map((friend) => (
                <FriendListItem friend={friend} key={friend.id} online={false}/>
            ))}
        </div>
    )
}