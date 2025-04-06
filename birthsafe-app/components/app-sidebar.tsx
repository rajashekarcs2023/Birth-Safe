"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  FileText,
  Heart,
  Home,
  Users,
  Shield,
  Sparkles,
  Settings,
  BookOpen,
  MapPin,
  Apple,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  const isActive = (path: string) => {
    if (path === "/feed" && pathname === "/feed") return true
    if (path === "/dashboard" && pathname === "/dashboard") return true
    if (path === "/timeline" && pathname.includes("/timeline")) return true
    if (path === "/journal" && pathname.includes("/journal")) return true
    if (path === "/resources" && pathname.includes("/resources")) return true
    if (path === "/profile" && pathname.includes("/profile")) return true
    if (path === "/settings" && pathname.includes("/settings")) return true
    if (path === "/educational-modules" && pathname.includes("/educational-modules")) return true
    if (path === "/nutrition-guide" && pathname.includes("/nutrition-guide")) return true
    if (path === "/nearest-facility" && pathname.includes("/nearest-facility")) return true
    return false
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="pb-0">
        <div className={`flex items-center ${state === "collapsed" ? "justify-center" : "gap-2 px-3"} py-3`}>
          <div
            className={`bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center ${state === "collapsed" ? "w-8 h-8" : "p-1.5 w-8 h-8 flex-shrink-0"}`}
          >
            <Shield className="h-5 w-5 text-white" />
          </div>
          {state === "expanded" && (
            <div className="flex items-center gap-1">
              <span className="font-bold text-xl text-blue-600">Birth</span>
              <span className="font-bold text-xl text-purple-600">Safe</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <div className="md:hidden fixed top-4 right-4 z-20">
        <SidebarTrigger className="bg-white shadow-sm rounded-full p-2" />
      </div>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/feed")} tooltip="Your Journey Feed">
              <Link href="/feed">
                <Sparkles className="text-pink-500" />
                <span>Your Journey</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")} tooltip="Safety Dashboard">
              <Link href="/dashboard">
                <Home />
                <span>Safety Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/timeline")} tooltip="Your Timeline">
              <Link href="/timeline">
                <Calendar />
                <span>Your Timeline</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/journal")} tooltip="Birth Journal">
              <Link href="/journal">
                <FileText />
                <span>Birth Journal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/resources")} tooltip="Community & Resources">
              <Link href="/resources">
                <Users className="text-indigo-500" />
                <span>Community & Resources</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/educational-modules")} tooltip="Educational Modules">
              <Link href="/educational-modules">
                <BookOpen className="text-blue-500" />
                <span>Educational Modules</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/nutrition-guide")} tooltip="Nutrition Guide">
              <Link href="/nutrition-guide">
                <Apple className="text-green-500" />
                <span>Nutrition Guide</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/nearest-facility")} tooltip="Nearest Safe Facility">
              <Link href="/nearest-facility">
                <MapPin className="text-blue-500" />
                <span>Nearest Facility</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Language & Audio Settings">
              <Link href="/settings">
                <Settings className="text-slate-500" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pb-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/profile")} tooltip="Your Wellbeing">
              <Link href="/profile">
                <Heart className="text-pink-500" />
                <span>Your Wellbeing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

