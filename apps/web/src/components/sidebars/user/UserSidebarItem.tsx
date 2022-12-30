import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { postLogoutUser } from "utils/api";

type Props = {
    navigateTo?: string;
    toolTip: string;
    icon: React.ReactNode;
    isLoginIcon?: boolean;
    isActive?: boolean;
}

export const UserSidebarItem = ({navigateTo, toolTip, icon, isLoginIcon = false, isActive = false }: Props) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        if(navigateTo) navigate(navigateTo);
        if(isLoginIcon) {
            toast("You logged out.", { type: "info", icon: true })
            await postLogoutUser();
        }
    }

    const isActiveStyle = isActive 
        ? "bg-indigo-700"
        : "";

    return (
        <div className="p-1 pr-2 pl-2">
            <div onClick={handleClick} className={`
                rounded-md cursor-pointer p-3 hover:bg-indigo-700 transition ease-in-out duration-300 grid place-items-center 
                ${isActiveStyle}`}>
                <div className="text-3xl text-white">
                    {icon}
                </div>
            </div>
        </div>
        
    )
}