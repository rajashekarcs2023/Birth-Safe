"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function DecisionSupportPage() {
  const [activeTab, setActiveTab] = useState("birth-options")
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [currentDetail, setCurrentDetail] = useState({ title: "", content: "" })
  const [showConsentDialog, setShowConsentDialog] = useState(false)
  const { toast } = useToast()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      toast({
        title: "Searching for term",
        description: `Showing results for "${searchTerm}"`,
      })
    }
  }

  const showDetails = (title: string, content: string) => {
    setCurrentDetail({ title, content })
    setShowDetailDialog(true)
  }

  const documentConsent = () => {
    setShowConsentDialog(false)
    toast({
      title: "Consent Documented",
      description: "Your informed consent has been recorded.",
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Decision Support</h2>
        <Button
          onClick={() => {
            toast({
              title: "Preferences Saved",
              description: "Your decision preferences have been saved.",
            })
          }}
        >
          Save Preferences
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="birth-options">Birth Options</TabsTrigger>
          <TabsTrigger value="medical-terms">Medical Translator</TabsTrigger>
          <TabsTrigger value="consent">Informed Consent</TabsTrigger>
        </TabsList>

        <TabsContent value="birth-options" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Birth Setting Options</CardTitle>
              <CardDescription>Compare different birth settings and their features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Hospital Birth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Full medical facilities available</li>
                      <li>✓ NICU access if needed</li>
                      <li>✓ Pain medication options</li>
                      <li>✗ Less homely environment</li>
                      <li>✗ Higher intervention rates</li>
                    </ul>
                    <Button
                      className="mt-4 w-full"
                      onClick={() =>
                        showDetails(
                          "Hospital Birth",
                          "Hospital births take place in a medical facility with doctors, nurses, and medical equipment. They offer the highest level of medical intervention if needed, including emergency C-sections, pain medication like epidurals, and immediate access to a NICU. However, they typically have higher rates of interventions like inductions and C-sections, and the clinical environment may feel less comfortable than other options.",
                        )
                      }
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Birth Center</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Homelike environment</li>
                      <li>✓ Lower intervention rates</li>
                      <li>✓ Midwifery-led care</li>
                      <li>✗ Limited pain medication</li>
                      <li>✗ Transfer needed for complications</li>
                    </ul>
                    <Button
                      className="mt-4 w-full"
                      onClick={() =>
                        showDetails(
                          "Birth Center",
                          "Birth centers offer a middle ground between home and hospital births. They provide a homelike environment with midwifery-led care and typically have lower intervention rates. Most birth centers have birthing tubs, comfortable furniture, and freedom of movement during labor. However, they offer limited pain medication options (usually no epidurals) and require transfer to a hospital if serious complications arise.",
                        )
                      }
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Home Birth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Familiar environment</li>
                      <li>✓ Lowest intervention rates</li>
                      <li>✓ Personalized care</li>
                      <li>✗ No pain medication</li>
                      <li>✗ Emergency services not immediate</li>
                    </ul>
                    <Button
                      className="mt-4 w-full"
                      onClick={() =>
                        showDetails(
                          "Home Birth",
                          "Home births allow you to labor and deliver in the comfort of your own home with the assistance of a midwife or other qualified birth attendant. They offer the most personalized care, the lowest intervention rates, and the comfort of familiar surroundings. However, pain medication is not available, and emergency medical services are not immediately on hand if complications arise, requiring transfer to a hospital.",
                        )
                      }
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pain Management Options</CardTitle>
              <CardDescription>Compare different pain management techniques during labor</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Epidural</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        An epidural is a procedure that injects a local anesthetic into the space around your spinal
                        nerves in your lower back.
                      </p>
                      <p className="font-medium">Benefits:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Provides effective pain relief</li>
                        <li>You remain alert and awake</li>
                        <li>Can be adjusted as needed</li>
                      </ul>
                      <p className="font-medium">Considerations:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>May limit mobility during labor</li>
                        <li>Can slow labor progress in some cases</li>
                        <li>May cause a temporary drop in blood pressure</li>
                      </ul>
                      <Button
                        className="mt-2"
                        onClick={() => {
                          toast({
                            title: "Added to Birth Plan",
                            description: "Epidural preferences added to your birth plan.",
                          })
                        }}
                      >
                        Add to Birth Plan
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Nitrous Oxide</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        Nitrous oxide (laughing gas) is a gas you inhale through a mask that can help reduce pain
                        perception.
                      </p>
                      <p className="font-medium">Benefits:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Self-administered and controlled</li>
                        <li>Takes effect quickly and wears off quickly</li>
                        <li>Doesn't interfere with labor progress</li>
                      </ul>
                      <p className="font-medium">Considerations:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Provides less pain relief than epidural</li>
                        <li>May cause nausea or dizziness</li>
                        <li>Not available in all hospitals</li>
                      </ul>
                      <Button
                        className="mt-2"
                        onClick={() => {
                          toast({
                            title: "Added to Birth Plan",
                            description: "Nitrous oxide preferences added to your birth plan.",
                          })
                        }}
                      >
                        Add to Birth Plan
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Non-Pharmacological Methods</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>These include techniques like breathing, hydrotherapy, massage, and position changes.</p>
                      <p className="font-medium">Benefits:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>No medication side effects</li>
                        <li>Can be used in any birth setting</li>
                        <li>Promotes active participation in labor</li>
                      </ul>
                      <p className="font-medium">Considerations:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>May not provide enough relief for severe pain</li>
                        <li>Requires preparation and practice</li>
                        <li>Support person needed for some techniques</li>
                      </ul>
                      <Button
                        className="mt-2"
                        onClick={() => {
                          toast({
                            title: "Added to Birth Plan",
                            description: "Non-pharmacological method preferences added to your birth plan.",
                          })
                        }}
                      >
                        Add to Birth Plan
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Terminology Translator</CardTitle>
              <CardDescription>Understand complex medical terms in plain language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="search-terms" className="text-sm font-medium">
                    Search for a medical term
                  </label>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      id="search-terms"
                      placeholder="e.g., preeclampsia, gestational diabetes"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex h-10 w-full"
                    />
                    <Button type="submit">Search</Button>
                  </form>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Preeclampsia</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A condition that causes high blood pressure during pregnancy and can affect the mother's kidneys,
                      liver, and brain. If not treated, it can lead to serious complications for both mother and baby.
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Signs to watch for:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                        <li>High blood pressure</li>
                        <li>Protein in urine</li>
                        <li>Swelling in face or hands</li>
                        <li>Severe headaches</li>
                        <li>Vision changes</li>
                      </ul>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Saved to My Terms",
                          description: "Preeclampsia has been saved to your personal glossary.",
                        })
                      }}
                    >
                      Save to My Terms
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Gestational Diabetes</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A type of diabetes that develops during pregnancy. It causes high blood sugar that can affect your
                      pregnancy and your baby's health.
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Management includes:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                        <li>Monitoring blood sugar levels</li>
                        <li>Healthy eating</li>
                        <li>Regular physical activity</li>
                        <li>Medication if needed</li>
                      </ul>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Saved to My Terms",
                          description: "Gestational Diabetes has been saved to your personal glossary.",
                        })
                      }}
                    >
                      Save to My Terms
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informed Consent Documentation</CardTitle>
              <CardDescription>Record and verify your understanding of procedures and interventions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Upcoming Procedures</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <p className="text-sm font-medium">Glucose Tolerance Test</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        A test to check for gestational diabetes by measuring how your body processes sugar.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            showDetails(
                              "Glucose Tolerance Test",
                              "This test screens for gestational diabetes. You'll drink a sweet liquid, then have your blood drawn one hour later to measure your blood sugar level. If your result is higher than normal, you may need a longer test. The test helps identify if you need special care to manage blood sugar during pregnancy.",
                            )
                          }
                        >
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => setShowConsentDialog(true)}>
                          Document Consent
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Group B Strep Test</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        A test to check for bacteria that can be passed to your baby during birth.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            showDetails(
                              "Group B Strep Test",
                              "This test checks for Group B Streptococcus bacteria that can be present in the vagina or rectum. A swab is taken from these areas around 36-37 weeks of pregnancy. If positive, you'll receive antibiotics during labor to prevent passing the bacteria to your baby, which could cause serious infection.",
                            )
                          }
                        >
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => setShowConsentDialog(true)}>
                          Document Consent
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Consent History</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <p className="text-sm font-medium">Ultrasound Scan</p>
                      <p className="text-sm text-muted-foreground mt-1">Consent documented on April 15, 2023</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          showDetails(
                            "Ultrasound Consent Documentation",
                            "You provided informed consent for an ultrasound scan on April 15, 2023. The consent covered the purpose of the scan, the procedure details, and potential findings. You acknowledged understanding that ultrasound is generally safe with no known risks to you or your baby.",
                          )
                        }
                      >
                        View Documentation
                      </Button>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Blood Tests</p>
                      <p className="text-sm text-muted-foreground mt-1">Consent documented on March 10, 2023</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          showDetails(
                            "Blood Tests Consent Documentation",
                            "You provided informed consent for routine prenatal blood tests on March 10, 2023. The consent covered tests for blood type, Rh factor, anemia, infections, and genetic screening. You acknowledged understanding the purpose of each test and how the results would be used in your care.",
                          )
                        }
                      >
                        View Documentation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDetail.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{currentDetail.content}</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowDetailDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Document Informed Consent</DialogTitle>
            <DialogDescription>
              Please review the information and confirm your understanding and consent.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">I understand:</Label>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent-1" />
                  <Label htmlFor="consent-1" className="text-sm">
                    The purpose of this procedure and why it is recommended for me
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent-2" />
                  <Label htmlFor="consent-2" className="text-sm">
                    The risks, benefits, and alternatives to this procedure
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent-3" />
                  <Label htmlFor="consent-3" className="text-sm">
                    What to expect during and after the procedure
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent-4" />
                  <Label htmlFor="consent-4" className="text-sm">
                    I have had the opportunity to ask questions and they have been answered to my satisfaction
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="consent-notes">Additional notes or questions:</Label>
              <textarea
                id="consent-notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter any questions or concerns here..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowConsentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={documentConsent}>Document Consent</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

