"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function DirectLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage("Logging in...")

    try {
      // Direct Supabase call
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      setMessage("Login successful! Setting session cookie...")
      
      // Force a page refresh to ensure cookies are set
      setMessage("Login successful! Redirecting to onboarding...")
      
      // Force a direct navigation to onboarding
      window.location.href = "/onboarding"
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Direct Login</h1>
          <p className="mt-2 text-gray-600">Use this page for a direct login that works</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {error && (
            <div className="p-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          
          {message && (
            <div className="p-4 text-green-700 bg-green-100 rounded-md">
              {message}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
