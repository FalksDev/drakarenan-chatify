import { UserAvatar } from "components/avatars/UserAvatar"
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store";
import { selectConversationById } from "store/conversationSlice";
import { Divider } from "ui"
import { AuthContext } from "utils/context/AuthContext";
import { getRecipientFromConversation } from "utils/helpers";
import { Conversation } from "utils/types"


export const MessagePanelHeader = () => {
    const user = useContext(AuthContext).user!;
    const { id } = useParams();
    const conversation = useSelector((state: RootState) =>
      selectConversationById(state, parseInt(id!))
    );
  
    const recipient = getRecipientFromConversation(conversation, user);

    return (
        <div className="self-start w-full">
            <div className="text-2xl flex flex-row">
                <UserAvatar user={recipient} />
                <div className="my-auto ml-6">
                    {recipient?.firstName} {recipient?.lastName} <span className="text-zinc-500">({recipient?.username})</span>
                </div>
            </div>
            <Divider classes="mb-4 mt-4" />
        </div>
    )   
}