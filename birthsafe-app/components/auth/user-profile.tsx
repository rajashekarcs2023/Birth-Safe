"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  name: string
  email: string
  picture: string
}

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // that uses Auth0 and Supabase
    const mockUser = localStorage.getItem("mockUser")
    if (mockUser) {
      setUser(JSON.parse(mockUser))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    // In a real implementation, this would call Auth0 logout
    // window.location.href = '/api/auth/logout'

    // For demo purposes, just clear the mock user
    localStorage.removeItem("mockUser")
    window.location.href = "/"
  }

  if (loading) {
    return <div>Loading profile...</div>
  }

  if (!user) {
    return <div>Please log in to view your profile</div>
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.picture} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
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

