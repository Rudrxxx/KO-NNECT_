"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  User,
  LayoutDashboard,
  Train,
  Calendar,
  Wrench,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Activity,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts"

interface AdminDashboardProps {
  onBack: () => void
}

type AdminView = "dashboard" | "fleet" | "schedule" | "maintenance" | "analytics" | "settings"

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard")
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "fleet", label: "Fleet Status", icon: Train },
    { id: "schedule", label: "AI Schedule", icon: Calendar },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const mockTrainData = [
    { id: "KM-001", startTime: "06:00", route: "ALV-PTA", status: "Departed", mileage: 142 },
    { id: "KM-002", startTime: "06:15", route: "PTA-ALV", status: "Scheduled", mileage: 138 },
    { id: "KM-003", startTime: "06:30", route: "ALV-PTA", status: "Departed", mileage: 145 },
    { id: "KM-004", startTime: "06:45", route: "PTA-ALV", status: "Scheduled", mileage: 140 },
    { id: "KM-005", startTime: "07:00", route: "ALV-PTA", status: "Scheduled", mileage: 139 },
  ]

  const mileageData = [
    { trainId: "KM-001", mileage: 142 },
    { trainId: "KM-002", mileage: 138 },
    { trainId: "KM-003", mileage: 145 },
    { trainId: "KM-004", mileage: 140 },
    { trainId: "KM-005", mileage: 139 },
    { trainId: "KM-006", mileage: 143 },
    { trainId: "KM-007", mileage: 136 },
    { trainId: "KM-008", mileage: 141 },
    { trainId: "KM-009", mileage: 144 },
    { trainId: "KM-010", mileage: 137 },
  ]

  const fleetStatusData = [
    { name: "In Service", value: 18, color: "#22c55e" },
    { name: "Maintenance", value: 2, color: "#f59e0b" },
    { name: "Cleaning", value: 3, color: "#3b82f6" },
    { name: "Standby", value: 2, color: "#6b7280" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold text-sidebar-foreground">KO-NNECT</h2>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentView(item.id as AdminView)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="flex items-center justify-between p-6">
            <h1 className="text-2xl font-bold text-card-foreground capitalize">
              {currentView === "dashboard" ? "Administrator Dashboard" : currentView}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {currentView === "dashboard" && (
          <div className="p-6 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fleet Availability</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">97%</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Punctuality</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">99.7%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance Savings</CardTitle>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">22%</div>
                  <p className="text-xs text-muted-foreground">Cost reduction</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23 / 25</div>
                  <p className="text-xs text-muted-foreground">2 in maintenance</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Train Mileage Distribution</CardTitle>
                  <CardDescription>Kilometers covered by each train today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mileageData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="trainId" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
                        <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="mileage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fleet Status</CardTitle>
                  <CardDescription>Current status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={fleetStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {fleetStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {fleetStatusData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI-Generated Schedule Table */}
            <Card>
              <CardHeader>
                <CardTitle>{"Today's AI-Generated Induction Plan"}</CardTitle>
                <CardDescription>Optimized train scheduling for maximum efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Train ID</th>
                        <th className="text-left p-2 font-medium">Start Time</th>
                        <th className="text-left p-2 font-medium">Route</th>
                        <th className="text-left p-2 font-medium">Status</th>
                        <th className="text-left p-2 font-medium">Mileage Today</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTrainData.map((train) => (
                        <tr key={train.id} className="border-b">
                          <td className="p-2 font-mono">{train.id}</td>
                          <td className="p-2">{train.startTime}</td>
                          <td className="p-2">{train.route}</td>
                          <td className="p-2">
                            <Badge variant={train.status === "Departed" ? "default" : "secondary"}>
                              {train.status}
                            </Badge>
                          </td>
                          <td className="p-2">{train.mileage} km</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other views placeholder */}
        {currentView !== "dashboard" && (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{currentView} View</CardTitle>
                <CardDescription>This section is under development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The {currentView} functionality will be implemented in the next phase.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
