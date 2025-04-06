"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Info,
  Pill,
  Shield,
  Sparkles,
  Sun,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChatAssistant } from "@/components/chat-assistant"

export default function FeedPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const carouselRef = useRef(null)

  const feedCards = [
    {
      id: "morning-greeting",
      type: "greeting",
      priority: "normal",
    },
    {
      id: "risk-monitoring",
      type: "risk",
      priority: "high",
    },
    {
      id: "kick-counter",
      type: "activity",
      priority: "medium",
    },
    {
      id: "wellbeing",
      type: "wellbeing",
      priority: "normal",
    },
    {
      id: "medication",
      type: "medication",
      priority: "medium",
    },
  ]

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % feedCards.length)
  }

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + feedCards.length) % feedCards.length)
  }

  const currentCard = feedCards[currentCardIndex]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      {/* Patient Info */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-blue-100">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">SW</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Good morning, Sarah</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">
                32 weeks
              </Badge>
              <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">
                High-risk pregnancy
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Inspirational Quote */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-1 mb-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Daily Inspiration</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-slate-700 italic">
            "You are not just growing a baby, you are growing as a mother — strong, capable, and beautiful."
          </p>
        </div>

        {/* Card Carousel */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-sm"
              onClick={prevCard}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="overflow-hidden py-6" ref={carouselRef}>
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-6"
            >
              <Card className="bg-white border-none shadow-md overflow-hidden">
                {currentCard.type === "greeting" && (
                  <>
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-3" />
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-100 rounded-full p-3">
                          <Sun className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-slate-800">Good morning, Sarah</h2>
                          <p className="text-slate-500">Tuesday, April 5</p>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-6">
                        You're in week 32 of your pregnancy journey. Your baby is now the size of a squash and weighs
                        about 4 pounds. Your little one is developing more fat, making their skin less wrinkled and more
                        smooth.
                      </p>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 rounded-full p-2 mt-1">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">Upcoming appointment</h3>
                            <p className="text-slate-600 text-sm">Dr. Emily Smith, April 12 at 10:00 AM</p>
                            <Button variant="link" className="p-0 h-auto text-blue-600 text-sm mt-1">
                              View details
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <p className="text-sm text-slate-500 mb-2">Your pregnancy progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={80} className="h-2.5 flex-1" />
                          <span className="text-sm font-medium">80%</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Week 1</span>
                          <span>Week 40</span>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}

                {currentCard.type === "risk" && (
                  <>
                    <div className="bg-gradient-to-r from-amber-300 to-red-300 h-3" />
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-amber-100 rounded-full p-3">
                          <AlertTriangle className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <Badge className="bg-amber-100 text-amber-700 mb-2">Attention needed</Badge>
                          <h2 className="text-xl font-semibold text-slate-800">Risk Monitoring Status</h2>
                          <p className="text-slate-500 text-sm">Based on your placenta position</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <span className="text-sm">Ultrasound scan at 32 weeks</span>
                          </div>
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">MISSED</Badge>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                          <p className="text-sm text-amber-800">
                            Based on your placenta position, clinical guidelines recommend an additional ultrasound scan
                            at 32 weeks. This scan appears to be missing from your care plan.
                          </p>
                        </div>

                        <div className="bg-white rounded-md p-4 border border-slate-200">
                          <h4 className="text-sm font-medium text-slate-800 mb-1">Why this matters:</h4>
                          <p className="text-xs text-slate-600">
                            For patients with your placenta position, regular monitoring is essential to detect
                            potential complications early. Missing this scan could delay important interventions.
                          </p>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-auto">Take Action Now</Button>
                    </CardContent>
                  </>
                )}

                {currentCard.type === "activity" && (
                  <>
                    <div className="bg-gradient-to-r from-green-300 to-blue-300 h-3" />
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-green-100 rounded-full p-3">
                          <Activity className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-slate-800">Kick Counter</h2>
                          <p className="text-slate-500 text-sm">Connect with your baby's movements</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-700">
                            Counting kicks is a beautiful way to bond with your baby and monitor their well-being. Aim
                            for 10 kicks in under 2 hours.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Clock className="h-5 w-5" />
                          <span>Last count: 10 kicks in 45 minutes</span>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          Normal
                        </Badge>
                      </div>

                      <div className="text-center my-4">
                        <div className="inline-block bg-green-50 rounded-full p-4 mb-2">
                          <Activity className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-slate-600 text-sm">
                          Each kick is a reminder of the little life growing inside you.
                        </p>
                      </div>

                      <Button className="w-full mt-auto" asChild>
                        <Link href="/kick-counter">Start Kick Counter</Link>
                      </Button>
                    </CardContent>
                  </>
                )}

                {currentCard.type === "wellbeing" && (
                  <>
                    <div className="bg-gradient-to-r from-purple-300 to-pink-300 h-3" />
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-purple-100 rounded-full p-3">
                          <Heart className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-slate-800">Wellbeing Check-in</h2>
                          <p className="text-slate-500 text-sm">How are you feeling today?</p>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4 text-center">
                        Your emotional wellbeing matters just as much as your physical health. Take a moment for
                        yourself.
                      </p>

                      <div className="flex justify-between my-4">
                        <button className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-xl">😔</span>
                          </div>
                          <span className="text-xs mt-1">Low</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="text-xl">😕</span>
                          </div>
                          <span className="text-xs mt-1">Okay</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xl">😐</span>
                          </div>
                          <span className="text-xs mt-1">Neutral</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-xl">🙂</span>
                          </div>
                          <span className="text-xs mt-1">Good</span>
                        </button>
                        <button className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-xl">😀</span>
                          </div>
                          <span className="text-xs mt-1">Great</span>
                        </button>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-6">
                        <p className="text-sm text-purple-700">
                          Remember that it's okay to have mixed feelings during pregnancy. Your journey is unique, and
                          all your emotions are valid.
                        </p>
                      </div>

                      <Button className="w-full mt-auto" variant="outline" asChild>
                        <Link href="/wellbeing">Complete Wellbeing Check</Link>
                      </Button>
                    </CardContent>
                  </>
                )}

                {currentCard.type === "medication" && (
                  <>
                    <div className="bg-gradient-to-r from-blue-300 to-cyan-300 h-3" />
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-100 rounded-full p-3">
                          <Pill className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <Badge className="bg-blue-100 text-blue-700 mb-2">Due today</Badge>
                          <h2 className="text-xl font-semibold text-slate-800">Medication Reminder</h2>
                          <p className="text-slate-500 text-sm">Your prenatal vitamins</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Pill className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Prenatal vitamin</p>
                              <p className="text-sm text-slate-500">1 tablet, Daily</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">Due now</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Iron supplement</p>
                              <p className="text-sm text-slate-500">1 tablet, Twice daily</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Taken</Badge>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm text-center mb-6">
                        Taking your vitamins regularly helps support your baby's development and your own health during
                        pregnancy.
                      </p>

                      <div className="flex gap-3 mt-auto">
                        <Button className="flex-1">Mark as taken</Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href="/medication">View all</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-sm"
              onClick={nextCard}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Card Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {feedCards.map((card, index) => (
            <button
              key={card.id}
              className={`h-2 rounded-full transition-all ${
                index === currentCardIndex ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
              }`}
              onClick={() => setCurrentCardIndex(index)}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <span>Quick Actions</span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/symptom-tracker"
              className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="bg-red-100 rounded-full p-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-medium">Report Symptom</span>
            </Link>
            <Link
              href="/medication"
              className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 rounded-full p-2 mb-2">
                <Pill className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Medication Check</span>
            </Link>
            <Link
              href="/kick-counter"
              className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="bg-green-100 rounded-full p-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium">Kick Counter</span>
            </Link>
            <Link
              href="/emergency"
              className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="bg-amber-100 rounded-full p-2 mb-2">
                <Shield className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-sm font-medium">Emergency Help</span>
            </Link>
          </div>
        </div>
      </div>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  )
}

