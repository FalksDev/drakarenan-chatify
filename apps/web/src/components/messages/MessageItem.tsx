import { MessageItemBody } from "./MessageItemBody"
import { MessageItemHeader } from "./MessageItemHeader"

export const MessageItem = () => {
    return (
        <div className="container">
            <div className="flex flex-row">
                <div>
                    <div className="bg-zinc-700 mr-6 p-3 h-14 w-14 rounded-full shadow-lg text-center">
                        <div className="text-2xl">
                            AF
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <MessageItemHeader />
                    <MessageItemBody />
                </div>
            </div>
        </div>
    )
}