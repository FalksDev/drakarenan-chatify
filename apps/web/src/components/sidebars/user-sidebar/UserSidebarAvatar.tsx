import { useState } from "react"
import { useEffect } from "react"
import { User } from "utils/types"

type Props = {
    user: User | undefined
}

export const UserSidebarAvatar = ({user}:Props) => {
    const[initials, setInitials] = useState("");

    useEffect(() => {
        if(user){
            const firstLetter = user.firstName.charAt(0);
            const lastLetter = user.lastName.charAt(0);
            setInitials(firstLetter+lastLetter);
        }
    }, [user])

    return (
        <div className="rounded-full 
                bg-slate-50 h-14 m-3 shadow-lg text-center grid place-items-center hover:bg-opacity-80 transition ease-in-out duration-300
                cursor-pointer">
            <div className="text-2xl">
                {initials}
            </div>
        </div>
    )
}