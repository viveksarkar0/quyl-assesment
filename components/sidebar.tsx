'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Users, BookOpen, HelpCircle, Settings, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Chapter', href: '/chapter', icon: BookOpen },
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Reports', href: '/reports', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="w-[240px] border-r border-gray-200">
      <SidebarHeader className="p-6">
      <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 4L24 16L8 28V4Z" fill="currentColor" />
          </svg>
          <span className="text-xl font-bold">Quyl.</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-11 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
