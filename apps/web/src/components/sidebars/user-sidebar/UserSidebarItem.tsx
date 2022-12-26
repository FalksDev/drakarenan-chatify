type Props = {
    navigateTo?: string;
    toolTip: string;
    icon: React.ReactNode;
    isLoginIcon?: boolean;
}

export const UserSidebarItem = ({navigateTo, toolTip, icon, isLoginIcon = false}: Props) => {
    const extendedClasses = isLoginIcon ? "absolute bottom-0 w-20" : "";

    return (
        <div className={`cursor-pointer p-3 hover:bg-indigo-600 transition ease-in-out duration-300 grid place-items-center ${extendedClasses}`}>
            <div className="text-4xl text-white">
                {icon}
            </div>
        </div>
    )
}