import { useState } from "react"
import { Divider, TextInput } from "ui"

export const ConversationSidebarHeader = () => {
    const [conversationTextSearch, setConversationTextSearch] = useState("");
    const handleConversationTextSearchChange = (e: any) => {
        setConversationTextSearch(e.target.value);
    }

    return (
        <div className="m-4">
            <TextInput
                value={conversationTextSearch}
                onChange={handleConversationTextSearchChange}
                placeholder="Search for conversations.."
            />
            <Divider classes="mt-6 mb-4" />
        </div>
    )
}