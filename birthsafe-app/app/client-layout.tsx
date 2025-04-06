"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { usePathname } from "next/navigation"
import { LanguageProvider } from "@/contexts/language-context"
import { SupabaseAuthProvider } from "@/components/supabase-auth-provider"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseAuthProvider>
          <LanguageProvider>
            <SidebarProvider>
              {pathname !== "/" && <AppSidebar />}
              <SidebarInset className="bg-slate-50">{children}</SidebarInset>
              <Toaster />
            </SidebarProvider>
          </LanguageProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  )
}

