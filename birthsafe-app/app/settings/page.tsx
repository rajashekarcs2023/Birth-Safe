"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const [volume, setVolume] = useState(80)
  const [speed, setSpeed] = useState(50)
  const [voice, setVoice] = useState("female")

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="language">
        <TabsList className="mb-4">
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>
                Choose your preferred language. Currently, only the Safety Dashboard supports multiple languages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <RadioGroup
                    value={language}
                    onValueChange={(value) => setLanguage(value as "en" | "fr")}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="en" />
                      <Label htmlFor="en" className="font-medium">
                        English
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fr" id="fr" />
                      <Label htmlFor="fr" className="font-medium">
                        Français
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                  <p className="text-sm text-amber-800">
                    Note: Currently, only the Safety Dashboard is available in multiple languages. We're working on
                    translating the entire application.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio">
          <Card>
            <CardHeader>
              <CardTitle>Audio Settings</CardTitle>
              <CardDescription>Customize how audio explanations are delivered throughout the app.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="volume"
                      value={[volume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setVolume(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{volume}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speed">Speaking Rate</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="speed"
                      value={[speed]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setSpeed(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{speed}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Voice</Label>
                  <RadioGroup value={voice} onValueChange={setVoice} className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-4">
                  <Button className="mr-2">Test Audio</Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-800">
                    Audio explanations are available for critical safety information and educational content. Enable
                    them to make the app more accessible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

