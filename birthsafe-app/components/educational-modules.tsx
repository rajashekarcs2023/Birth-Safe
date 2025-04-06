"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, BookOpen, Award, CheckCircle, Calendar, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample module data
const modules = [
  {
    id: 1,
    week: "Week 28",
    title: "Understanding Kick Counts",
    description: "Learn why monitoring your baby's movements is critical for safety.",
    content: `
      <h3>Why Kick Counts Matter</h3>
      <p>Monitoring your baby's movements is one of the most reliable ways to track their wellbeing. A change in movement can be an early warning sign that your baby needs attention.</p>
      
      <h3>What's Normal?</h3>
      <p>Every baby has their own pattern of movement. By week 28, you should feel at least 10 movements within a 2-hour period. Most healthy babies will reach 10 movements in less than 30 minutes.</p>
      
      <h3>When to Be Concerned</h3>
      <p>Contact your healthcare provider immediately if:</p>
      <ul>
        <li>You notice a significant decrease in movement</li>
        <li>It takes much longer than usual to feel 10 movements</li>
        <li>You feel no movements over a 2-hour period</li>
      </ul>
      
      <h3>Research Insight</h3>
      <p>Studies show that maternal monitoring of fetal movement can reduce stillbirth rates by up to 30% when combined with appropriate medical response.</p>
    `,
    completed: false,
    quizQuestions: [
      {
        question: "By week 28, how many movements should you feel within a 2-hour period?",
        options: ["At least 5", "At least 10", "At least 20", "It doesn't matter"],
        correctAnswer: 1,
      },
      {
        question: "What should you do if you notice a significant decrease in movement?",
        options: [
          "Wait until tomorrow to see if it improves",
          "Drink cold water and lie down",
          "Contact your healthcare provider immediately",
          "Increase your physical activity",
        ],
        correctAnswer: 2,
      },
    ],
    urgency: "important",
  },
  {
    id: 2,
    week: "Week 29",
    title: "Recognizing Preterm Labor Signs",
    description: "Learn to identify the early warning signs of preterm labor.",
    content: `
      <h3>Preterm Labor Warning Signs</h3>
      <p>Recognizing the signs of preterm labor (labor before 37 weeks) can help you get timely medical care.</p>
      
      <h3>Key Signs to Watch For</h3>
      <ul>
        <li>Regular or frequent contractions (tightening of the uterus)</li>
        <li>Constant low, dull backache</li>
        <li>A feeling of pressure in the pelvis or lower abdomen</li>
        <li>Mild abdominal cramps</li>
        <li>Vaginal spotting or bleeding</li>
        <li>Watery vaginal discharge (may indicate your water has broken)</li>
      </ul>
      
      <h3>What to Do</h3>
      <p>If you experience any of these symptoms before 37 weeks:</p>
      <ol>
        <li>Empty your bladder</li>
        <li>Drink 2-3 glasses of water</li>
        <li>Lie down on your left side for one hour</li>
        <li>If symptoms continue or worsen, call your healthcare provider immediately</li>
      </ol>
      
      <h3>Risk Reduction</h3>
      <p>Stay well-hydrated, avoid standing for long periods, and attend all prenatal appointments to help reduce your risk of preterm labor.</p>
    `,
    completed: false,
    quizQuestions: [
      {
        question: "Which of these is NOT a sign of preterm labor?",
        options: ["Regular contractions", "Mild fever", "Vaginal spotting", "Constant low backache"],
        correctAnswer: 1,
      },
      {
        question: "What should you do first if you suspect preterm labor?",
        options: [
          "Go to the hospital immediately",
          "Take pain medication",
          "Empty bladder, drink water, and lie down",
          "Take a warm bath",
        ],
        correctAnswer: 2,
      },
    ],
    urgency: "critical",
  },
  {
    id: 3,
    week: "Week 30",
    title: "Understanding Fetal Heart Rate Patterns",
    description: "Learn what different heart rate patterns mean for your baby's health.",
    content: `
      <h3>Normal Fetal Heart Rate</h3>
      <p>A healthy baby's heart rate typically ranges from 110-160 beats per minute. The heart rate should increase during movement and decrease slightly during rest periods.</p>
      
      <h3>Monitoring at Home</h3>
      <p>While professional monitoring happens at appointments, you can be aware of your baby's patterns:</p>
      <ul>
        <li>Notice if your baby seems more active at certain times of day</li>
        <li>Be aware that heart rate and movement are connected</li>
        <li>Track kick counts at the same time each day for consistency</li>
      </ul>
      
      <h3>Warning Signs</h3>
      <p>Contact your provider if you notice:</p>
      <ul>
        <li>Significantly decreased movement</li>
        <li>Extremely rapid movement followed by no movement</li>
        <li>Any unusual patterns that differ from your baby's normal behavior</li>
      </ul>
      
      <h3>During Labor</h3>
      <p>During labor, healthcare providers will monitor your baby's heart rate for signs of distress. Understanding these patterns helps you advocate for appropriate care.</p>
    `,
    completed: false,
    quizQuestions: [
      {
        question: "What is the normal range for fetal heart rate?",
        options: [
          "90-120 beats per minute",
          "110-160 beats per minute",
          "140-180 beats per minute",
          "160-200 beats per minute",
        ],
        correctAnswer: 1,
      },
      {
        question: "What should happen to the baby's heart rate during movement?",
        options: [
          "It should decrease",
          "It should increase",
          "It should stay exactly the same",
          "It should become irregular",
        ],
        correctAnswer: 1,
      },
    ],
    urgency: "normal",
  },
  {
    id: 4,
    week: "Week 31",
    title: "Monitoring for Preeclampsia",
    description: "Learn the warning signs of this serious pregnancy complication.",
    content: `
      <h3>What is Preeclampsia?</h3>
      <p>Preeclampsia is a pregnancy complication characterized by high blood pressure and signs of damage to other organ systems. It typically occurs after 20 weeks of pregnancy and can be dangerous for both mother and baby if left untreated.</p>
      
      <h3>Warning Signs</h3>
      <p>Be alert for these symptoms and report them immediately:</p>
      <ul>
        <li>Severe headaches that don't improve with medication</li>
        <li>Vision changes (blurred vision, seeing spots, light sensitivity)</li>
        <li>Pain in the upper right abdomen or shoulder</li>
        <li>Sudden swelling in your face or hands</li>
        <li>Sudden weight gain (more than 2 pounds in a week)</li>
        <li>Difficulty breathing or shortness of breath</li>
      </ul>
      
      <h3>Risk Factors</h3>
      <p>You may be at higher risk if you:</p>
      <ul>
        <li>Are pregnant for the first time</li>
        <li>Have a history of high blood pressure</li>
        <li>Are over 40 or under 18</li>
        <li>Are carrying multiples</li>
        <li>Have diabetes, lupus, or kidney disease</li>
        <li>Had preeclampsia in a previous pregnancy</li>
      </ul>
      
      <h3>Prevention</h3>
      <p>While not all cases can be prevented, attending all prenatal appointments allows for early detection and treatment.</p>
    `,
    completed: false,
    quizQuestions: [
      {
        question: "Which symptom is NOT typically associated with preeclampsia?",
        options: ["Severe headaches", "Vision changes", "Fever and chills", "Sudden swelling in hands and face"],
        correctAnswer: 2,
      },
      {
        question: "When does preeclampsia typically develop?",
        options: ["Before 12 weeks", "Between 12-20 weeks", "After 20 weeks", "Only during labor"],
        correctAnswer: 2,
      },
    ],
    urgency: "critical",
  },
]

export default function EducationalModules() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [completedModules, setCompletedModules] = useState<number[]>([])

  const currentModule = modules[currentModuleIndex]

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1)
      setShowQuiz(false)
      setQuizAnswers([])
      setQuizSubmitted(false)
    }
  }

  const handleNext = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1)
      setShowQuiz(false)
      setQuizAnswers([])
      setQuizSubmitted(false)
    }
  }

  const startQuiz = () => {
    setShowQuiz(true)
    setQuizAnswers(new Array(currentModule.quizQuestions.length).fill(-1))
    setQuizSubmitted(false)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (quizSubmitted) return

    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const submitQuiz = () => {
    setQuizSubmitted(true)

    // Check if all answers are correct
    const allCorrect = currentModule.quizQuestions.every((q, index) => quizAnswers[index] === q.correctAnswer)

    if (allCorrect && !completedModules.includes(currentModule.id)) {
      setCompletedModules([...completedModules, currentModule.id])
    }
  }

  const getCompletionPercentage = () => {
    return (completedModules.length / modules.length) * 100
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "important":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Weekly Educational Modules</h1>
          <p className="text-muted-foreground">
            Learn essential information about your pregnancy and baby's development
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Progress value={getCompletionPercentage()} className="h-2 flex-1" />
            <span className="text-sm font-medium">
              {completedModules.length}/{modules.length} completed
            </span>
          </div>
        </div>

        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modules">Weekly Modules</TabsTrigger>
            <TabsTrigger value="library">Module Library</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <Badge variant="outline" className={`${getUrgencyColor(currentModule.urgency)} mb-2`}>
                      {currentModule.urgency === "critical" ? (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" /> Critical Knowledge
                        </>
                      ) : currentModule.urgency === "important" ? (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" /> Important
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-3 w-3 mr-1" /> Recommended
                        </>
                      )}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{currentModule.week}</span>
                      {completedModules.includes(currentModule.id) && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" /> Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentModuleIndex === 0}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentModuleIndex === modules.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle>{currentModule.title}</CardTitle>
                <CardDescription>{currentModule.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {!showQuiz ? (
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentModule.content }} />
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Knowledge Check</h3>
                    {currentModule.quizQuestions.map((question, qIndex) => (
                      <div key={qIndex} className="space-y-3">
                        <p className="font-medium">{question.question}</p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-3 rounded-md border cursor-pointer transition-colors ${
                                quizAnswers[qIndex] === oIndex
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              } ${
                                quizSubmitted && oIndex === question.correctAnswer
                                  ? "border-green-500 bg-green-50"
                                  : quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.correctAnswer
                                    ? "border-red-500 bg-red-50"
                                    : ""
                              }`}
                              onClick={() => handleAnswerSelect(qIndex, oIndex)}
                            >
                              {option}
                              {quizSubmitted && oIndex === question.correctAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-500 inline ml-2" />
                              )}
                            </div>
                          ))}
                        </div>
                        {quizSubmitted && quizAnswers[qIndex] !== question.correctAnswer && (
                          <p className="text-sm text-red-500">
                            The correct answer is: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                {!showQuiz ? (
                  <Button onClick={startQuiz}>Take Knowledge Check</Button>
                ) : !quizSubmitted ? (
                  <Button onClick={submitQuiz} disabled={quizAnswers.some((a) => a === -1)}>
                    Submit Answers
                  </Button>
                ) : (
                  <div className="w-full">
                    {currentModule.quizQuestions.every((q, index) => quizAnswers[index] === q.correctAnswer) ? (
                      <div className="flex flex-col gap-3 items-center">
                        <div className="flex items-center gap-2 text-green-600">
                          <Award className="h-5 w-5" />
                          <span className="font-medium">Great job! You've completed this module.</span>
                        </div>
                        <Button onClick={() => setShowQuiz(false)}>Return to Module</Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 items-center">
                        <p className="text-amber-600">Review the incorrect answers and try again.</p>
                        <Button
                          onClick={() => {
                            setQuizSubmitted(false)
                            setQuizAnswers(new Array(currentModule.quizQuestions.length).fill(-1))
                          }}
                        >
                          Retry Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="library" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {modules.map((module, index) => (
                <Card key={module.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className={`${getUrgencyColor(module.urgency)} mb-1`}>
                          {module.urgency === "critical" ? (
                            <>
                              <AlertTriangle className="h-3 w-3 mr-1" /> Critical
                            </>
                          ) : module.urgency === "important" ? (
                            <>
                              <AlertTriangle className="h-3 w-3 mr-1" /> Important
                            </>
                          ) : (
                            <>
                              <BookOpen className="h-3 w-3 mr-1" /> Recommended
                            </>
                          )}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{module.week}</span>
                        </div>
                      </div>
                      {completedModules.includes(module.id) && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" /> Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base">{module.title}</CardTitle>
                    <CardDescription className="text-xs">{module.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setCurrentModuleIndex(index)}>
                      View Module
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

