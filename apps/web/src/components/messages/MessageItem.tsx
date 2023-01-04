import { AuthContext } from "utils/context/AuthContext";
import { ConversationMessage, MessageType } from "utils/types"
import { MessageItemBody } from "./MessageItemBody"
import { MessageItemHeader } from "./MessageItemHeader"
import { useContext } from "react";
import { UserAvatar } from "components/avatars/UserAvatar";
import { MessageContext } from "./MessageContext";

// TODO: Replace this avatar with UserAvatar.tsx
export const MessageItem = () => {
    const { user } = useContext(AuthContext);
    const { message, showMessageHeader } = useContext(MessageContext)
    const showMessageHeaderStyle = !showMessageHeader
        ? "mb-0"
        : "mt-6";

    return (
        <div className={`container ${showMessageHeaderStyle}`}>
            <div className="flex flex-row">
                <div className="mr-6">
                    {showMessageHeader && <UserAvatar user={message?.author!} /> }
                </div>
                <div className="flex flex-col">
                    {showMessageHeader && <MessageItemHeader />}
                    <MessageItemBody />
                </div>
            </div>
        </div>
    )
}