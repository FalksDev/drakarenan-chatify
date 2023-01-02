import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { FriendRequestItem } from "./FriendRequestItem";

export const FriendRequestList = () => {
    const friendRequests = useSelector(
        (state: RootState) => state.friends.friendRequests
      );
      
    return (
        <div className="flex flex-col m-6">
            {friendRequests.length === 0 && <div>No incoming friend requests.</div>}
            {friendRequests.map((request) => {
                return <FriendRequestItem item={request} key={request.id} />
            })}
        </div>
    )
}