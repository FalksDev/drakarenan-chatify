import { CreateFriendRequestForm } from "components/forms/CreateFriendRequestForm";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "ui";

export const CreateFriendRequestModal = () => {
    return (
        <Modal title="Send friend request">
                <CreateFriendRequestForm />
        </Modal>
    )
}