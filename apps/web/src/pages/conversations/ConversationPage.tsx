import React from 'react'
import { Outlet } from 'react-router-dom'
import { ConversationSidebar } from '../../components/sidebars/conversation-sidebar/ConversationSidebar'

export default function ConversationPage() {
  return (
    <>
        <ConversationSidebar />
        <Outlet />
    </>
  )
}
