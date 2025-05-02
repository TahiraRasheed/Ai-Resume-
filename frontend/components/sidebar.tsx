"use client"

import type React from "react"
import '../app/globals.css'; 

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import {
  LayoutGrid,
  FileText,
  Users,
  ClipboardList,
  BarChart3,
  Boxes,
  KeyRound,
  ChevronDown,
  ChevronUp,
  ChartArea,
  Settings,
} from "lucide-react"

interface SidebarProps {
  open: boolean
  miniSidebar: boolean
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  hasDropdown?: boolean
  miniSidebar: boolean
}

const NavItem = ({ icon, label, href, hasDropdown = false, miniSidebar }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-blue-50 hover:text-black",
          isActive && "bg-blue-50 text-blue-600",
          miniSidebar && "justify-center px-2",
        )}
        onClick={
          hasDropdown
            ? (e) => {
                e.preventDefault()
                setIsOpen(!isOpen)
              }
            : undefined
        }
      >
        <span className="flex h-6 w-6 items-center justify-center">{icon}</span>
        {!miniSidebar && (
          <>
            <span className="flex-1 text-sm font-medium text-[#ffffff] hover:text-[black]">{label}</span>
            {hasDropdown && (
              <span className="text-[#ffffff]">{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            )}
          </>
        )}
      </Link>
    </li>
  )
}

export default function Sidebar({ open, miniSidebar }: SidebarProps) {
  const isMobile = useMobile()

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 transform border-r border-gray-200 sidebar-gradient-bg transition-all duration-300 ease-in-out",
        // On mobile: position as overlay
        isMobile ? "w-64" : miniSidebar ? "w-16" : "w-64",
        // On mobile: translate out of view when closed
        open ? "translate-x-0" : "-translate-x-full",
        // On desktop: adjust position based on mini state
        !isMobile && "lg:translate-x-0",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-gray-200 transition-all",
            miniSidebar ? "justify-center px-2" : "gap-2 px-4",
          )}
        >
          <div className="hidden flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <LayoutGrid size={20} />
          </div>
          {!miniSidebar && <span className="text-xl font-bold text-[#ffffff]">AI CV Analyzer</span>}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {!miniSidebar && (
            <div className="px-4 pb-2">
              <p className="text-xs font-semibold uppercase text-[#ffffff]">Menu</p>
            </div>
          )}
          <nav className={cn("space-y-1", miniSidebar ? "px-1" : "px-2")}>
            <ul className="space-y-1">
            <NavItem
  icon={<LayoutGrid size={18} />}
  label="Dashboard"
  href="/dashboard"             // if you have a dashboard/index/page.tsx
  miniSidebar={miniSidebar}
/>

<NavItem
  icon={<FileText size={18} />}
  label="Resume"
  href="/dashboard/resume"
  miniSidebar={miniSidebar}
/>

<NavItem
  icon={<Users size={18} />}
  label="Jobs"
  href="/dashboard/jobs"
  miniSidebar={miniSidebar}
/>

<NavItem
  icon={<ChartArea size={18} />}
  label="Analytics"
  href="/dashboard/analytics"
  miniSidebar={miniSidebar}
/>

            </ul>
          </nav>
</div>
      </div>
    </aside>
  )
}