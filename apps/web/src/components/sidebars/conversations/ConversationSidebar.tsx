import { SidebarLayout } from "components/layouts/SidebarLayout"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { ConversationSidebarHeader } from "./ConversationSidebarHeader"
import { ConversationSidebarItem } from "./ConversationSidebarItem";

export const ConversationSidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const conversations = useSelector(
      (state: RootState) => state.conversation.conversations
    );

    // const showGroupContextMenu = useSelector(
    //   (state: RootState) => state.groups.showGroupContextMenu
    // );

    const groups = useSelector((state: RootState) => state.groups.groups);
    const conversationType = useSelector(
      (state: RootState) => state.selectedConversationType.type
    );

    return (
        <SidebarLayout classes="p-1">
            <div className="grid-rows-1 w-full">
                <ConversationSidebarHeader />
            </div>
            <div className="m-4">
                {conversationType === "private" && conversations.map((conversation) => {
                    return (
                        <ConversationSidebarItem conversation={conversation} key={conversation.id} />
                    )
                })}
            </div>
        </SidebarLayout>
    )
}