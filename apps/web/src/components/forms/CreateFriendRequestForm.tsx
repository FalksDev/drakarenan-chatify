import { ModalContext } from "utils/context/ModalContext"
import { useContext, useState } from "react";
import { Button, TextInput } from "ui";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { createFriendRequestThunk } from "store/friends/friendsThunk";
import { toast } from "react-toastify";

export const CreateFriendRequestForm = () => {
    const { setShowModal } = useContext(ModalContext);
    const [username, setUsername] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createFriendRequestThunk(username))
        .unwrap()
        .then(() => {
            console.log("success sending friend request");
            setShowModal(false);
            toast(`Friend request sent!`, {
                type: "success",
                icon: true
            })
        })
        .catch((err) => {
            console.log(err);
            toast("Error sending friend request", {
                type: "error",
                icon: true
            })
        })
        setShowModal(false);
    }

    return (
        <form className="mt-3" onSubmit={onSubmit}>
            <TextInput placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
            <div className="flex justify-between">
                {/* <Button type="button" classes="mt-8 border-indigo-700 w-1/3" buttonType="outlined" size="small" text="Cancel" onClick={() => setShowModal(false)} /> */}
                <Button isDisabled={!username} classes="w-full p-3 mt-3 bg-indigo-600" buttonType="solid" fontWeight="bold" text="Send" type="submit" />
            </div>
        </form>
    )
}