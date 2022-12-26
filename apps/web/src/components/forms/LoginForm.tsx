import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <span>Username</span>
            <input type="text" id="username" {...register("username", { required: true })} />

            <span>Password</span>
            <input type="password" id="password" {...register("password", { required: true })} />

            <button type="submit">Login</button>
        </form>
    )
}