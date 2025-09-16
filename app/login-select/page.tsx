"use client"

import { Button } from "@/components/ui/button"
import { Shield, User, Users, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginSelectPage() {
  const router = useRouter()

  const handleDashboardSelect = (dashboardType: string) => {
    router.push(`/?dashboard=${dashboardType}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with back button */}
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Select your dashboard</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">Explore personalized control panels</p>
        </div>

        {/* Selection cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
          {/* Administrator Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Administrator</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Comprehensive System Management & Analytics</p>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold"
                onClick={() => handleDashboardSelect("admin")}
              >
                System Control Panel
              </Button>
            </div>
          </div>

          {/* Employee Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Employee</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Route Optimization & Trip Assignments</p>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold"
                onClick={() => handleDashboardSelect("employee")}
              >
                View Driving Dashboard
              </Button>
            </div>
          </div>

          {/* Passenger Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Passenger</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Seamless Trip Booking & Journey Tracking</p>
              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold"
                onClick={() => handleDashboardSelect("passenger")}
              >
                Plan New Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
