import { CreateConversationForm } from "components/forms/CreateConversationForm"
import { Modal } from "ui"

export const CreateConversationModal = () => {
    return (
        <Modal title="Create conversation">
            <CreateConversationForm />
        </Modal>
    )
}