import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "store";
import { selectConversationById } from "store/conversationSlice";
import { selectGroupById } from "store/groupSlice";
import { removeAllAttachments } from "store/message-panel/messagePanelSlice";
import { addSystemMessage, clearAllMessages } from "store/system-message/systemMessageSlice";
import { createMessage } from "utils/api";
import { AuthContext } from "utils/context/AuthContext";
import { getRecipientFromConversation } from "utils/helpers";
import { MessageBodyContainer } from "./MessageBodyContainer";
import { MessagePanelFooter } from "./MessagePanelFooter";
import { MessagePanelHeader } from "./MessagePanelHeader";

type Props = {
    sendTypingStatus: () => void;
    isRecipientTyping: boolean;
  };

export const MessagePanel = ({ sendTypingStatus, isRecipientTyping } : Props) => {
    const dispatch = useDispatch();
    const { id: routeId } = useParams();
    const { user } = useContext(AuthContext);
    const { attachments } = useSelector((state: RootState) => state.messagePanel);
    const [content, setContent] = useState("");

    const conversation = useSelector((state: RootState) =>
     selectConversationById(state, parseInt(routeId!))
    );

    const { messageCounter } = useSelector(
      (state: RootState) => state.systemMessages
    );

    const group = useSelector((state: RootState) =>
        selectGroupById(state, parseInt(routeId!))
    );

    const selectedType = useSelector(
        (state: RootState) => state.selectedConversationType.type
    );

    const recipient = getRecipientFromConversation(conversation, user);

    useEffect(() => {
        return () => {
        dispatch(clearAllMessages());
        dispatch(removeAllAttachments());
        };
    }, []);

    const sendMessage = async () => {
        const trimmedContent = content.trim();
        if (!routeId) return;
        if (!trimmedContent && !attachments.length) return;
        const formData = new FormData();
        formData.append('id', routeId);
        trimmedContent && formData.append('content', trimmedContent);
        attachments.forEach((attachment) =>
          formData.append('attachments', attachment.file)
        );
        try {
          await createMessage(routeId, selectedType, formData);
          setContent('');
          dispatch(removeAllAttachments());
          dispatch(clearAllMessages());
        } catch (err) {
            console.log(err);
          const axiosError = err as AxiosError;
          if (axiosError.response?.status === 429) {
            toast("You are rate limited, slow down", {
                type: "error"
            });
            dispatch(
              addSystemMessage({
                id: messageCounter,
                level: 'error',
                content: 'You are being rate limited. Slow down.',
              })
            );
          } else if (axiosError.response?.status === 404) {
            dispatch(
              addSystemMessage({
                id: messageCounter,
                level: 'error',
                content:
                  'The recipient is not in your friends list or they may have blocked you.',
              })
            );
          }
        }
      };
    
    return (
        <div className="grow">
            <div className="flex flex-col flex-wrap h-full">
                <MessagePanelHeader />
                <MessageBodyContainer />
                {isRecipientTyping && <span className="italic mb-1">{recipient?.firstName} is typing...</span>}
                <MessagePanelFooter
                    sendTypingStatus={sendTypingStatus}
                    content={content}
                    sendMessage={sendMessage}
                    setContent={setContent}
                    placeholderName={selectedType === "private" ? recipient?.firstName ?? "" : group?.title ?? ""}
                 />
            </div>
        </div>
    )
}