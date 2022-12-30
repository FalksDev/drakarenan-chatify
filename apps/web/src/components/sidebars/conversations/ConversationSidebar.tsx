import { SidebarLayout } from "components/layouts/SidebarLayout"
import { ConversationSidebarHeader } from "./ConversationSidebarHeader"

export const ConversationSidebar = () => {
    return (
        <SidebarLayout classes="p-1">
            <div className="grid-rows-1 w-full">
                <ConversationSidebarHeader />
            </div>
        </SidebarLayout>
    )
}