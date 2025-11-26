import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Star, List, CircleCheckBig, CirclePlus, Plus, SquareCheckBig, PanelLeft} from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchProjects } from '@/lib/APIs/projectAPI'
import ProjectAccordion from '@/components/ui/projectAccordion'


const Aside = ({ refresh }) => {

    const items = [
        {
            icon: List,
            title: 'All Tasks',
            url: "/"
        },
        {
            icon: Star,
            title: "Starred",
            url: "/starred"
        },
      
        {
            icon: CircleCheckBig,
            title: 'Completed',
            url: "/completed"
        }
    ]


  return (
    <>    
        {/*mobile menu  */}
        <div className='md:hidden'>
            <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupContent className='bg-blue-100'>
                    <SidebarMenu className='flex hover:bg-blue-100'>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className='bg-blue-100'>
                        <SidebarMenuButton asChild>
                            <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <h1>My Projects</h1>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="bg-blue-500 hover:bg-blue-600">
                                    <CirclePlus />Create New Project
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            </Sidebar>
        </div>

        {/* desktop menu */}
            <div className='md:flex'>
                <Sidebar>
                <SidebarContent>
                    <SidebarHeader >
                        <div className='flex w-full justify-between'>
                            <div className='flex gap-4 text-bold'>
                                <SquareCheckBig />
                                <h1>To do</h1>
                            </div>
                            <div>
                                <SidebarTrigger />
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenuButton 
                            onClick={() => window.dispatchEvent(new CustomEvent('openAddTaskModal'))}
                            className="bg-blue-500 hover:bg-blue-600 text-white mb-6">
                            <Plus />Add Task
                        </SidebarMenuButton>
                        <SidebarMenu className='flex '>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <ProjectAccordion />
                          </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                </Sidebar>
            </div>
    </>
  )
}

export default Aside
