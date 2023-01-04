import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import { updateType } from "store/selectedConversationTypeSlice";
import { Button, Divider, IconButton, TextInput } from "ui"
import { ConversationType } from "utils/types";
import { TbMessagePlus } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ModalContext } from "utils/context/ModalContext";
import { CreateConversationModal } from "components/modals/CreateConversationModal";

export const ConversationSidebarHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    
    const [conversationTextSearch, setConversationTextSearch] = useState("");
    const handleConversationTextSearchChange = (e: any) => {
        setConversationTextSearch(e.target.value);
    }

    const conversationTypeState = useSelector(
        (state: RootState) => state.selectedConversationType
    );

    const handleTypeChange = (type: ConversationType) => {
        dispatch(updateType(type));
        if(type === "group") navigate("/groups");
        else navigate("/conversations");
    }

    return (
        <div className="m-4">
            <div className="grid grid-cols-6">
                <div className="col-span-5">
                    <TextInput
                        size="small"
                        value={conversationTextSearch}
                        onChange={handleConversationTextSearchChange}
                        placeholder={conversationTypeState.placeholderText}
                    />
                </div>
                <div className="justify-self-end my-auto">
                    {conversationTypeState.type === "private"
                        ? <IconButton onClick={() => setShowModal(true)} icon={<TbMessagePlus />}/>
                        : <IconButton icon={<AiOutlineUsergroupAdd />}/>}
                </div>
            </div>
            <Divider classes="mt-3 mb-3" />
            <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => handleTypeChange("private")} isActive={conversationTypeState.type === "private"} size="small" text="Private" />
                <Button onClick={() => handleTypeChange("group")} isActive={conversationTypeState.type === "group"} size="small" text="Group" />
            </div>

            <ModalContext.Provider value={{ isOpen: showModal, setShowModal: setShowModal }}>
                <CreateConversationModal />
            </ModalContext.Provider>
        </div>
    )
}