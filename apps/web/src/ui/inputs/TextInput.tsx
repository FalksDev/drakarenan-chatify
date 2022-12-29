import { forwardRef } from "react";
import { useState } from "react";
import { FieldPath, FieldValues, RegisterOptions, UseFormRegisterReturn, UseFormReturn, ValidationRule } from "react-hook-form";


interface Props {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput = ({ placeholder, value, onChange } : Props ) => {
    return (
        <div>
            <input 
                type="text"
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                className="
                    focus:outline-none 
                    focus:bg-zinc-600 
                    transition ease-in-out duration-300 
                    w-full drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 text-zinc-200 placeholder:text-zinc-400" 
            />
        </div>
    )
}

export default TextInput;