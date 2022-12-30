import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { AppDispatch } from 'store'
import { updateType } from 'store/selectedConversationTypeSlice'
import { ConversationSidebar } from '../../components/sidebars/conversation-sidebar/ConversationSidebar'

export default function ConversationPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch private conversations "thunk" => Store it in the Redux-Store
    dispatch(updateType("private"));
  }, [])

  return (
    <>
        <ConversationSidebar />
        <Outlet />
    </>
  )
}
