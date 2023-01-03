import { BsPlusCircleDotted, BsEmojiHeartEyesFill } from "react-icons/bs";

interface Props {
    placeholder: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onAddIconClick?: () => void;
    onEmojiIconClick?: () => void;
}

const TextInputIcon = ({placeholder, value, onChange, onAddIconClick, onEmojiIconClick} : Props) => {
    return (
        <div className="flex flex-row p-4 drop-shadow-md w-full rounded-md bg-zinc-900 bg-opacity-70 text-zinc-200 placeholder:text-zinc-400">
            <div 
                onClick={onAddIconClick}
                className="text-3xl hover:text-indigo-600 mr-4 transition-all duration-300 cursor-pointer">
                <BsPlusCircleDotted />
            </div>
            <input 
                autoFocus
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`
                w-full grow focus:outline-none rounded-md bg-zinc-700 bg-opacity-0 text-zinc-200 placeholder:text-zinc-400`}
            />
            <div 
                onClick={onEmojiIconClick}
                className="text-3xl hover:text-indigo-600 ml-3 transition-all duration-300 cursor-pointer">
                <BsEmojiHeartEyesFill/>
            </div>
        </div>
    )
}

export default TextInputIcon;