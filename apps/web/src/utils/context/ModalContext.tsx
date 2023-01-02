import { createContext, Dispatch, SetStateAction } from "react";

type ModalContext = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}

export const ModalContext = createContext<ModalContext>({
    setShowModal: () => {},
    isOpen: false
})