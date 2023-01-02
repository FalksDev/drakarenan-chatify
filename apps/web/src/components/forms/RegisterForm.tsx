import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "ui";
import { postRegisterUser } from "utils/api";
import { postWithCallback } from "utils/helpers";
import { useCheckUsername } from "utils/hooks/useCheckUsername";
import { useComparePasswords } from "utils/hooks/useComparePasswords";
import { useDebounce } from "utils/hooks/useDebounce";
import { ExtendedRegisterUserParams, PostWithCallbackParams, RegisterUserParams } from "utils/types";

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors }
    } = useForm<ExtendedRegisterUserParams>();

    const navigate = useNavigate();
    
    const debouncedUsername = useDebounce(watch("username"), 1000);
    const { loadingCheckingUsername, usernameExists } = useCheckUsername(debouncedUsername);

    const debouncedOtherPassword = useDebounce(watch("otherPassword"), 1000);
    const debouncedPassword = useDebounce(watch("password"), 1000);
    const isPasswordStrongEnoguh = debouncedPassword ? debouncedPassword?.length >= 8 : true;
    const { loadingCheckPassword, isSamePassword } = useComparePasswords(debouncedPassword, debouncedOtherPassword);

    const onSubmit = async (data: ExtendedRegisterUserParams) => {
        const model: RegisterUserParams = { username: data.username, firstName: data.firstName, lastName: data.lastName, password: data.password }

        const postParams: PostWithCallbackParams = { 
            postFunction: () => postRegisterUser(model),
            onSuccess: () => {
                navigate(`/login?username=${model.username}`);
                toast("Account created!", { type: "success", icon: true })
            }
        }

        await postWithCallback(postParams)
    }

    return (
        <div className="rounded-xl text-zinc-200 p-2 container mx-auto max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-2 place-content-center m-20 text-center">
                    <div className="mb-10 text-4xl antialiased font-thin tracking-wide">
                        <span>Men skynda...</span>
                    </div>

                    <input
                        {...register("username", { required: true })}
                        autoFocus
                        placeholder="Username"
                        className="
                            focus:outline-none 
                          focus:bg-zinc-600 
                            transition ease-in-out duration-300 
                            drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400"
                        type="text" id="username" />
                    {usernameExists && <span className="text-red-500">This username already exists.</span>}

                    <div className="grid grid-cols-2 gap-4 justify-items-stretch">
                        <input
                            {...register("firstName", { required: true })}
                            placeholder="First Name"
                            className="
                                focus:outline-none 
                            focus:bg-zinc-600 
                                transition ease-in-out duration-300 
                                mt-3 drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400"
                            type="text" id="firstName" />

                        <input
                            {...register("lastName", { required: true })}
                            placeholder="Last Name"
                            className="
                                focus:outline-none 
                            focus:bg-zinc-600 
                                transition ease-in-out duration-300 
                                mt-3 drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400"
                            type="text" id="lastName" />
                    </div>

                    <input
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="
                            focus:outline-none 
                          focus:bg-zinc-600 
                            transition ease-in-out duration-300 
                            mt-3 drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400"
                        type="password" id="password" />

                    <input
                        {...register("otherPassword", { required: true })}
                        placeholder="Re-enter password"
                        className="
                            focus:outline-none 
                          focus:bg-zinc-600 
                            transition ease-in-out duration-300 
                            mt-3 drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400"
                        type="password" id="otherPassword" />

                    { !isPasswordStrongEnoguh && <span className="text-red-500">Passwords is not strong enough.</span>}
                    { !isSamePassword && <span className="text-red-500">Passwords doesn't match.</span>}
                    
                    <Button fontWeight="bold" isDisabled={usernameExists || (!isSamePassword || !isPasswordStrongEnoguh) } classes="mt-5" text="Register new account" type="submit" />
                </div>
            </form>
        </div>
    )
}