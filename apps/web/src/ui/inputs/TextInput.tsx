import { forwardRef } from "react";
import { useState } from "react";
import { FieldPath, FieldValues, RegisterOptions, UseFormRegisterReturn, UseFormReturn, ValidationRule } from "react-hook-form";


interface Props {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    size?: "small" | "normal";
}

// TODO: We need to remove "onChange" and handle a "setValue" instead.
const TextInput = ({ placeholder, value, onChange, size = "normal" } : Props ) => {
    const sizeStyle = size === "normal"
        ? "p-3 pl-5 pr-5"
        : "p-2.5 pl-3.5 pr-3.5 text-sm";

    return (
        <div>
            <input 
                type="text"
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                className={`
                    focus:outline-none
                    focus:bg-zinc-600 
                    transition ease-in-out duration-300 
                    w-full drop-shadow-md  rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400
                    ${sizeStyle}`}
            />
        </div>
    )
}

export default TextInput;