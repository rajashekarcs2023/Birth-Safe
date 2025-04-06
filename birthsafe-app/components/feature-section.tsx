import { ShieldCheck, FileText, MessageSquare, Users, Heart } from "lucide-react"

export function FeatureSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Maternal Care</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              BirthSafe combines AI-powered risk assessment, decision support, and secure record-keeping to improve
              maternal and neonatal outcomes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Risk Monitoring</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Personalized risk profiles based on your medical history and test results, with alerts when monitoring is
              insufficient.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Decision Support</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Plain-language explanations of medical terms and interactive decision aids for birth choices with balanced
              risk information.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Record-Keeping</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Secure voice/text journaling of all provider interactions and a timeline of your pregnancy journey, tests,
              and discussions.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Community Patterns</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Optional, anonymous sharing of safety concerns and aggregation of similar experiences to identify
              patterns.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Emotional Support</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Regular mental health check-ins and specialized support resources for birth trauma and loss.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">HIPAA Compliant</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Secure, encrypted storage of all your medical data with strict privacy controls and audit trails.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

