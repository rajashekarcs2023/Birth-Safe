"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/supabase-auth-provider"

interface UserData {
  name?: string
  email?: string
  avatar_url?: string
}

export function UserProfile() {
  const { user, isLoading, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  if (isLoading) {
    return <div>Loading profile...</div>
  }

  if (!user) {
    return <div>Please log in to view your profile</div>
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user?.user_metadata?.avatar_url || `/placeholder.svg?height=50&width=50`} alt={user?.user_metadata?.name || user?.email} />
          <AvatarFallback>{(user?.user_metadata?.name || user?.email || '?').charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user?.user_metadata?.name || 'User'}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Account Information</h3>
            <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
          </div>
          {/* More profile information would go here */}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Log Out
        </Button>
      </CardFooter>
    </Card>
  )
}

