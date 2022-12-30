import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Divider } from "ui";
import { postLoginUser } from "../../utils/api";
import { postWithCallback } from "../../utils/helpers";
import { PostWithCallbackParams, UserCredentialsParams } from "../../utils/types"

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UserCredentialsParams>();

    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const username = search.get("username");

    useEffect(() => {
        if(username){
            setValue("username", username);
        }
    }, [username])

    const onSubmit = async (data: UserCredentialsParams) => {
        const postParams: PostWithCallbackParams = { 
            postFunction: () => postLoginUser(data),
            onSuccess: () => {
                navigate("/conversations")
                toast(`Logged in as: ${data.username}`, { type: "success", icon: true })
            }
        }

        await postWithCallback(postParams)
    }

    return (
        <div className="rounded-xl text-zinc-200 p-2 container mx-auto max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-2 place-content-center m-20 text-center">
                    <div className="mb-10 text-4xl antialiased font-thin tracking-wide">
                        <span>Logga in fö' fan...</span>
                    </div>

                    <input
                        autoFocus
                        placeholder="Username"
                        className="
                            focus:outline-none 
                          focus:bg-zinc-600 
                            transition ease-in-out duration-300 
                            mb-4 drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400"
                        type="text" id="username" {...register("username", { required: true })} />

                    <input
                        placeholder="Password"
                        className="
                            focus:outline-none 
                          focus:bg-zinc-600 
                            transition ease-in-out duration-300 
                            drop-shadow-md p-3 pl-5 pr-5 rounded-md bg-zinc-700 bg-opacity-50 text-zinc-200 placeholder:text-zinc-400" 
                        type="password" id="password" {...register("password", { required: true })} />

                    <Button classes="mt-3" fontWeight="bold" type="submit" text="Sign in"/>
                    <Divider classes="mt-2 mb-2" />
                    <span className="mb-2 text-zinc-300 text-opacity-90">Don't have an account?</span>
                    <Button fontWeight="bold" buttonType="outlined" text="Register" onClick={() => navigate("/register") } />
                </div>
            </form>
        </div>
    )
}