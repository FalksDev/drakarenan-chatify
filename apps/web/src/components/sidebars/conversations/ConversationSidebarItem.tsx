import { UserAvatar } from "components/avatars/UserAvatar";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Divider } from "ui";
import { AuthContext } from "utils/context/AuthContext";
import { getRecipientFromConversation } from "utils/helpers";
import { Conversation } from "utils/types"

type Props = {
    conversation: Conversation
}

export const ConversationSidebarItem = ({ conversation }: Props) => {
    const MESSAGE_LENGTH_MAX = 20;
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const recipient = getRecipientFromConversation(conversation, user);

    const lastMessageContent = () => {
      const { lastMessageSent } = conversation;
      if (lastMessageSent && lastMessageSent.content)
        return lastMessageSent.content?.length >= MESSAGE_LENGTH_MAX
          ? lastMessageSent.content?.slice(0, MESSAGE_LENGTH_MAX).concat('...')
          : lastMessageSent.content;
      return null;
    };

    const isActiveStyle = id === conversation.id.toString()
        ? "text-indigo-500"
        : "";
  
    const hasProfilePicture = () => recipient?.profile?.avatar ? true : false;
    
    return (
        <>
            <div 
                onClick={() => navigate(`/conversations/${conversation.id}`)}
                className={`flex flex-row flex-wrap gap-5 pt-4 pb-4 hover:bg-opacity-40 rounded-xl 
                    hover:text-indigo-500 transition-all duration-200 cursor-pointer ${isActiveStyle}`}>
                <UserAvatar user={recipient!} hasProfilePicture={hasProfilePicture()}/>
                <div className="flex flex-col">
                    <div className="text-lg my-auto">
                        {recipient?.firstName} {recipient?.lastName}
                    </div>
                    {lastMessageContent() && (
                    <div className="text-zinc-400 text-opacity-60 text-sm">
                        {lastMessageContent()}
                    </div>
                    )}
                </div>
            </div>
            <Divider classes="mb-2 mt-2" />
        </>
    )
}