"use client"

import { useState } from "react"
import { Heart, Users, FileText, Compass, Phone, Calendar, MessageCircle, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Types for our resources
interface Resource {
  id: string
  title: string
  description: string
  link?: string
  phone?: string
}

interface JournalPrompt {
  id: string
  prompt: string
  description: string
}

// Sample data
const lossResources: Resource[] = [
  {
    id: "miscarriage",
    title: "Miscarriage Support",
    description:
      "Resources specifically for those who have experienced miscarriage, including medical information and emotional support.",
    link: "#",
  },
  {
    id: "stillbirth",
    title: "Stillbirth Resources",
    description:
      "Support for families coping with stillbirth, including memorial ideas and connecting with others who understand.",
    link: "#",
  },
  {
    id: "infant-loss",
    title: "Infant Loss",
    description:
      "Resources for parents experiencing the loss of an infant, including grief counseling and support networks.",
    link: "#",
  },
  {
    id: "termination",
    title: "Pregnancy Termination Support",
    description: "Compassionate resources for those who have undergone pregnancy termination for any reason.",
    link: "#",
  },
  {
    id: "fertility",
    title: "Fertility Challenges",
    description: "Support for those facing fertility issues, secondary infertility, or recurrent loss.",
    link: "#",
  },
]

const supportGroups: Resource[] = [
  {
    id: "online-communities",
    title: "Online Communities",
    description: "Virtual support groups that meet regularly to share experiences and provide mutual support.",
    link: "#",
  },
  {
    id: "local-groups",
    title: "Local Support Groups",
    description: "In-person meetings in your area where you can connect with others on similar journeys.",
    link: "#",
  },
  {
    id: "peer-counseling",
    title: "Peer Counseling",
    description: "One-on-one support from trained volunteers who have experienced similar losses.",
    phone: "1-800-555-HELP",
  },
  {
    id: "partner-support",
    title: "Partner Support Resources",
    description: "Resources specifically for partners and how they can process grief while supporting each other.",
    link: "#",
  },
  {
    id: "family-support",
    title: "Family Support",
    description: "Resources for helping siblings, grandparents, and extended family understand and process loss.",
    link: "#",
  },
]

const journalPrompts: JournalPrompt[] = [
  {
    id: "memories",
    prompt: "What memories would you like to preserve?",
    description: "Write about the moments, however brief, that you want to remember and honor.",
  },
  {
    id: "feelings",
    prompt: "How are you feeling today?",
    description: "There's no right or wrong way to feel. Document your emotions without judgment.",
  },
  {
    id: "support",
    prompt: "What support do you need right now?",
    description: "Reflect on what would help you most in this moment, whether practical or emotional.",
  },
  {
    id: "letter",
    prompt: "Write a letter expressing your thoughts",
    description: "This could be to your baby, to yourself, to a healthcare provider, or to anyone else.",
  },
  {
    id: "coping",
    prompt: "What has helped you cope so far?",
    description: "Reflect on strategies or moments that have provided even small comfort.",
  },
]

const expertAdvice = [
  {
    id: "medical-followup",
    title: "Medical Follow-up",
    content: "Information about necessary medical appointments, physical recovery, and when to seek additional care.",
  },
  {
    id: "rights",
    title: "Your Rights and Options",
    content: "Understanding your rights regarding medical records, autopsy reports, and hospital procedures.",
  },
  {
    id: "decisions",
    title: "Making Difficult Decisions",
    content: "Guidance on navigating choices about memorials, disposition, and other sensitive matters.",
  },
  {
    id: "future-care",
    title: "Planning for Future Care",
    content: "Information about specialized care for future pregnancies and how to communicate your needs.",
  },
  {
    id: "mental-health",
    title: "Mental Health Resources",
    content:
      "When and how to seek professional mental health support, including therapy options specialized for grief and loss.",
  },
]

export function GriefHealingCenter() {
  const [journalEntry, setJournalEntry] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState<JournalPrompt | null>(null)

  const handlePromptSelect = (prompt: JournalPrompt) => {
    setSelectedPrompt(prompt)
    setJournalEntry(`${prompt.prompt}\n\n`)
  }

  const handleSaveEntry = () => {
    // In a real app, this would save to a database
    alert("Your journal entry has been saved.")
    setJournalEntry("")
    setSelectedPrompt(null)
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">Grief & Healing Resource Center</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          A compassionate space for support, resources, and guidance during your healing journey. Whatever your
          experience, you are not alone.
        </p>
      </div>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            <span>Loss Resources</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>Support Groups</span>
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-amber-500" />
            <span>Guided Journaling</span>
          </TabsTrigger>
          <TabsTrigger value="advice" className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-green-500" />
            <span>Expert Advice</span>
          </TabsTrigger>
        </TabsList>

        {/* Loss Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lossResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden border-l-4 border-l-pink-500">
                <CardHeader className="pb-2">
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    <span>Access Resources</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-pink-500" />
                <span>24/7 Support Hotlines</span>
              </CardTitle>
              <CardDescription>Immediate support is available whenever you need to talk.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-medium">Crisis Support Line</h3>
                <p className="text-sm text-gray-500 mb-2">For immediate emotional support</p>
                <p className="font-bold text-pink-600">1-800-555-HELP</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-medium">Pregnancy & Infant Loss Helpline</h3>
                <p className="text-sm text-gray-500 mb-2">Specialized support for loss</p>
                <p className="font-bold text-pink-600">1-888-123-4567</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Groups Tab */}
        <TabsContent value="support" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportGroups.map((group) => (
              <Card key={group.id} className="overflow-hidden border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle>{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  {group.link ? (
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>Connect</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>{group.phone}</span>
                      <Phone className="h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Upcoming Support Group Meetings</span>
              </CardTitle>
              <CardDescription>Join a virtual or in-person meeting to connect with others.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Virtual Support Circle</h3>
                  <p className="text-sm text-gray-500">Tuesday, April 9 • 7:00 PM</p>
                </div>
                <Button size="sm">Register</Button>
              </div>
              <div className="p-4 bg-white rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Partners' Support Group</h3>
                  <p className="text-sm text-gray-500">Thursday, April 11 • 6:30 PM</p>
                </div>
                <Button size="sm">Register</Button>
              </div>
              <div className="p-4 bg-white rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Healing Through Art</h3>
                  <p className="text-sm text-gray-500">Saturday, April 13 • 10:00 AM</p>
                </div>
                <Button size="sm">Register</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guided Journaling Tab */}
        <TabsContent value="journal" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Journal Prompts</CardTitle>
                <CardDescription>Select a prompt to help guide your reflection.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-2">
                    {journalPrompts.map((prompt) => (
                      <div
                        key={prompt.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedPrompt?.id === prompt.id
                            ? "bg-amber-100 border border-amber-300"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => handlePromptSelect(prompt)}
                      >
                        <h3 className="font-medium text-amber-700">{prompt.prompt}</h3>
                        <p className="text-sm text-gray-600">{prompt.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Journal</CardTitle>
                <CardDescription>
                  {selectedPrompt
                    ? selectedPrompt.description
                    : "Select a prompt or write freely. Your entries are private and secure."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="Begin writing here..."
                    className="min-h-[300px] p-4"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSaveEntry} disabled={!journalEntry.trim()}>
                      Save Entry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expert Advice Tab */}
        <TabsContent value="advice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-green-500" />
                <span>Navigating the Healthcare System After Loss</span>
              </CardTitle>
              <CardDescription>
                Expert guidance to help you understand your options and rights during this difficult time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {expertAdvice.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p>{item.content}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <Button variant="link" className="p-0 h-auto text-green-600">
                            Download information sheet
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>Speak to an expert</span>
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-green-50">
            <CardHeader>
              <CardTitle>Personalized Care Plan</CardTitle>
              <CardDescription>Get a customized plan for navigating your healthcare needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg">
                <p className="mb-4">
                  Our experts can help create a personalized care plan that addresses your specific needs, including
                  recommendations for follow-up care, mental health support, and resources for future pregnancies.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="concerns">What are your primary concerns right now?</Label>
                    <Textarea
                      id="concerns"
                      placeholder="Share any concerns or questions you have..."
                      className="mt-1"
                    />
                  </div>
                  <Button className="w-full sm:w-auto">Request Care Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

