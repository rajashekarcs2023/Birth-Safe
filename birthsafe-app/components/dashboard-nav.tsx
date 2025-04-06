"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart, FileText, Home, MessageSquare, Shield, Users, Heart, BrainCircuit } from "lucide-react"

const items = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Risk Monitor",
    href: "/dashboard/risk-monitor",
    icon: Shield,
  },
  {
    name: "Decision Support",
    href: "/dashboard/decision-support",
    icon: FileText,
  },
  {
    name: "Record Keeping",
    href: "/dashboard/records",
    icon: MessageSquare,
  },
  {
    name: "Community",
    href: "/dashboard/community",
    icon: Users,
  },
  {
    name: "Emotional Support",
    href: "/dashboard/emotional-support",
    icon: Heart,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    name: "AI Monitoring",
    href: "/dashboard/ai-monitoring",
    icon: BrainCircuit,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 p-4">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

