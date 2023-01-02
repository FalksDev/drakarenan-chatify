import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { acceptFriendRequestThunk, cancelFriendRequestThunk, rejectFriendRequestThunk } from "store/friends/friendsThunk";
import { Button } from "ui";
import { AuthContext } from "utils/context/AuthContext";
import { getFriendRequestDetails } from "utils/helpers";
import { FriendRequest, HandleFriendRequestAction } from "utils/types"
import {BsCheckCircleFill, BsFillDashCircleFill } from "react-icons/bs";

type Props = {
    item: FriendRequest,
}

export const FriendRequestItem = ({ item } : Props) => {
    const { user } = useContext(AuthContext);
    const details = getFriendRequestDetails(item, user);
    const dispatch = useDispatch<AppDispatch>();

    const handleFriendRequest = (type?: HandleFriendRequestAction) => {
        const { id } = item;
        switch (type) {
          case 'accept':
            return dispatch(acceptFriendRequestThunk(id));
          case 'reject':
            return dispatch(rejectFriendRequestThunk(id));
          default:
            return dispatch(cancelFriendRequestThunk(id));
        }
      };

      const statusText = details.incoming ? "text-indigo-500" : "text-zinc-200";

    return (
        <div className="text-zinc-400 w-full rounded-md bg-zinc-800 p-3 mb-3 grid grid-cols-3 justify-between">
            <div className="flex flex-col">
                <div>
                    Name
                </div>
                <div className="text-zinc-200">
                    { details.displayName }
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    Status
                </div>
                <div className={`${statusText}`}>
                    { details.status }
                </div>
            </div>
            <div className="flex flex-row my-auto justify-self-end">
                {details.incoming && (
                    <BsCheckCircleFill
                    onClick={() => handleFriendRequest("accept")} 
                    className="text-3xl text-green-400 text-opacity-90 hover:text-opacity-70 cursor-pointer transition-all duration-300 mr-4" />
                )}
                
                <BsFillDashCircleFill
                    onClick={() => 
                        details.incoming ? handleFriendRequest("reject") : handleFriendRequest() } 
                    className="text-3xl text-red-400 text-opacity-90 hover:text-opacity-70 cursor-pointer transition-all duration-300" />
            </div>
        </div>
    )
}