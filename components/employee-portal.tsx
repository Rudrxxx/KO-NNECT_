"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, User, AlertTriangle, Upload, FileText, Award, LogOut } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface EmployeePortalProps {
  onBack: () => void
}

export default function EmployeePortal({ onBack }: EmployeePortalProps) {
  const [selectedTrainId, setSelectedTrainId] = useState("")
  const [faultCategory, setFaultCategory] = useState("")
  const [faultDescription, setFaultDescription] = useState("")
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const mockSchedule = [
    {
      date: "Monday, 14th Oct",
      time: "06:00 - 14:00",
      route: "ALV-PTA",
      status: "upcoming",
    },
    {
      date: "Tuesday, 15th Oct",
      time: "14:00 - 22:00",
      route: "PTA-ALV",
      status: "upcoming",
    },
    {
      date: "Wednesday, 16th Oct",
      time: "06:00 - 14:00",
      route: "ALV-PTA",
      status: "upcoming",
    },
    {
      date: "Thursday, 17th Oct",
      time: "22:00 - 06:00",
      route: "PTA-ALV",
      status: "upcoming",
    },
    {
      date: "Friday, 18th Oct",
      time: "14:00 - 22:00",
      route: "ALV-PTA",
      status: "upcoming",
    },
  ]

  const trainIds = ["KM-001", "KM-002", "KM-003", "KM-004", "KM-005", "KM-006", "KM-007"]
  const faultCategories = ["Electrical", "Mechanical", "Interior", "Safety", "Communication"]

  const handleSubmitFault = () => {
    if (selectedTrainId && faultCategory && faultDescription) {
      alert("Fault report submitted successfully!")
      setSelectedTrainId("")
      setFaultCategory("")
      setFaultDescription("")
    } else {
      alert("Please fill in all required fields.")
    }
  }

  const handleFileUpload = () => {
    // Simulate file upload dialog
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = () => {
      if (input.files && input.files[0]) {
        alert(`File "${input.files[0].name}" selected for upload.`)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Employee Portal</h1>
              <p className="text-muted-foreground">Welcome, Priya!</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wider */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Schedule Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  My Schedule
                </CardTitle>
                <CardDescription>Your upcoming shifts for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchedule.map((shift, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{shift.date}</p>
                          <p className="text-sm text-muted-foreground">{shift.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {shift.route}
                        </div>
                        <Badge variant="secondary">Scheduled</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report a Fault Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Report a Fault
                </CardTitle>
                <CardDescription>Submit maintenance issues or safety concerns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="train-id">Train ID *</Label>
                    <Select value={selectedTrainId} onValueChange={setSelectedTrainId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select train ID" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainIds.map((id) => (
                          <SelectItem key={id} value={id}>
                            {id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fault-category">Fault Category *</Label>
                    <Select value={faultCategory} onValueChange={setFaultCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {faultCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the fault or issue in detail..."
                    value={faultDescription}
                    onChange={(e) => setFaultDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleFileUpload}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">Optional: Add photos to support your report</p>
                </div>

                <Button onClick={handleSubmitFault} className="w-full md:w-auto">
                  Submit Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Narrower */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-secondary" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold">Priya Nair</h3>
                  <p className="text-sm text-muted-foreground">Employee ID: EMP-2024-156</p>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Role:</span>
                    <span className="text-sm font-medium">Loco Pilot</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Department:</span>
                    <span className="text-sm font-medium">Operations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Years of Service:</span>
                    <span className="text-sm font-medium">8 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">License:</span>
                    <Badge variant="outline" className="text-xs">
                      Valid
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                  <Calendar className="h-4 w-4 mr-2" />
                  Apply for Leave
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                  <Award className="h-4 w-4 mr-2" />
                  View Service Record
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                  <FileText className="h-4 w-4 mr-2" />
                  Training Certificates
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Additional features coming soon</p>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Shift Completed</p>
                      <p className="text-muted-foreground text-xs">Yesterday, 22:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Training Updated</p>
                      <p className="text-muted-foreground text-xs">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Fault Reported</p>
                      <p className="text-muted-foreground text-xs">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
