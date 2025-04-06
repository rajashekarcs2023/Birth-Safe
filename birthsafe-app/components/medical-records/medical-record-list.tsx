"use client"

import { useState, useEffect } from "react"
import { mockSupabase } from "@/lib/mock-supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface MedicalRecord {
  id: string
  user_id: string
  title: string
  description: string
  date: string
  created_at: string
}

export function MedicalRecordList() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      // In a real implementation, this would use the actual Supabase client
      // and would be authenticated with Auth0
      const mockUser = localStorage.getItem("mockUser")
      if (!mockUser) {
        setLoading(false)
        return
      }

      // Mock fetching records
      const { data, error } = await mockSupabase
        .from("medical_records")
        .select("*")
        .eq("user_id", "1") // Mock user ID
        .order("date", { ascending: false })

      if (error) {
        console.error("Error fetching records:", error)
      } else {
        setRecords(data as MedicalRecord[])
      }

      setLoading(false)
    }

    fetchRecords()
  }, [])

  if (loading) {
    return <div>Loading medical records...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medical Records</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </div>

      {records.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No medical records found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {records.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <CardTitle>{record.title}</CardTitle>
                <CardDescription>Date: {new Date(record.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{record.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

