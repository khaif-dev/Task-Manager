import React from 'react'
import { SquareCheckBig, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from '@/components/ui/sidebar'

const Nav = () => {
  return (
    <nav className='flex w-full justify-between p-6'>
        <div className='flex gap-4'>
          <SquareCheckBig />
          <h1>To do</h1>  
        </div>  
        <div className='md:flex gap-4'>
          <SidebarTrigger>
            <Menu />
          </SidebarTrigger>
        </div>  
    </nav>
  )
}

export default Nav
