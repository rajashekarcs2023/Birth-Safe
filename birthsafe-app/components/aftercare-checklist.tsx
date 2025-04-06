"use client"

import { useState } from "react"
import { CheckCircle, Info, AlertTriangle, FileCheck, Download, Printer, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AftercareChecklist() {
  const [completedItems, setCompletedItems] = useState<string[]>([])

  const handleCheckItem = (id: string) => {
    setCompletedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const calculateProgress = (category: string) => {
    const categoryItems = checklistItems.filter((item) => item.category === category)
    const completedCategoryItems = categoryItems.filter((item) => completedItems.includes(item.id))
    return (completedCategoryItems.length / categoryItems.length) * 100
  }

  const checklistItems = [
    {
      id: "physical-1",
      category: "physical",
      title: "Postpartum bleeding assessment",
      description: "Regular checks of bleeding amount and character",
      importance: "critical",
    },
    {
      id: "physical-2",
      category: "physical",
      title: "Pain management",
      description: "Appropriate pain relief options discussed and provided",
      importance: "high",
    },
    {
      id: "physical-3",
      category: "physical",
      title: "Perineal care",
      description: "Instructions for caring for stitches or tears",
      importance: "high",
    },
    {
      id: "physical-4",
      category: "physical",
      title: "Breast examination",
      description: "Assessment for engorgement, mastitis, or other concerns",
      importance: "medium",
    },
    {
      id: "physical-5",
      category: "physical",
      title: "Blood pressure monitoring",
      description: "Regular checks to detect postpartum hypertension",
      importance: "critical",
    },
    {
      id: "emotional-1",
      category: "emotional",
      title: "Postpartum depression screening",
      description: "Assessment using standardized screening tools",
      importance: "high",
    },
    {
      id: "emotional-2",
      category: "emotional",
      title: "Sleep support",
      description: "Strategies for managing sleep disruption",
      importance: "medium",
    },
    {
      id: "emotional-3",
      category: "emotional",
      title: "Birth experience discussion",
      description: "Opportunity to discuss and process birth experience",
      importance: "medium",
    },
    {
      id: "emotional-4",
      category: "emotional",
      title: "Mental health resources",
      description: "Information on available support services",
      importance: "high",
    },
    {
      id: "rights-1",
      category: "rights",
      title: "Informed consent for all procedures",
      description: "Clear explanation and consent obtained for all care",
      importance: "critical",
    },
    {
      id: "rights-2",
      category: "rights",
      title: "Privacy during examinations",
      description: "Appropriate measures taken to ensure privacy",
      importance: "high",
    },
    {
      id: "rights-3",
      category: "rights",
      title: "Access to medical records",
      description: "Information on how to access your records",
      importance: "medium",
    },
    {
      id: "rights-4",
      category: "rights",
      title: "Complaint procedure explanation",
      description: "Clear information on how to raise concerns",
      importance: "medium",
    },
    {
      id: "education-1",
      category: "education",
      title: "Newborn care instructions",
      description: "Guidance on feeding, bathing, and basic care",
      importance: "high",
    },
    {
      id: "education-2",
      category: "education",
      title: "Warning signs to watch for",
      description: "Clear information on when to seek medical help",
      importance: "critical",
    },
    {
      id: "education-3",
      category: "education",
      title: "Follow-up appointment schedule",
      description: "Clear plan for postpartum check-ups",
      importance: "high",
    },
    {
      id: "education-4",
      category: "education",
      title: "Breastfeeding support",
      description: "Resources and guidance for breastfeeding",
      importance: "high",
    },
  ]

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "critical":
        return <Badge className="bg-red-100 text-red-700">Critical</Badge>
      case "high":
        return <Badge className="bg-amber-100 text-amber-700">Important</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
    }
  }

  const overallProgress = (completedItems.length / checklistItems.length) * 100

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Rights-Based Aftercare Checklist</h1>
        <p className="text-sm text-slate-500 mt-1">Ensure you receive complete postpartum care</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-800">Your Aftercare Progress</CardTitle>
            <CardDescription>Track the care you've received after birth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2.5" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Physical Care</span>
                    <span className="text-xs">{Math.round(calculateProgress("physical"))}%</span>
                  </div>
                  <Progress value={calculateProgress("physical")} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Emotional Support</span>
                    <span className="text-xs">{Math.round(calculateProgress("emotional"))}%</span>
                  </div>
                  <Progress value={calculateProgress("emotional")} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Rights & Dignity</span>
                    <span className="text-xs">{Math.round(calculateProgress("rights"))}%</span>
                  </div>
                  <Progress value={calculateProgress("rights")} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Education & Resources</span>
                    <span className="text-xs">{Math.round(calculateProgress("education"))}%</span>
                  </div>
                  <Progress value={calculateProgress("education")} className="h-1.5" />
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <div className="flex gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Why this matters</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Complete postpartum care is essential for your recovery and wellbeing. This checklist helps ensure
                      you receive all recommended aspects of care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Printer className="h-4 w-4" />
              Print Checklist
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              Share with Provider
            </Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="physical" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="emotional">Emotional</TabsTrigger>
            <TabsTrigger value="rights">Rights</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {["physical", "emotional", "rights", "education"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-medium text-lg mb-4 capitalize">{category} Care</h3>
                <div className="space-y-4">
                  {checklistItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0">
                        <Checkbox
                          id={item.id}
                          checked={completedItems.includes(item.id)}
                          onCheckedChange={() => handleCheckItem(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={item.id} className="font-medium cursor-pointer">
                              {item.title}
                            </Label>
                            {getImportanceBadge(item.importance)}
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {category === "physical" && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-amber-800">Warning Signs</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          Contact your healthcare provider immediately if you experience heavy bleeding, severe
                          headaches, difficulty breathing, fever, or severe pain.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {category === "emotional" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Emotional Wellbeing Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Postpartum Support International Helpline: 1-800-944-4773</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>National Suicide Prevention Lifeline: 988 or 1-800-273-8255</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Text "HOME" to 741741 to reach the Crisis Text Line</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Rights in Postpartum Care</CardTitle>
            <CardDescription>Understanding what care you should receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <FileCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-medium">Right to dignity and respect:</span> You have the right to be treated with
                dignity and respect during all aspects of your postpartum care.
              </p>
            </div>
            <Separator />
            <div className="flex items-start gap-2">
              <FileCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-medium">Right to information:</span> You have the right to clear, complete
                information about your health and all available care options.
              </p>
            </div>
            <Separator />
            <div className="flex items-start gap-2">
              <FileCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-medium">Right to informed consent:</span> No procedure should be performed without
                your understanding and permission.
              </p>
            </div>
            <Separator />
            <div className="flex items-start gap-2">
              <FileCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-medium">Right to privacy:</span> Your physical privacy and confidentiality of your
                medical information should be protected.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download Full Rights Guide
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

