import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import { updateType } from "store/selectedConversationTypeSlice";
import { Button, Divider, TextInput } from "ui"
import { ConversationType } from "utils/types";

export const ConversationSidebarHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const [conversationTextSearch, setConversationTextSearch] = useState("");
    const handleConversationTextSearchChange = (e: any) => {
        setConversationTextSearch(e.target.value);
    }

    const conversationType = useSelector(
        (state: RootState) => state.selectedConversationType.type
    );

    const handleTypeChange = (type: ConversationType) => {
        dispatch(updateType(type));
        if(type === "group") navigate("/groups");
        else navigate("/conversations");
    }

    return (
        <div className="m-4">
            <TextInput
                value={conversationTextSearch}
                onChange={handleConversationTextSearchChange}
                placeholder="Search for conversations.."
            />
            <Divider classes="mt-3 mb-3" />
            <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => handleTypeChange("private")} isActive={conversationType === "private"} size="small" text="Private" />
                <Button onClick={() => handleTypeChange("group")} isActive={conversationType === "group"} size="small" text="Group" />
            </div>
        </div>
    )
}