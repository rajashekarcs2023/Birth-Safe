"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthTest() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      // Direct Supabase call to test connection
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: "Test User",
            user_type: "expectant"
          }
        }
      })
      
      if (error) throw error
      
      setResult(data)
      console.log("Signup result:", data)
    } catch (err) {
      console.error("Error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      // Direct Supabase call to test connection
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      setResult(data)
      console.log("Signin result:", data)
    } catch (err) {
      console.error("Error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const checkSession = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      const { data, error } = await supabase.auth.getSession()
      
      if (error) throw error
      
      setResult(data)
      console.log("Session:", data)
    } catch (err) {
      console.error("Error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Supabase Auth Test</h1>
        
        <form className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            
            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            
            <button
              type="button"
              onClick={checkSession}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Check Session
            </button>
          </div>
        </form>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60 text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
