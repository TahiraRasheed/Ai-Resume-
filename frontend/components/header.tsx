"use client"

import { Bell, ChevronDown, Menu, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import '../app/globals.css'; 
interface HeaderProps {
  toggleSidebar: () => void
  miniSidebar: boolean
}

interface NavLinkProps {
  href: string
  label: string
}

const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn("px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600", isActive && "text-blue-600")}
    >
      {label}
    </Link>
  )
}

export default function Header({ toggleSidebar, miniSidebar }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 header-gradient-bg px-4">
      <Button variant="ghost" size="icon" className="mr-4" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {/* Navigation */}
      <div className="hidden md:flex md:flex-1">
        <nav className="flex">
          <NavLink href="/resumes" label="Resumes" />
          <NavLink href="/jobs" label="Jobs" />
          <NavLink href="/analytics" label="Analytics" />
          <NavLink href="/settings" label="Settings" />
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="flex flex-1 items-center justify-between md:justify-end">
        <div className="md:hidden">
          <select
            className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => {
              window.location.href = e.target.value
            }}
            value={pathname}
          >
            <option value="/resumes">Resumes</option>
            <option value="/jobs">Jobs</option>
            <option value="/analytics">Analytics</option>
            <option value="/settings">Settings</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Hamza" />
                  <AvatarFallback>HZ</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium text-gray-700 md:inline-block">Hamza</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Hamza</p>
                  <p className="text-xs text-muted-foreground">hamza@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex w-full cursor-pointer items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex w-full cursor-pointer items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex cursor-pointer items-center text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
