import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { TextInput } from "ui";
import { postLoginUser } from "../../utils/api";
import { postWithCallback } from "../../utils/helpers";
import { PostWithCallbackParams, UserCredentialsParams } from "../../utils/types"

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserCredentialsParams>();

    const navigate = useNavigate();

    const onSubmit = async (data: UserCredentialsParams) => {
        const postParams: PostWithCallbackParams = { 
            postFunction: () => postLoginUser(data),
            onSuccess: () => navigate("/conversations")
        }

        await postWithCallback(postParams)
    }

    return (
        <div className="rounded-xl text-zinc-200 w-1/3 p-2">
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

                    <button
                        className="mt-6 bg-zinc-700 bg-opacity-95 rounded-lg p-3 drop-shadow-md font-semibold tracking-wider" 
                        type="submit">Sign in</button>
                </div>
            </form>
        </div>
    )
}