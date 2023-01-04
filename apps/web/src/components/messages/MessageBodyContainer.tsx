import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import { selectConversationMessage } from "store/messages/messageSlice";
import { selectType } from "store/selectedConversationTypeSlice";
import { scrollbarStyle } from "ui/static"
import { GroupMessageType, MessageType } from "utils/types";
import { MessageContext } from "./MessageContext";
import { MessageItem } from "./MessageItem"

export const MessageBodyContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const conversationMessages = useSelector((state: RootState) =>
      selectConversationMessage(state, parseInt(id!))
    );

    // const groupMessages = useSelector((state: RootState) =>
    //   selectGroupMessage(state, parseInt(id!))
    // );

    const selectedType = useSelector((state: RootState) => selectType(state));

    const mapMessages = (
        message: MessageType | GroupMessageType,
        index: number,
        messages: MessageType[] | GroupMessageType[]
      ) => {
        const currentMessage = messages[index];
        const nextMessage = messages[index + 1];

        const showMessageHeader =
          messages.length === index + 1 ||
          currentMessage.author.id !== nextMessage.author.id;
           
        return (
                <MessageContext.Provider value={{message: message, showMessageHeader: showMessageHeader}} key={message.id}>
                    <MessageItem />
                </MessageContext.Provider>
        );
      };

    return (
        <div className={`flex flex-grow flex-col-reverse overflow-y-auto h-0 mb-5
             ${scrollbarStyle}`}>
            <div className="flex flex-col-reverse">
                {selectedType === "private"
                    && conversationMessages?.messages.map(mapMessages)}
            </div>
        </div>
    )
}