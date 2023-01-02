import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch } from 'store'
import { removeFriendRequest } from 'store/friends/friendsSlice'
import { WebsocketEvents } from 'utils/constants'
import { AuthContext } from 'utils/context/AuthContext'
import { SocketContext } from 'utils/context/SocketContext'
import { AcceptFriendRequestResponse, FriendRequest } from 'utils/types'
import { AppLayout } from '../components/layouts/AppLayout'
import { UserSidebar } from '../components/sidebars/user/UserSidebar'
import { BsFillPersonCheckFill } from "react-icons/bs";
import { fetchFriendRequestThunk } from 'store/friends/friendsThunk'
import { AiOutlineUserAdd } from "react-icons/ai";

export default function AppPage() {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFriendRequestThunk());
  }, [dispatch]);

  useEffect(() => {
    console.log("Registering friend-request events in AppPage");
    socket.on(WebsocketEvents.FRIEND_REQUEST_RECEIVED, (payload: FriendRequest) => {
      console.log(WebsocketEvents.FRIEND_REQUEST_RECEIVED);
      console.log(payload);
      dispatch(fetchFriendRequestThunk());
      toast(`${payload.sender.firstName} ${payload.sender.lastName} wants to be your friend.`, {
        icon: AiOutlineUserAdd,
        onClick: () => navigate("/friends/requests")
      })
    })

    socket.on(WebsocketEvents.FRIEND_REQUEST_CANCELLED, (payload: FriendRequest) => {
      console.log(WebsocketEvents.FRIEND_REQUEST_CANCELLED);
      console.log(payload);
      dispatch(removeFriendRequest(payload));
    });

    socket.on(WebsocketEvents.FRIEND_REQUEST_ACCEPTED, (payload: AcceptFriendRequestResponse) => {
      console.log(WebsocketEvents.FRIEND_REQUEST_ACCEPTED);
      dispatch(removeFriendRequest(payload.friendRequest));
      socket.emit(WebsocketEvents.GET_ONLINE_FRIENDS);
      toast(`${payload.friendRequest.receiver.firstName}(${payload.friendRequest.receiver.username}) accepted your friend request`, {
        icon: BsFillPersonCheckFill,
        onClick: () => navigate("/friends")
      });
    });

    socket.on(WebsocketEvents.FRIEND_REQUEST_REJECTED, (payload: FriendRequest) => {
      console.log(WebsocketEvents.FRIEND_REQUEST_REJECTED);
      dispatch(removeFriendRequest(payload));
    })

    return () => {
      socket.off(WebsocketEvents.FRIEND_REQUEST_CANCELLED);
      socket.off(WebsocketEvents.FRIEND_REQUEST_REJECTED);
      socket.off(WebsocketEvents.FRIEND_REQUEST_RECEIVED);
      socket.off(WebsocketEvents.FRIEND_REQUEST_ACCEPTED);
    };
  }, [socket])

  return (
    <AppLayout>
        <UserSidebar />
        <Outlet />
    </AppLayout>
  )
}
