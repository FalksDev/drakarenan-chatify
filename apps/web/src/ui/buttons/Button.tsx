type Props = {
    text: string;
    onClick?: () => void;
    type?: "submit";
    buttonType?: "solid" | "outlined"
    fontWeight?: "normal" | "bold";
    isDisabled?: boolean;
    classes?: string;
    size?: "normal" | "small";
    isActive?: boolean;
}

const Button = ({ 
    text, 
    buttonType = "solid", 
    fontWeight = "normal", 
    classes = "", 
    isDisabled = false, 
    size = "normal", 
    isActive = false,
    ...rest } : Props) => {

    const typeStyle = buttonType === "solid" 
        ? "bg-zinc-700 enabled:hover:bg-opacity-60"
        : "border-2 border-zinc-700 enabled:hover:bg-zinc-700";
    
    const weightStyle = fontWeight === "normal"
        ? ""
        : "font-semibold tracking-wider";

    const disabledStyle = isDisabled
        ? "bg-opacity-20 text-zinc-400"
        : "text-zinc-200";

    const sizeStyle = size === "normal"
        ? "p-3"
        : "p-1";

    const isActiveStyle = isActive
        ? "bg-indigo-800 border-2 border-indigo-700"
        : "";

    return (
        <button
            disabled={isDisabled}
            className={`
                enabled:transition ease-in-out duration-200
                bg-opacity-95 rounded-md drop-shadow-md 
                ${typeStyle} ${weightStyle} ${disabledStyle} ${sizeStyle} ${isActiveStyle} ${classes}`} 
            {...rest}>
            {text}
        </button>
    )
}

export default Button;