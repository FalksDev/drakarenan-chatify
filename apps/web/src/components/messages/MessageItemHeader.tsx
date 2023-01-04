import { formatRelative } from "date-fns"
import { useContext } from "react"
import { AuthContext } from "utils/context/AuthContext"
import { MessageContext } from "./MessageContext"

export const MessageItemHeader = () => {
    const { message } = useContext(MessageContext)
    const { user } = useContext(AuthContext);

    const isYou = message.author.id === user!.id;
    const isYouStyle = isYou
        ? "text-indigo-500"
        : "";

    return (
        <div className="flex flex-row">
            <div className={`font-bold text-lg ${isYouStyle}`}>
                {message.author.firstName} {message.author.lastName}
            </div>
            <div className="text-zinc-500 text-sm font-bold text-opacity-75 mt-1 ml-7">
                {formatRelative(new Date(message.createdAt), new Date())}
            </div>
        </div>
    )
}