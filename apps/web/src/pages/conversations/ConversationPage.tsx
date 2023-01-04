import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { AppDispatch } from 'store'
import { addConversation, fetchConversationsThunk, updateConversation } from 'store/conversationSlice'
import { addMessage, deleteMessage } from 'store/messages/messageSlice'
import { updateType } from 'store/selectedConversationTypeSlice'
import { SocketContext } from 'utils/context/SocketContext'
import { MessageEventPayload, Conversation } from 'utils/types'
import { ConversationSidebar } from '../../components/sidebars/conversations/ConversationSidebar'

export default function ConversationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();

  useEffect(() => {
    // Fetch private conversations "thunk" => Store it in the Redux-Store
    dispatch(updateType("private"));
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    socket.on('onMessage', (payload: MessageEventPayload) => {
      console.log('Message Received');
      const { conversation, message } = payload;
      console.log(conversation, message);
      dispatch(addMessage(payload));
      dispatch(updateConversation(conversation));
    });
    socket.on('onConversation', (payload: Conversation) => {
      console.log('Received onConversation Event');
      console.log(payload);
      dispatch(addConversation(payload));
    });
    socket.on('onMessageDelete', (payload) => {
      console.log('Message Deleted');
      console.log(payload);
      dispatch(deleteMessage(payload));
    });
    return () => {
      socket.off('connected');
      socket.off('onMessage');
      socket.off('onConversation');
      socket.off('onMessageDelete');
    };
  }, [id]);

  return (
    <div className="flex flex-row flex-1">
        <ConversationSidebar />
        <div className="bg-zinc-800 bg-opacity-75 grow">
          <Outlet />
        </div>
    </div>
  )
}
