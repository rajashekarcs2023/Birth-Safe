// This is a mock implementation of the Supabase client
// In a real implementation, you would use the actual Supabase client

interface User {
  id: string
  name: string
  email: string
  created_at: string
}

interface MedicalRecord {
  id: string
  user_id: string
  title: string
  description: string
  date: string
  created_at: string
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    created_at: "2023-01-01T00:00:00Z",
  },
]

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    user_id: "1",
    title: "Initial Consultation",
    description: "First prenatal visit with Dr. Smith",
    date: "2023-02-15",
    created_at: "2023-02-15T14:30:00Z",
  },
  {
    id: "2",
    user_id: "1",
    title: "Ultrasound",
    description: "20-week anatomy scan",
    date: "2023-04-10",
    created_at: "2023-04-10T10:15:00Z",
  },
]

// Mock Supabase client
export const mockSupabase = {
  from: (table: string) => {
    // Mock implementation of the from method
    const handlers = {
      select: (columns = "*") => {
        return {
          eq: (column: string, value: any) => {
            return {
              single: () => {
                if (table === "profiles") {
                  const user = mockUsers.find((u) => u.id === value || u.email === value)
                  return Promise.resolve({ data: user, error: user ? null : new Error("User not found") })
                }
                return Promise.resolve({ data: null, error: new Error("Not implemented") })
              },
              order: () => {
                return {
                  data: table === "medical_records" ? mockMedicalRecords.filter((r) => r.user_id === value) : [],
                  error: null,
                }
              },
            }
          },
          data: table === "medical_records" ? mockMedicalRecords : mockUsers,
          error: null,
        }
      },
      insert: (data: any) => {
        return Promise.resolve({ data: { ...data, id: Date.now().toString() }, error: null })
      },
      update: (data: any) => {
        return {
          eq: (column: string, value: any) => {
            return Promise.resolve({ data, error: null })
          },
        }
      },
      delete: () => {
        return {
          eq: (column: string, value: any) => {
            return Promise.resolve({ data: null, error: null })
          },
        }
      },
    }

    return handlers
  },
  auth: {
    getUser: () => {
      const mockUser = localStorage.getItem("mockUser")
      return Promise.resolve({
        data: { user: mockUser ? JSON.parse(mockUser) : null },
        error: null,
      })
    },
    signOut: () => {
      localStorage.removeItem("mockUser")
      return Promise.resolve({ error: null })
    },
  },
  storage: {
    from: (bucket: string) => {
      return {
        upload: (path: string, file: File) => {
          return Promise.resolve({
            data: { path },
            error: null,
          })
        },
        getPublicUrl: (path: string) => {
          return { publicUrl: `/placeholder.svg?height=200&width=200` }
        },
      }
    },
  },
}

