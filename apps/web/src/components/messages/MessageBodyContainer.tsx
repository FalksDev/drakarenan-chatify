import { scrollbarStyle } from "ui/static"
import { MessageItem } from "./MessageItem"

export const MessageBodyContainer = () => {
    return (
        <div className={`flex-grow overflow-y-auto h-0 mb-3 
             ${scrollbarStyle}`}>
            <div className="flex flex-col justify-end gap-3">
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
            </div>
        </div>
    )
}