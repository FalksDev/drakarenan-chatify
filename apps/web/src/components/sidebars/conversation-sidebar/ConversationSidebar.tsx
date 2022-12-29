import { ConversationSidebarHeader } from "./ConversationSidebarHeader"

export const ConversationSidebar = () => {
    return (
        <div className="h-full bg-zinc-800 flex w-60 md:w-80 bg-opacity-80 border-r border-opacity-20 border-slate-200 p-1">
            <div className="grid-rows-1 w-full">
                <ConversationSidebarHeader />
            </div>
        </div>
    )
}