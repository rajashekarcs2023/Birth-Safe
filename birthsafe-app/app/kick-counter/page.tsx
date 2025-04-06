"use client"

import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Activity, Play, Pause, RotateCcw, Clock, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface KickCountEntry {
  id: string
  date: string
  startTime: string
  endTime: string
  kickCount: number
  timeElapsed: string
  status: "normal" | "warning" | "danger"
  comment: string
}

export default function KickCounterPage() {
  const [isActive, setIsActive] = useState(false)
  const [kickCount, setKickCount] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [status, setStatus] = useState<"normal" | "warning" | "danger">("normal")
  const [history, setHistory] = useState<KickCountEntry[]>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kickCountHistory")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [comment, setComment] = useState("")

  // Target is 10 kicks
  const targetKicks = 10

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Start or pause the counter
  const toggleCounter = () => {
    if (isActive) {
      // Pause
      setIsActive(false)
    } else {
      // Start or resume
      setIsActive(true)
      if (startTime === null) {
        setStartTime(Date.now())
      }
    }
  }

  // Record a kick
  const recordKick = () => {
    if (isActive && kickCount < targetKicks) {
      const newCount = kickCount + 1
      setKickCount(newCount)

      // If we've reached the target, stop the counter and show results
      if (newCount === targetKicks) {
        setIsActive(false)
        setShowResults(true)

        // Determine status based on time
        if (elapsedTime < 1200) {
          // Less than 20 minutes
          setStatus("normal")
        } else if (elapsedTime < 3600) {
          // Between 20 minutes and 1 hour
          setStatus("normal")
        } else {
          // More than 1 hour
          setStatus("warning")
        }
      }
    }
  }

  // Reset the counter
  const resetCounter = () => {
    setIsActive(false)
    setKickCount(0)
    setElapsedTime(0)
    setStartTime(null)
    setShowResults(false)
  }

  // Update elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  const saveEntry = () => {
    const now = new Date()
    const startTimeObj = startTime ? new Date(startTime) : now

    const newEntry: KickCountEntry = {
      id: Date.now().toString(),
      date: now.toLocaleDateString(),
      startTime: startTimeObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      endTime: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      kickCount,
      timeElapsed: formatTime(elapsedTime),
      status,
      comment,
    }

    const updatedHistory = [newEntry, ...history]
    setHistory(updatedHistory)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("kickCountHistory", JSON.stringify(updatedHistory))
    }

    // Reset comment
    setComment("")
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kickCountHistory", JSON.stringify(history))
    }
  }, [history])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-800">Kick Counter</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        {!showResults ? (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
              <p className="text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>
                  Count your baby's movements. Aim for 10 kicks in under 2 hours. If it takes longer, contact your
                  provider.
                </span>
              </p>
            </div>

            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-48 h-48 mb-6">
                  <div className="absolute inset-0 rounded-full bg-blue-100 flex items-center justify-center">
                    <Activity className="h-16 w-16 text-blue-600" />
                  </div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * kickCount) / targetKicks}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-slate-800">{kickCount}</span>
                    <span className="text-sm text-slate-500">of {targetKicks} kicks</span>
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="h-5 w-5" />
                      <span>{formatTime(elapsedTime)}</span>
                    </div>
                    <Badge variant="outline" className="text-blue-600">
                      {isActive ? "Counting..." : "Paused"}
                    </Badge>
                  </div>

                  <Progress value={(kickCount / targetKicks) * 100} className="h-2" />

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex-1" onClick={toggleCounter}>
                      {isActive ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          {startTime === null ? "Start" : "Resume"}
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={resetCounter}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  size="lg"
                  className="w-full py-8 text-lg"
                  disabled={!isActive || kickCount >= targetKicks}
                  onClick={recordKick}
                >
                  I Felt a Kick
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-800">Tips:</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">•</div>
                  <span>Lie on your left side in a quiet place</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">•</div>
                  <span>Count any movement: kicks, flutters, swishes, or rolls</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">•</div>
                  <span>Try having a cold drink or eating a snack to stimulate movement</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              {status === "normal" ? (
                <div className="bg-green-100 rounded-full p-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              ) : status === "warning" ? (
                <div className="bg-amber-100 rounded-full p-4">
                  <AlertTriangle className="h-10 w-10 text-amber-600" />
                </div>
              ) : (
                <div className="bg-red-100 rounded-full p-4">
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                {status === "normal"
                  ? "Normal Movement"
                  : status === "warning"
                    ? "Discuss with Provider"
                    : "Contact Provider Now"}
              </h2>
              <p className="text-slate-600">
                {status === "normal"
                  ? "Your baby's movement pattern is within normal range."
                  : status === "warning"
                    ? "It took longer than expected to feel 10 kicks."
                    : "Reduced movement may indicate a problem."}
              </p>
            </div>

            <Card
              className={`
              ${
                status === "normal"
                  ? "bg-green-50 border-green-200"
                  : status === "warning"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-red-50 border-red-200"
              }
            `}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Kicks counted:</span>
                  <span className="text-sm">{kickCount} kicks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Time taken:</span>
                  <span className="text-sm">{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average time per kick:</span>
                  <span className="text-sm">{formatTime(Math.floor(elapsedTime / kickCount))}</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">What this means:</h3>
                  {status === "normal" ? (
                    <p className="text-sm text-green-800">
                      Your baby is showing a healthy movement pattern. Continue to monitor daily.
                    </p>
                  ) : status === "warning" ? (
                    <p className="text-sm text-amber-800">
                      It took longer than expected to feel 10 kicks. Mention this to your healthcare provider at your
                      next appointment.
                    </p>
                  ) : (
                    <p className="text-sm text-red-800">
                      Reduced movement may indicate a problem. Contact your healthcare provider right away.
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <div className="w-full">
                  <Textarea
                    placeholder="Add notes about this session..."
                    className="w-full resize-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="flex w-full gap-3">
                  <Button variant="outline" className="flex-1" onClick={resetCounter}>
                    Start new count
                  </Button>
                  <Button className="flex-1" onClick={saveEntry}>
                    Save & exit
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {status !== "normal" && (
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">What to do next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                    </div>
                    <p className="text-sm text-amber-800">
                      Call your healthcare provider and explain your kick count results.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                    </div>
                    <p className="text-sm text-amber-800">
                      Say: "I'm 32 weeks pregnant and it took me {formatTime(elapsedTime)} to feel 10 kicks. I have a
                      high-risk pregnancy due to placenta position."
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                    </div>
                    <p className="text-sm text-amber-800">
                      Ask: "Should I come in for monitoring? What signs should I watch for?"
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Call Provider Now</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
        {history.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">History</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to clear all history?")) {
                    setHistory([])
                    localStorage.removeItem("kickCountHistory")
                  }
                }}
              >
                Clear All
              </Button>
            </div>

            <Card>
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-center">Kicks</TableHead>
                      <TableHead className="text-center">Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((entry) => (
                      <TableRow
                        key={entry.id}
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => {
                          // You could add a modal or expand the row to show more details
                          alert(`Notes: ${entry.comment || "No notes added"}`)
                        }}
                      >
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.startTime}</TableCell>
                        <TableCell className="text-center">{entry.kickCount}</TableCell>
                        <TableCell className="text-center">{entry.timeElapsed}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              entry.status === "normal"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : entry.status === "warning"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {entry.status === "normal" ? "Normal" : entry.status === "warning" ? "Warning" : "Alert"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

