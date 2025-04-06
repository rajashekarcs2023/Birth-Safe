"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  ArrowRight,
  Heart,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Activity,
  MapPin,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  // For testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const testimonials = [
    {
      quote:
        "BirthSafe helped me identify that I was missing a critical scan for my high-risk pregnancy. When I brought it up with my doctor, they scheduled it right away. I might have missed it otherwise.",
      name: "Jessica M.",
      role: "First-time mom",
      initials: "JM",
      color: "pink",
    },
    {
      quote:
        "As a birth advocate, I recommend BirthSafe to all my clients. It gives them the confidence to ask questions and ensures they receive the care they deserve.",
      name: "Tanya W.",
      role: "Doula",
      initials: "TW",
      color: "blue",
    },
    {
      quote:
        "The documentation features helped me create a clear record of my birth preferences and the discussions I had with my healthcare team. It made me feel so much more in control.",
      name: "Sarah K.",
      role: "Mother of two",
      initials: "SK",
      color: "purple",
    },
    {
      quote:
        "When I had concerns about my care plan, BirthSafe gave me the exact language I needed to advocate for myself. It was like having an expert in my pocket.",
      name: "Michael J.",
      role: "Partner & birth support",
      initials: "MJ",
      color: "green",
    },
  ]

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      {/* Header/Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-md p-1.5">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-xl text-blue-600">Birth</span>
              <span className="font-bold text-xl text-purple-600">Safe</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-slate-600 hover:text-slate-900">
              About Us
            </Link>
            <Link href="#features" className="text-slate-600 hover:text-slate-900">
              Features
            </Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-slate-900">
              Testimonials
            </Link>
            <Link href="#blog" className="text-slate-600 hover:text-slate-900">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Empowering Safer Births</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Your advocate for safer maternity care</h1>
          <p className="text-xl text-slate-600 mb-8">
            BirthSafe helps you track, document, and advocate for your care during pregnancy and birth. Take control of
            your journey with our comprehensive safety tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/feed">Demo Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* Impact Goals Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h3 className="text-xl font-semibold text-center mb-6">Contributing to UN Sustainable Development Goals</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-blue-100 rounded-full p-3 mx-auto w-fit mb-3">
                <span className="font-bold text-blue-600 text-lg">3.1</span>
              </div>
              <p className="text-slate-600">Reduce maternal mortality</p>
            </div>
            <div>
              <div className="bg-purple-100 rounded-full p-3 mx-auto w-fit mb-3">
                <span className="font-bold text-purple-600 text-lg">3.2</span>
              </div>
              <p className="text-slate-600">End preventable deaths of newborns</p>
            </div>
            <div>
              <div className="bg-green-100 rounded-full p-3 mx-auto w-fit mb-3">
                <span className="font-bold text-green-600 text-lg">5.6</span>
              </div>
              <p className="text-slate-600">Universal access to reproductive healthcare</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600 mb-2">300,000+</p>
              <p className="text-slate-600">Women die annually from preventable pregnancy complications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600 mb-2">2.4 million</p>
              <p className="text-slate-600">Newborn deaths occur in the first month of life</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 mb-2">80%</p>
              <p className="text-slate-600">Of maternal deaths are preventable with proper care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">How BirthSafe Works</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          Our comprehensive platform provides the tools you need to ensure you receive the best possible care throughout
          your pregnancy journey.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 rounded-full p-4 mx-auto w-fit mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Monitor Your Care</h3>
            <p className="text-slate-600">
              Track your care against clinical guidelines and get alerts when something's missing or delayed.
            </p>
            <ul className="mt-4 text-left text-sm text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Personalized risk monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Real-time safety alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Care gap identification</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-purple-100 rounded-full p-4 mx-auto w-fit mb-4">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Document Everything</h3>
            <p className="text-slate-600">
              Create verified records of your appointments and interactions that can't be altered.
            </p>
            <ul className="mt-4 text-left text-sm text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Tamper-proof medical records</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Voice and text documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Consent tracking system</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-green-100 rounded-full p-4 mx-auto w-fit mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Advocate Effectively</h3>
            <p className="text-slate-600">
              Get the right words and tools to speak up when it matters most for you and your baby.
            </p>
            <ul className="mt-4 text-left text-sm text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Advocacy phrase suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Partner/family ally mode</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Emergency escalation pathways</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="bg-red-100 rounded-full p-2 mt-1">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Symptom Tracker</h3>
              <p className="text-sm text-slate-600">
                Monitor and report concerning symptoms with guidance on when to seek help.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Kick Counter</h3>
              <p className="text-sm text-slate-600">Track your baby's movements and get alerts if patterns change.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 rounded-full p-2 mt-1">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Consent Log</h3>
              <p className="text-sm text-slate-600">Document when your consent rights aren't respected during care.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="bg-green-100 rounded-full p-2 mt-1">
              <UserPlus className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Ally Mode</h3>
              <p className="text-sm text-slate-600">Empower partners and family members to advocate on your behalf.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="bg-amber-100 rounded-full p-2 mt-1">
              <MapPin className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Nearest Facility</h3>
              <p className="text-sm text-slate-600">Find emergency obstetric care near you when you need it most.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="bg-pink-100 rounded-full p-2 mt-1">
              <BookOpen className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Reflection Journal</h3>
              <p className="text-sm text-slate-600">
                Document your journey in your own words with voice and text entries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">About BirthSafe</h2>
          <p className="text-center text-slate-600 mb-8">
            BirthSafe was developed by Rajashekar Vennavelli and Thomas Caneday at DiamondHacks 2025, UC San Diego, as
            an innovative solution to address critical challenges in maternal healthcare technology. The project was
            conceived with a singular focus on enhancing patient-centered safety through accessible, empowering digital
            tools.
          </p>
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Our Mission</h3>
            <p className="text-slate-600 mb-4">
              We are on a mission to eliminate preventable harm in maternity care by putting the power of advocacy,
              documentation, and informed decision-making directly into the hands of pregnant women, mothers, and all
              birthing people.
            </p>
            <p className="text-slate-600 mb-4">
              Through technology grounded in clinical standards and empathy, BirthSafe helps patients identify gaps in
              care, raise red flags in real time, and protect themselves and their babies — no matter where or how they
              give birth.
            </p>
            <p className="text-slate-600">
              We envision a world where no one must navigate pregnancy or childbirth without access to safety, support,
              and clear information.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-blue-100 rounded-full p-3 mx-auto w-fit mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Safety First</h4>
              <p className="text-sm text-slate-600">
                We prioritize evidence-based care and clinical safety in everything we do.
              </p>
            </div>
            <div>
              <div className="bg-purple-100 rounded-full p-3 mx-auto w-fit mb-3">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Compassionate Care</h4>
              <p className="text-sm text-slate-600">
                We believe in the emotional wellbeing of parents throughout their journey.
              </p>
            </div>
            <div>
              <div className="bg-green-100 rounded-full p-3 mx-auto w-fit mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Community Powered</h4>
              <p className="text-sm text-slate-600">
                We learn from the experiences of our users to improve maternity care for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">What Users Say</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Hear from parents, birth workers, and healthcare providers who use BirthSafe.
          </p>

          <div className="relative overflow-hidden">
            <div className="flex justify-center">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <p className="text-slate-600 mb-6 text-lg italic">"{testimonials[activeTestimonial].quote}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`bg-${testimonials[activeTestimonial].color}-100 rounded-full h-12 w-12 flex items-center justify-center`}
                    >
                      <span className={`font-medium text-${testimonials[activeTestimonial].color}-600`}>
                        {testimonials[activeTestimonial].initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonials[activeTestimonial].name}</p>
                      <p className="text-sm text-slate-500">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full mx-1 transition-all ${
                    index === activeTestimonial ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Latest from Our Blog</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          Expert insights, user stories, and the latest in maternal health.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="h-48 bg-slate-200"></div>
            <div className="p-6">
              <Badge className="mb-2">Advocacy</Badge>
              <h3 className="font-semibold text-lg mb-2">How to Speak Up When It Matters Most</h3>
              <p className="text-slate-600 text-sm mb-4">
                Learn effective communication strategies for discussing concerns with your healthcare providers.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">April 2, 2025</span>
                <Button variant="link" className="p-0 h-auto">
                  Read More
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="h-48 bg-slate-200"></div>
            <div className="p-6">
              <Badge className="mb-2">Research</Badge>
              <h3 className="font-semibold text-lg mb-2">Understanding High-Risk Pregnancy Monitoring</h3>
              <p className="text-slate-600 text-sm mb-4">
                A comprehensive guide to the tests and scans recommended for various high-risk conditions.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">March 28, 2025</span>
                <Button variant="link" className="p-0 h-auto">
                  Read More
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="h-48 bg-slate-200"></div>
            <div className="p-6">
              <Badge className="mb-2">User Story</Badge>
              <h3 className="font-semibold text-lg mb-2">How BirthSafe Helped Me Navigate a Difficult Pregnancy</h3>
              <p className="text-slate-600 text-sm mb-4">
                Sarah shares her journey using BirthSafe to manage her high-risk pregnancy with placenta previa.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">March 15, 2025</span>
                <Button variant="link" className="p-0 h-auto">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline">View All Articles</Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4 mx-auto w-fit mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to take control of your maternity care?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of parents using BirthSafe to ensure safer pregnancies and births.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/signup">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/feed">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-md p-1">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-lg text-blue-600">Birth</span>
                  <span className="font-bold text-lg text-purple-600">Safe</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Your advocate for safer maternity care throughout pregnancy and birth.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-slate-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="#features" className="hover:text-slate-900">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Symptom Tracker
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Kick Counter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Consent Log
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Ally Mode
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="#blog" className="hover:text-slate-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-slate-900">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Stay Updated</h4>
              <p className="text-sm text-slate-600 mb-4">
                Subscribe to our newsletter for the latest updates and resources.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border border-slate-300 rounded-md text-sm w-full"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} BirthSafe. All rights reserved.</p>
            <p className="mt-2">Developed at DiamondHacks 2025, UC San Diego.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

