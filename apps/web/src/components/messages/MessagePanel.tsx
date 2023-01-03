import { MessageBodyContainer } from "./MessageBodyContainer";
import { MessagePanelFooter } from "./MessagePanelFooter";
import { MessagePanelHeader } from "./MessagePanelHeader";

type Props = {
}

export const MessagePanel = () => {
    return (
        <div className="grow">
            <div className="flex flex-col flex-wrap h-full">
                <MessagePanelHeader />
                <MessageBodyContainer />
                <MessagePanelFooter />
            </div>
        </div>
    )
}