import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppLayout } from '../components/layouts/AppLayout'
import { UserSidebar } from '../components/sidebars/user-sidebar/UserSidebar'

export default function AppPage() {
  return (
    <AppLayout>
        <UserSidebar />
        <Outlet />
    </AppLayout>
  )
}
