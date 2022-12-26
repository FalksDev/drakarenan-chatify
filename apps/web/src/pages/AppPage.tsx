import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppPage() {
  return (
    <div>
        <Outlet />
    </div>
  )
}
