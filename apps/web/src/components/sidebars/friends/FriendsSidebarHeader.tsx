import { Button, Divider, Modal } from "ui"
import { AiOutlineUserAdd } from "react-icons/ai"
import { useState } from "react";
import { CreateFriendRequestModal } from "components/modals/CreateFriendRequestModal";
import { ModalContext } from "utils/context/ModalContext";

export const FriendsSidebarHeader = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="w-full">
            <Button onClick={() => setShowModal(true)} classes="w-full mb-3 mt-3 bg-indigo-700" fontWeight="bold" icon={<AiOutlineUserAdd />} text="Add friend" />
            <Divider />
            <ModalContext.Provider value={{ isOpen: showModal, setShowModal: setShowModal }}>
                <CreateFriendRequestModal  />
            </ModalContext.Provider>
        </div>
    )
}