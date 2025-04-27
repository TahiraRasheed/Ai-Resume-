"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [miniSidebar, setMiniSidebar] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle responsive behavior
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
      setMiniSidebar(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  // Toggle sidebar between full, mini, and closed states
  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setMiniSidebar(!miniSidebar)
    }
  }

  // Handle click outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, sidebarOpen])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Backdrop overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar open={sidebarOpen} miniSidebar={miniSidebar} />
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden",
          !isMobile && "transition-all duration-300",
          !isMobile && miniSidebar ? "lg:ml-16" : !isMobile ? "lg:ml-64" : "",
        )}
      >
        <Header toggleSidebar={toggleSidebar} miniSidebar={miniSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
