"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Play,
  Users,
  Cloud,
  Sparkles,
  Download,
  FileText,
  Clock,
  Palette,
  UserCheck,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
} from "lucide-react"

export default function QubitLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waitlistForm, setWaitlistForm] = useState({ name: "", email: "" })
  const [demoForm, setDemoForm] = useState({ name: "", age: "", email: "", portfolio: "" })
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false)
  const [showDemoSuccess, setShowDemoSuccess] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowWaitlistSuccess(true)
    setWaitlistForm({ name: "", email: "" })
  }

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowDemoSuccess(true)
    setDemoForm({ name: "", age: "", email: "", portfolio: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold">Qubit</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About Us
              </a>
            </div>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background with exact gradient match */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>

        {/* 3D Floating Elements - Proper Isometric 3D with Steel Metallic Look */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Floating 3D Laptop - Isometric with Steel Finish */}
          <div
            className="absolute left-8 top-1/2 transform -translate-y-1/2 animate-float"
            style={{
              transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              className="relative"
              style={{ transform: "rotateX(60deg) rotateY(-45deg)", transformStyle: "preserve-3d" }}
            >
              {/* Laptop Base - 3D with multiple faces */}
              <div className="relative w-64 h-40" style={{ transformStyle: "preserve-3d" }}>
                {/* Top Face - Screen and Keyboard */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)",
                    transform: "translateZ(8px)",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.3)",
                  }}
                >
                  {/* Screen Area */}
                  <div
                    className="w-full h-24 rounded-t-2xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
                      border: "2px solid #64748b",
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Screen Bezel */}
                    <div
                      className="absolute inset-1 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Webcam */}
                      <div
                        className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                        style={{
                          background: "radial-gradient(circle, #374151 0%, #1f2937 100%)",
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Keyboard Area */}
                  <div className="h-16 p-2">
                    {/* Trackpad */}
                    <div
                      className="w-16 h-10 mx-auto mt-2 rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(255,255,255,0.1)",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Front Face */}
                <div
                  className="absolute w-full h-8 bottom-0 rounded-b-2xl"
                  style={{
                    background: "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 50%, #64748b 100%)",
                    transform: "rotateX(-90deg) translateZ(8px)",
                    transformOrigin: "bottom",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                ></div>

                {/* Right Face */}
                <div
                  className="absolute w-8 h-40 right-0 rounded-r-2xl"
                  style={{
                    background: "linear-gradient(90deg, #94a3b8 0%, #64748b 50%, #475569 100%)",
                    transform: "rotateY(90deg) translateZ(8px)",
                    transformOrigin: "right",
                  }}
                ></div>
              </div>

              {/* 3D Shadow */}
              <div
                className="absolute -bottom-4 left-4 right-4 h-8 rounded-full opacity-30"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                  transform: "rotateX(90deg) translateZ(-20px)",
                }}
              ></div>
            </div>
          </div>

          {/* Right Floating 3D Video Interface Stack */}
          <div
            className="absolute right-8 top-1/3 animate-float-delayed"
            style={{
              transform: `translate3d(${-mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px, 0)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              className="relative"
              style={{ transform: "rotateX(45deg) rotateY(30deg)", transformStyle: "preserve-3d" }}
            >
              {/* Main 3D Interface Panel */}
              <div className="relative w-80 h-48" style={{ transformStyle: "preserve-3d" }}>
                {/* Top Face */}
                <div
                  className="absolute inset-0 rounded-2xl p-4"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                    transform: "translateZ(12px)",
                    boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Interface Elements */}
                  <div className="text-xs text-white/90 font-bold mb-3 tracking-wider">VIDEO TIMELINE</div>

                  {/* 3D Timeline Tracks */}
                  <div className="space-y-2 mb-4">
                    {[0.8, 0.6, 0.7].map((width, i) => (
                      <div
                        key={i}
                        className="relative h-4 rounded-lg"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Track Content */}
                        <div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) ${width * 100}%, transparent ${width * 100}%)`,
                            transform: "translateZ(2px)",
                          }}
                        ></div>

                        {/* Track Side */}
                        <div
                          className="absolute right-0 w-2 h-full rounded-r-lg"
                          style={{
                            background: "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                            transform: "rotateY(90deg) translateZ(2px)",
                            transformOrigin: "right",
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* 3D Control Buttons */}
                  <div className="flex space-x-3">
                    {[0.3, 0.4, 0.2, 0.5].map((opacity, i) => (
                      <div
                        key={i}
                        className="relative w-12 h-8 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${opacity * 0.5}) 100%)`,
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.2)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Button Top */}
                        <div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, rgba(255,255,255,${opacity + 0.1}) 0%, rgba(255,255,255,${opacity}) 100%)`,
                            transform: "translateZ(2px)",
                          }}
                        ></div>

                        {/* Button Side */}
                        <div
                          className="absolute right-0 w-2 h-full rounded-r-lg"
                          style={{
                            background: `linear-gradient(90deg, rgba(255,255,255,${opacity * 0.7}) 0%, rgba(255,255,255,${opacity * 0.4}) 100%)`,
                            transform: "rotateY(90deg) translateZ(2px)",
                            transformOrigin: "right",
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Front Face */}
                <div
                  className="absolute w-full h-12 bottom-0 rounded-b-2xl"
                  style={{
                    background: "linear-gradient(180deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
                    transform: "rotateX(-90deg) translateZ(12px)",
                    transformOrigin: "bottom",
                  }}
                ></div>

                {/* Right Face */}
                <div
                  className="absolute w-12 h-48 right-0 rounded-r-2xl"
                  style={{
                    background: "linear-gradient(90deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
                    transform: "rotateY(90deg) translateZ(12px)",
                    transformOrigin: "right",
                  }}
                ></div>
              </div>

              {/* Secondary 3D Panel */}
              <div
                className="absolute -top-6 -right-8 w-32 h-24 rounded-xl"
                style={{
                  transform: "rotateZ(15deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Panel Top */}
                <div
                  className="absolute inset-0 rounded-xl p-2"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                    transform: "translateZ(8px)",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)",
                  }}
                >
                  <div className="text-xs text-white/80 mb-1 font-semibold">EFFECTS</div>
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-3 rounded"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,${0.2 + i * 0.05}) 0%, rgba(255,255,255,${0.1 + i * 0.03}) 100%)`,
                          transform: "translateZ(1px)",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Panel Sides */}
                <div
                  className="absolute w-8 h-24 right-0 rounded-r-xl"
                  style={{
                    background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                    transform: "rotateY(90deg) translateZ(8px)",
                    transformOrigin: "right",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* 3D Geometric Steel Objects */}
          <div className="absolute top-24 right-1/4 animate-spin-slow">
            <div
              className="relative w-16 h-16"
              style={{ transform: "rotateX(45deg) rotateY(45deg)", transformStyle: "preserve-3d" }}
            >
              {/* Steel Cube Faces */}
              {[
                { transform: "translateZ(8px)", bg: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)" },
                {
                  transform: "rotateY(90deg) translateZ(8px)",
                  bg: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
                },
                {
                  transform: "rotateX(90deg) translateZ(8px)",
                  bg: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
                },
                { transform: "translateZ(-8px)", bg: "linear-gradient(135deg, #64748b 0%, #475569 100%)" },
                {
                  transform: "rotateY(-90deg) translateZ(8px)",
                  bg: "linear-gradient(135deg, #475569 0%, #334155 100%)",
                },
                {
                  transform: "rotateX(-90deg) translateZ(8px)",
                  bg: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
                },
              ].map((face, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-16 rounded-lg opacity-60"
                  style={{
                    background: face.bg,
                    transform: face.transform,
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.2)",
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-32 left-1/4 animate-bounce-slow">
            <div
              className="relative w-12 h-12"
              style={{ transform: "rotateX(30deg) rotateY(30deg)", transformStyle: "preserve-3d" }}
            >
              {/* Steel Sphere with metallic segments */}
              <div
                className="w-12 h-12 rounded-full opacity-50"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #f1f5f9 0%, #e2e8f0 30%, #cbd5e1 60%, #94a3b8 100%)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content - Centered and spaced to avoid 3D objects */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Coming Soon Badge - Exact match */}
          <div className="inline-flex items-center px-6 py-3 bg-purple-600/80 backdrop-blur-md border border-purple-500/30 rounded-full text-sm text-white mb-12 shadow-lg">
            <span className="font-medium">Coming Soon</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>

          {/* Main Headline - Exact typography and spacing */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent font-extrabold">
              10x
            </span>{" "}
            <span className="text-white">your post production and</span>
            <br />
            <span className="text-white">video editing process with </span>
            <span
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300 cursor-pointer"
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"
              }}
            >
              Qubit
            </span>
          </h1>

          {/* Subtitle - Exact spacing and typography */}
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Revolutionary AI-powered video editing platform launching soon. Be the first to
            <br />
            experience the future of post-production.
          </p>

          {/* CTA Buttons - Exact styling from reference */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                  style={{
                    boxShadow: "0 20px 40px -12px rgba(147, 51, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  Join Waitlist
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700 text-white rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Join the Waitlist</DialogTitle>
                </DialogHeader>
                {showWaitlistSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg">{"You're on the list! We'll notify you when Qubit launches."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="waitlist-name">Name</Label>
                      <Input
                        id="waitlist-name"
                        value={waitlistForm.name}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waitlist-email">Email</Label>
                      <Input
                        id="waitlist-email"
                        type="email"
                        value={waitlistForm.email}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-600 rounded-xl"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl">
                      Join Waitlist
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
                  className="border-2 border-slate-500/50 text-slate-200 hover:bg-slate-800/50 hover:border-slate-400 px-10 py-4 text-lg font-semibold rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
                >
                  Become Demo User
                </Button>
              </DialogTrigger>
              <a href="https://discord.com/channels/1394706171738456184/1394706172488974377" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-500/50 text-slate-200 hover:bg-slate-800/50 hover:border-slate-400 px-10 py-4 text-lg font-semibold rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
                >
                  Join Discord
                </Button>
              </a>
              <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700 text-white max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Become a Demo User</DialogTitle>
                </DialogHeader>
                {showDemoSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg">{"Application submitted! We'll review and contact you soon."}</p>
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
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl">
                      Submit Application
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Powerful Features, Simplified</h2>
            <p className="text-xl text-gray-600">Experience the future of video editing today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Play className="w-8 h-8 text-purple-600" />,
                title: "AI-Powered Editing",
                description: "Intelligent video editing with smart cuts, transitions, and automated scene detection.",
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Real-time Collaboration",
                description: "Edit together with your team in real-time, with live comments and instant sync.",
              },
              {
                icon: <Cloud className="w-8 h-8 text-purple-600" />,
                title: "Cloud Storage",
                description: "Unlimited cloud storage for all your projects with automatic backup and sync.",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-purple-600" />,
                title: "Advanced Effects",
                description: "Professional-grade effects library with motion graphics and color grading.",
              },
              {
                icon: <Download className="w-8 h-8 text-purple-600" />,
                title: "Export Optimization",
                description: "Smart export settings for any platform - social media, web, or cinema quality.",
              },
              {
                icon: <FileText className="w-8 h-8 text-purple-600" />,
                title: "Template Library",
                description: "Thousands of professional templates to jumpstart your creative projects.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Our Mission</h2>
            <p className="text-xl text-gray-600">Democratizing video editing through AI innovation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8 text-purple-600" />,
                title: "Intelligent Automation",
                description: "Let AI handle the heavy lifting while you focus on creativity",
                link: "Learn more",
              },
              {
                icon: <Palette className="w-8 h-8 text-purple-600" />,
                title: "Intuitive Design",
                description: "Professional-grade tools that feel as simple as using your favorite app",
                link: "Learn more",
              },
              {
                icon: <UserCheck className="w-8 h-8 text-purple-600" />,
                title: "Collaborative Power",
                description: "Seamless collaboration features built for modern creative teams",
                link: "Learn more",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center">
                  {item.link}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform
            <br />
            Your Video Editing?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Be among the first to experience the future of AI-powered video editing with Qubit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Join Waitlist
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Join the Waitlist</DialogTitle>
                </DialogHeader>
                {showWaitlistSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg">{"You're on the list! We'll notify you when Qubit launches."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="waitlist-name-2">Name</Label>
                      <Input
                        id="waitlist-name-2"
                        value={waitlistForm.name}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waitlist-email-2">Email</Label>
                      <Input
                        id="waitlist-email-2"
                        type="email"
                        value={waitlistForm.email}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-600"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                      Join Waitlist
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
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg rounded-2xl bg-transparent"
                >
                  Become Demo User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle>Become a Demo User</DialogTitle>
                </DialogHeader>
                {showDemoSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg">{"Application submitted! We'll review and contact you soon."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="demo-name-2">Name</Label>
                      <Input
                        id="demo-name-2"
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-age-2">Age</Label>
                      <Input
                        id="demo-age-2"
                        type="number"
                        value={demoForm.age}
                        onChange={(e) => setDemoForm({ ...demoForm, age: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-email-2">Email</Label>
                      <Input
                        id="demo-email-2"
                        type="email"
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-portfolio-2">Portfolio URL</Label>
                      <Input
                        id="demo-portfolio-2"
                        type="url"
                        value={demoForm.portfolio}
                        onChange={(e) => setDemoForm({ ...demoForm, portfolio: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-600"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                      Submit Application
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              No credit card required
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Early access available
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Team Behind{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Qubit</span>
            </h2>
            <p className="text-xl text-gray-400 mb-4">[Team story and background information will be shared here]</p>
            <p className="text-lg text-gray-500">[Mission statement and company values will be detailed here]</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-slate-700 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Max Scott</h3>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-slate-700 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Anant Dwivedi</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about Qubit</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "When will Qubit be available?",
                answer:
                  "Qubit is currently in private beta. We're planning a public launch in Q2 2024. Join our waitlist to be notified when we launch.",
              },
              {
                question: "How will I be notified of the launch?",
                answer:
                  "All waitlist members will receive an email notification 48 hours before our public launch, giving you early access to sign up.",
              },
              {
                question: "What are the benefits of waitlist vs demo access?",
                answer:
                  "Waitlist members get early access and special launch pricing. Demo users get to test the platform during beta and provide feedback that shapes the final product.",
              },
              {
                question: "What makes Qubit different from other video editors?",
                answer:
                  "Qubit uses advanced AI to automate complex editing tasks, offers real-time collaboration, and provides professional-grade tools with an intuitive interface.",
              },
              {
                question: "Will there be a free version?",
                answer:
                  "Yes, we're planning a free tier with basic features, plus premium plans for advanced functionality and team collaboration.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-slate-900">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <span className="text-xl font-bold">Qubit</span>
              </div>
              <p className="text-gray-400 mb-4">Built with ❤️ for creators</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Security & Trust</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  SOC 2 Compliant
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Enterprise Grade Security
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Qubit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
