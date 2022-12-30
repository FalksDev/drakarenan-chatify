import { useState } from "react";
import { useEffect } from "react";

export function useComparePasswords(password: string, otherPassword: string) {
    const [loadingCheckPassword, setLoadingCheckPassword] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(false);

    useEffect(() => {
        setLoadingCheckPassword(true);

        if(!otherPassword) {
            // This is a super-ugly solution but it works for now
            setIsSamePassword(true);
        }

        if(otherPassword && password){
            setIsSamePassword(password === otherPassword);
        }
    }, [otherPassword]);

    return { loadingCheckPassword, isSamePassword };
}