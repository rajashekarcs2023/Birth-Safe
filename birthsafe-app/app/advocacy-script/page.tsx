"use client"

import { AdvocacyScriptGenerator } from "@/components/advocacy-script-generator"

export default function AdvocacyScriptPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Medical Advocacy Script Generator</h1>
        <p className="text-slate-600 mt-1">
          Create personalized scripts to effectively communicate with your healthcare providers
        </p>
      </div>

      <AdvocacyScriptGenerator />
    </div>
  )
}

