"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Lightbulb, Users, Briefcase, Train } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import EmployeePortal from "@/components/employee-portal"
import PassengerPortal from "@/components/passenger-portal"

type DashboardType = "landing" | "admin" | "employee" | "passenger"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<DashboardType>("landing")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const dashboard = searchParams.get("dashboard")
    if (dashboard && ["admin", "employee", "passenger"].includes(dashboard)) {
      setCurrentView(dashboard as DashboardType)
    }
  }, [searchParams])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (currentView === "admin") {
    return <AdminDashboard onBack={() => setCurrentView("landing")} />
  }

  if (currentView === "employee") {
    return <EmployeePortal onBack={() => setCurrentView("landing")} />
  }

  if (currentView === "passenger") {
    return <PassengerPortal onBack={() => setCurrentView("landing")} />
  }

  return (
    <div className="min-h-screen bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => {
                setCurrentView("landing")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Train className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xl font-bold transition-colors ${isScrolled ? "text-blue-600" : "text-white"}`}>
                KO-NNECT
              </span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              <button
                className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                <Lightbulb className="h-4 w-4 text-orange-500" />
                Solutions
              </button>
              <button
                className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                <Users className="h-4 w-4 text-teal-500" />
                About Us
              </button>
              <button
                className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                <Briefcase className="h-4 w-4 text-purple-500" />
                Careers
              </button>
            </div>

            <Button
              variant="outline"
              className={`transition-all ${
                isScrolled
                  ? "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50"
                  : "bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700/80 backdrop-blur-sm shadow-lg"
              }`}
              onClick={() => router.push("/login-select")}
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center text-center bg-slate-900 pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url('/image/hero-background.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/50 to-orange-900/40" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl">KO-NNECT</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 font-medium drop-shadow-lg">
            AI-Powered Urban Flow for Kochi Metro
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-xl border-2 border-blue-400"
            onClick={() => router.push("/login-select")}
          >
            Experience the Future with Us
          </Button>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Intelligent Transportation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming urban mobility through AI-driven scheduling and real-time optimization for Kochi Metro
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Scheduling</h3>
              <p className="text-gray-600">
                Advanced algorithms optimize train schedules in real-time based on passenger flow and demand patterns
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fleet Analytics</h3>
              <p className="text-gray-600">
                Comprehensive monitoring of all metro operations with predictive maintenance and performance insights
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passenger Systems</h3>
              <p className="text-gray-600">
                Real-time information, journey planning, and seamless connectivity across the entire network
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
