import { useEffect } from "react";
import { useState } from "react";
import { getCheckUsername } from "utils/api";
import { useDebounce } from "./useDebounce";

export function useCheckUsername(username: string) {
    const [loadingCheckingUsername, setLoadingCheckingUsername] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);

    useEffect(() => {
        if(username) {
            console.log("Checking username..");
            setLoadingCheckingUsername(true);
            setUsernameExists(false);
            getCheckUsername(username)
                .catch((err) => {
                    setUsernameExists(true);
                })
                .finally(() => {
                    setLoadingCheckingUsername(false);
                })
        }
    }, [username])

    return { loadingCheckingUsername, usernameExists };
}