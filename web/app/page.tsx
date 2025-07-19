"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function QubitLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waitlistForm, setWaitlistForm] = useState({ name: "", email: "" })
  const [demoForm, setDemoForm] = useState({ name: "", age: "", email: "", portfolio: "" })
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false)
  const [showDemoSuccess, setShowDemoSuccess] = useState(false)
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false)
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false)
  const [waitlistError, setWaitlistError] = useState<string | null>(null)
  const [demoError, setDemoError] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingWaitlist(true)
    setWaitlistError(null)
    
    try {
      const response = await fetch('http://localhost:8081/add_wait_list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: waitlistForm.name,
          email: waitlistForm.email
        }),
      })
      
      const data = await response.json()
      
      if (data.res === "sucsess") {
        setShowWaitlistSuccess(true)
        setWaitlistForm({ name: "", email: "" })
      } else {
        setWaitlistError(data.res || 'Failed to join waitlist. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting waitlist form:', error)
      setWaitlistError('Network error. Please try again later.')
    } finally {
      setIsSubmittingWaitlist(false)
    }
  }

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingDemo(true)
    setDemoError(null)
    
    try {
      console.log('Submitting demo form with data:', {
        name: demoForm.name,
        email: demoForm.email,
        age: parseInt(demoForm.age, 10),
        profile_link: demoForm.portfolio
      })
      
      const response = await fetch('http://localhost:8081/add_bata_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: demoForm.name,
          email: demoForm.email,
          age: parseInt(demoForm.age, 10),
          profile_link: demoForm.portfolio
        }),
      })
      
      console.log('Demo form response status:', response.status)
      const data = await response.json()
      console.log('Demo form response data:', data)
      
      if (data.res === "sucsess") {
        console.log('Demo form submission successful')
        setShowDemoSuccess(true)
        setDemoForm({ name: "", age: "", email: "", portfolio: "" })
      } else {
        console.log('Demo form submission failed:', data.res)
        setDemoError(data.res || 'Failed to submit application. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting demo form:', error)
      setDemoError('Network error. Please try again later.')
    } finally {
      setIsSubmittingDemo(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Exact Background Gradient Match */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(88, 28, 135, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.6) 0%, transparent 50%),
            linear-gradient(135deg, 
              #0f172a 0%, 
              #1e293b 15%, 
              #334155 30%, 
              #4c1d95 60%, 
              #6b21a8 80%, 
              #7c3aed 100%
            )
          `,
        }}
      />

      {/* Navigation - Back to Original Style */}
      <nav className="relative z-50">
        <div className="flex justify-between items-center px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/images/qubit-logo.png" alt="Qubit Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-white text-xl font-semibold">Qubit</span>
          </div>

          <div
            className="hidden md:flex items-center space-x-8 px-8 py-3 rounded-full backdrop-blur-md"
            style={{
              background: "rgba(30, 41, 59, 0.4)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
            }}
          >
            <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Home
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#blog" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Blog
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              FAQ
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              About Us
            </a>
          </div>

          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:text-white bg-transparent text-sm font-medium px-6 rounded-full"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section - Exact Layout */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 3D Floating Elements - Exact Positioning */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left 3D Laptop - Exact Position and Style */}
          <div
            className="absolute animate-float"
            style={{
              left: "60px",
              top: "280px",
              transform: `translate3d(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px, 0)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              className="relative"
              style={{
                transform: "rotateX(15deg) rotateY(-25deg) rotateZ(-5deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Laptop Body */}
              <div className="relative w-48 h-32" style={{ transformStyle: "preserve-3d" }}>
                {/* Screen */}
                <div
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
                    transform: "translateZ(4px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)",
                  }}
                >
                  {/* Screen Display */}
                  <div
                    className="w-full h-20 rounded-t-xl m-1 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                      border: "1px solid #64748b",
                    }}
                  >
                    {/* Screen Content */}
                    <div
                      className="absolute inset-1 rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                      }}
                    >
                      {/* Webcam */}
                      <div
                        className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "radial-gradient(circle, #374151 0%, #1f2937 100%)",
                        }}
                      />
                      {/* Screen Reflection */}
                      <div
                        className="absolute inset-0 rounded-lg opacity-20"
                        style={{
                          background:
                            "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Keyboard Area */}
                  <div className="h-12 p-2 flex items-center justify-center">
                    <div
                      className="w-12 h-6 rounded-md"
                      style={{
                        background: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                </div>

                {/* Laptop Base/Bottom */}
                <div
                  className="absolute w-full h-4 bottom-0 rounded-b-xl"
                  style={{
                    background: "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)",
                    transform: "rotateX(-90deg) translateZ(4px)",
                    transformOrigin: "bottom",
                  }}
                />

                {/* Right Side */}
                <div
                  className="absolute w-4 h-32 right-0 rounded-r-xl"
                  style={{
                    background: "linear-gradient(90deg, #94a3b8 0%, #64748b 100%)",
                    transform: "rotateY(90deg) translateZ(4px)",
                    transformOrigin: "right",
                  }}
                />
              </div>

              {/* Laptop Shadow */}
              <div
                className="absolute -bottom-2 left-2 right-2 h-4 rounded-full opacity-40"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                  transform: "rotateX(90deg) translateZ(-10px)",
                }}
              />
            </div>
          </div>

          {/* Right 3D Video Interface Stack - Exact Position */}
          <div
            className="absolute animate-float-delayed"
            style={{
              right: "60px",
              top: "240px",
              transform: `translate3d(${-mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px, 0)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              className="relative"
              style={{
                transform: "rotateX(10deg) rotateY(15deg) rotateZ(8deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Main Interface Panel */}
              <div className="relative w-64 h-40" style={{ transformStyle: "preserve-3d" }}>
                <div
                  className="absolute inset-0 rounded-2xl p-3"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    transform: "translateZ(8px)",
                    boxShadow: "0 12px 24px rgba(139, 92, 246, 0.4), inset 0 1px 2px rgba(255,255,255,0.2)",
                  }}
                >
                  {/* Interface Header */}
                  <div className="text-xs text-white/90 font-bold mb-2 tracking-wider">VIDEO TIMELINE</div>

                  {/* Timeline Tracks */}
                  <div className="space-y-1.5 mb-3">
                    {[0.85, 0.65, 0.75].map((width, i) => (
                      <div
                        key={i}
                        className="relative h-3 rounded-md"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-md"
                          style={{
                            background: `linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) ${width * 100}%, transparent ${width * 100}%)`,
                            transform: "translateZ(1px)",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Control Buttons */}
                  <div className="flex space-x-2">
                    {[0.3, 0.4, 0.2, 0.5].map((opacity, i) => (
                      <div
                        key={i}
                        className="w-8 h-5 rounded-md"
                        style={{
                          background: `rgba(255,255,255,${opacity})`,
                          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.1)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Panel Sides */}
                <div
                  className="absolute w-8 h-40 right-0 rounded-r-2xl"
                  style={{
                    background: "linear-gradient(90deg, #7c3aed 0%, #be185d 100%)",
                    transform: "rotateY(90deg) translateZ(8px)",
                    transformOrigin: "right",
                  }}
                />
              </div>

              {/* Secondary Panel */}
              <div
                className="absolute -top-4 -right-6 w-24 h-16 rounded-xl"
                style={{
                  transform: "rotateZ(12deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl p-2"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                    transform: "translateZ(6px)",
                    boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <div className="text-xs text-white/80 mb-1 font-semibold">EFFECTS</div>
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-2 rounded-sm"
                        style={{
                          background: `rgba(255,255,255,${0.2 + i * 0.1})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Glass Container for Headline */}
        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
          {/* Coming Soon Badge - Back to Original */}
          <div
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white mb-16"
            style={{
              background: "rgba(139, 92, 246, 0.8)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span>Coming Soon</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>

          {/* Glass Container for Main Headline */}
          <div
            className="relative mx-auto mb-12 p-12"
            style={{
              background: "rgba(30, 41, 59, 0.15)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              maxWidth: "900px",
            }}
          >
            {/* Main Headline Inside Glass Container */}
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                className="font-extrabold"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                10x
              </span>
              <span className="text-white"> your post production and</span>
              <br />
              <span className="text-white">video editing process with </span>
              <span
                className="font-extrabold"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Qubit
              </span>
            </h1>
          </div>

          {/* Subtitle - Outside Glass Container */}
          <p
            className="text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
            style={{ fontSize: "1.25rem", fontWeight: "300" }}
          >
            Revolutionary AI-powered video editing platform launching soon. Be the first to
            <br />
            experience the future of post-production.
          </p>

          {/* CTA Buttons - Back to Original Style */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="px-8 py-4 text-base font-semibold rounded-full border-0 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  Join Waitlist
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700 text-white rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Join the Waitlist</DialogTitle>
                </DialogHeader>
                {showWaitlistSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p>{"You're on the list! We'll notify you when Qubit launches."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={waitlistForm.name}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={waitlistForm.email}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                      />
                    </div>
                    {demoError {waitlistError && ({waitlistError && ( (
                      <div className="flex items-center text-red-400 text-sm mb-2">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{waitlistError}</span>
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl"
                      disabled={isSubmittingWaitlist}
                    >
                      {isSubmittingWaitlist ? 'Submitting...' : 'Join Waitlist'}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-base font-semibold rounded-full bg-transparent transition-all duration-300"
                  style={{
                    border: "2px solid rgba(148, 163, 184, 0.3)",
                    color: "#cbd5e1",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Become Demo User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700 text-white max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Become a Demo User</DialogTitle>
                </DialogHeader>
                {showDemoSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p>{"Application submitted! We'll review and contact you soon."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="demo-name">Name</Label>
                      <Input
                        id="demo-name"
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-age">Age</Label>
                      <Input
                        id="demo-age"
                        type="number"
                        value={demoForm.age}
                        onChange={(e) => setDemoForm({ ...demoForm, age: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-email">Email</Label>
                      <Input
                        id="demo-email"
                        type="email"
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-portfolio">Portfolio URL</Label>
                      <Input
                        id="demo-portfolio"
                        type="url"
                        value={demoForm.portfolio}
                        onChange={(e) => setDemoForm({ ...demoForm, portfolio: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                    {demoError && (
                      <div className="flex items-center text-red-400 text-sm mb-2">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{demoError}</span>
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl"
                      disabled={isSubmittingDemo}
                    >
                      {isSubmittingDemo ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  )
}
