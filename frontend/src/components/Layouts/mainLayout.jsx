import React from 'react'
import Nav from '@/components/Layouts/navbar'
import Aside from './sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {

  return (
    <SidebarProvider>
      <Aside />

      <SidebarInset>
        <div className="flex flex-col min-h-screen w-full">

          <nav className="w-full ">
            <Nav />
          </nav>

          <main className="flex-1 overflow-y-auto p-6 ">
            <Outlet />
          </main>
        </div>
      </SidebarInset>

    </SidebarProvider>
  )
}

export default MainLayout
