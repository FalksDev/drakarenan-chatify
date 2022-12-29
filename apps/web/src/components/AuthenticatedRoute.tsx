import { LoadingPage } from "pages/LoadingPage";
import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
    children
}) => {
    const location = useLocation();
    const { loading, user } = useAuth();

    if(loading) {
        return <LoadingPage />
    }

    if(user) {
        return <>{children}</>;
    }

    return <Navigate to="/login" state={{from: location}} replace />
}