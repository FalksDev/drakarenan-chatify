import { ConversationSidebar } from "components/sidebars/conversations/ConversationSidebar"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"
import { AppDispatch } from "store";
import { updateType } from "store/selectedConversationTypeSlice";

export default function GroupPage () {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Fetch group conversations "thunk" => Store it in the Redux-Store
      dispatch(updateType("group"));
    }, [])
    
    return (
        <>
            <ConversationSidebar />
            <Outlet />
        </>
    )
}