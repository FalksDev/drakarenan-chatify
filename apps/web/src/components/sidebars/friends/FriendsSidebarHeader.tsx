import { Button, Divider } from "ui"
import { AiOutlineUserAdd } from "react-icons/ai"

export const FriendsSidebarHeader = () => {
    return (
        <div className="w-full">
            <Button classes="w-full mb-3 mt-3 bg-indigo-700" fontWeight="bold" icon={<AiOutlineUserAdd />} text="Add friend" />
            <Divider />
        </div>
    )
}