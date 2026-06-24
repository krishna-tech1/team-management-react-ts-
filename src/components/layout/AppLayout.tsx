import { Outlet } from "react-router-dom"
import { Sidebar, type NavItem } from "./Sidebar"
import { Topbar } from "./Topbar"
import { useState } from "react"

export function AppLayout({
  navItems,
  userName,
  userRole,
  searchPlaceholder,
}: {
  navItems: NavItem[]
  userName: string
  userRole: string
  searchPlaceholder?: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen bg-canvas">
      <div className="hidden md:block">
        <Sidebar title="Admin Console" subtitle="GST & MCA Operations" items={navItems} />
      </div>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 w-72">
            <Sidebar title="Admin Console" subtitle="GST & MCA Operations" items={navItems} />
          </div>
        </div>
      )}

      <div className="md:pl-[var(--sidebar-width)]">
        <Topbar userName={userName} userRole={userRole} searchPlaceholder={searchPlaceholder} onOpenSidebar={() => setMobileOpen(true)} />
        <main className="px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
