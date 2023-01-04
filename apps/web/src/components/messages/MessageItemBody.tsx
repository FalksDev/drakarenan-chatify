import { useContext } from "react"
import { MessageContext } from "./MessageContext"

export const MessageItemBody = () => {
    const { message, showMessageHeader } = useContext(MessageContext)
    const showMessageHeaderStyle = !showMessageHeader
        ? "ml-14"
        : "";

    return (
        <div className={`leading-7 whitespace-pre-wrap ${showMessageHeaderStyle}`}>
            {message.content}
        </div>
    )
}