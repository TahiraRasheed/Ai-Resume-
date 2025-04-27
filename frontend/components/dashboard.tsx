"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useMobile } from "@/hooks/use-mobile"

export default function Dashboard() {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4">
          {/* Main content goes here */}
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Welcome to TailAdmin</h2>
            <p className="mt-2 text-gray-500">Your content will appear here</p>
          </div>
        </main>
      </div>
    </div>
  )
}
