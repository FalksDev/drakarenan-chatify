import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch } from "store";
import { createConversationThunk } from "store/conversationSlice";
import { Button, TextInput } from "ui";
import { ModalContext } from "utils/context/ModalContext";

// TODO: Need to implement a user-search, and user-select. Right now you just type in a username
// Maybe even a friend-search?
export const CreateConversationForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isOpen, setShowModal } = useContext(ModalContext);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const initialMessage = !message ? "Hi!" : message;
        if (!initialMessage || !username) return;
        return dispatch(
          createConversationThunk({ username: username, message: initialMessage })
        )
          .unwrap()
          .then(({ data }) => {
            console.log(data);
            console.log('done');
            setShowModal(false);
            navigate(`/conversations/${data.id}`);
          })
          .catch((err) => {
            console.log(err);
            toast("Error creating conversation", { type: "error" })
          })
      };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <TextInput
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                text="Create"
                classes="w-full bg-indigo-600"
                isDisabled={!username}
                type="submit"
            />
        </form>
    )
}