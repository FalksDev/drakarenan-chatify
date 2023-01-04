import { createContext } from "react";
import { GroupMessageType, MessageType } from "utils/types"

type MessageContext = {
    message: MessageType | GroupMessageType;
    showMessageHeader: boolean;
}

export const MessageContext = createContext<MessageContext>({
    message: undefined!,
    showMessageHeader: true
});