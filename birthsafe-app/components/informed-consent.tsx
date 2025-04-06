"use client"

import { useState } from "react"
import { Info, AlertTriangle, FileCheck, Lock, Download, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function InformedConsent() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-800">Informed Consent: Hospital Birth</CardTitle>
        <CardDescription>Document your understanding and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Why informed consent matters</p>
              <p className="text-xs text-blue-700 mt-1">
                Documenting your informed consent ensures your preferences are respected and creates a record of the
                information you received.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">I understand that:</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Checkbox id="consent-1" className="mt-1" />
              <Label htmlFor="consent-1" className="text-sm">
                A hospital birth is recommended due to my placenta position, which increases risks of bleeding
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="consent-2" className="mt-1" />
              <Label htmlFor="consent-2" className="text-sm">
                Emergency interventions may be necessary and I've been informed of their risks and benefits
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="consent-3" className="mt-1" />
              <Label htmlFor="consent-3" className="text-sm">
                I can still create preferences for my birth while acknowledging medical needs
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">My preferences include:</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Checkbox id="pref-1" className="mt-1" />
              <Label htmlFor="pref-1" className="text-sm">
                Having my partner present at all times
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="pref-2" className="mt-1" />
              <Label htmlFor="pref-2" className="text-sm">
                Being informed before any intervention
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="pref-3" className="mt-1" />
              <Label htmlFor="pref-3" className="text-sm">
                Delayed cord clamping if safely possible
              </Label>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800 font-medium">Important note</p>
              <p className="text-xs text-amber-700 mt-1">
                You can withdraw or modify your consent at any time. This document is not a binding contract but a
                record of your informed decision.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full gap-2" onClick={() => setDialogOpen(true)}>
          <Lock className="h-4 w-4" />
          Create Verified Consent Record
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <ExternalLink className="h-4 w-4" />
          Learn More About Consent
        </Button>
      </CardFooter>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Consent Record Created</DialogTitle>
            <DialogDescription>Your informed consent has been documented</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex gap-2">
                <FileCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-800 font-medium">Verification Status: Complete</p>
                  <p className="text-xs text-green-700 mt-1">
                    Your consent record has been timestamped and securely stored
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">What happens next:</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">1.</div>
                  <p className="text-sm">This record will be added to your birth plan</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">2.</div>
                  <p className="text-sm">You can share it with your healthcare providers</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">3.</div>
                  <p className="text-sm">You can update your preferences at any time</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" className="bg-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Download Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

