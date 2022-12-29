import { RotateLoader } from "react-spinners";

export const LoadingPage = () => {
    return (
        <div className="w-100 min-h-screen grid place-items-center bg-zinc-900">
                <RotateLoader color="#4f46e5" size={20} />   
        </div>
    )
}