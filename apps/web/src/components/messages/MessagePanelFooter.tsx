import { IconButton, TextInput, TextInputIcon } from "ui"
import { BsEmojiHeartEyesFill, BsPlusCircleDotted } from "react-icons/bs";
import { useRef, useState, DragEvent, ClipboardEvent } from "react";
import { addAttachment, incrementAttachmentCounter } from "store/message-panel/messagePanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { toast } from "react-toastify";

type Props = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
    placeholderName: string;
    sendTypingStatus: () => void;
}

export const MessagePanelFooter = ({ content, setContent, sendMessage, placeholderName, sendTypingStatus } : Props) => {
    const MAX_LENGTH = 2048;
    const ICON_SIZE = 36;
    const ref = useRef<HTMLTextAreaElement>(null);
    const [isMultiLine, setIsMultiLine] = useState(false);
    const DEFAULT_TEXTAREA_HEIGHT = 22;
    const dispatch = useDispatch<AppDispatch>();

    const { attachments, attachmentCounter } = useSelector(
        (state: RootState) => state.messagePanel
    );

    const handleOnChange = (e: any) => {
        e.preventDefault();
        setContent(e.target.value);
        const { current } = ref;
        
        if (current) {
            const height = parseInt(current.style.height);
            current.style.height = '5px';
            current.style.height = current.scrollHeight + 'px';
            height > DEFAULT_TEXTAREA_HEIGHT
              ? setIsMultiLine(true)
              : setIsMultiLine(false);
          }

        if(e.target.value){
            sendTypingStatus();
        }
    }

    const handleKeyDown = (e: any) => {
        sendTypingStatus();
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
            setIsMultiLine(false);
            if (ref.current) ref.current.style.height = '22px';
        }
    }

    const multiLineStyle = isMultiLine
        ? "items-start"
        : "items-center";


    const handleFileAdd = (files: FileList) => {
        const maxFilesDropped = 5 - attachments.length;
        if (maxFilesDropped === 0) return toast("Max files reached", { type: "error" });
        const filesArray = Array.from(files);
        let localCounter = attachmentCounter;
        for (let i = 0; i < filesArray.length; i++) {
            console.log(filesArray[i]);
            if (i === maxFilesDropped) break;
            dispatch(addAttachment({ id: localCounter++, file: filesArray[i] }));
            dispatch(incrementAttachmentCounter());
        }
    };

    const onDrop = (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if(e.dataTransfer){
            const { files } = e.dataTransfer;
            handleFileAdd(files);
        }
    };
    
    const onPaste = (e: ClipboardEvent) => {
        if(e.clipboardData){
            const { files } = e.clipboardData;
            console.log('pasting...');
            console.log(files);
            handleFileAdd(files);
        }
    };

    return (
        <div className="bottom-0">
            <div className="p-4 bg-zinc-800 rounded-lg flex flex-row">
                <div className="mr-3">
                    <IconButton icon={<BsPlusCircleDotted />} />
                </div>

                <textarea
                    onDrop={onDrop}
                    onPaste={onPaste}
                    autoFocus
                    ref={ref}
                    onKeyDown={handleKeyDown}
                    value={content}
                    onChange={handleOnChange}
                    maxLength={MAX_LENGTH}
                    placeholder={"Message " + placeholderName}
                    className={`
                    bg-inherit outline-none border-none font-sans my-auto
                    box-border w-full resize-none h-[20px] max-h-[200px] flex-initial scrollbar-none
                    ${multiLineStyle}`} />

                    <div className="ml-3">
                        <IconButton icon={<BsEmojiHeartEyesFill/>} />
                    </div>
            </div>
        </div>
    )
}