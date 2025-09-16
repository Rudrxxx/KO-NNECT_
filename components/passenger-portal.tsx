"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Ticket,
  Map,
  CreditCard,
  Phone,
  AlertCircle,
  Star,
  Navigation,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface PassengerPortalProps {
  onBack: () => void
}

type PassengerView = "journey" | "tickets" | "map"

export default function PassengerPortal({ onBack }: PassengerPortalProps) {
  const [currentView, setCurrentView] = useState<PassengerView>("journey")
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const stations = [
    "Aluva",
    "Pulinchodu",
    "Companypady",
    "Ambattukavu",
    "Muttom",
    "Kalamassery",
    "Cusat",
    "Pathadipalam",
    "Edapally",
    "Changampuzha Park",
    "Palarivattom",
    "JLN Stadium",
    "Kaloor",
    "Town Hall",
    "MG Road",
    "Maharajas",
    "Ernakulam South",
    "Kadavanthra",
    "Elamkulam",
    "Vyttila",
    "Thaikoodam",
    "Pettah",
  ]

  const recentTrips = [
    { from: "Aluva", to: "MG Road", date: "Yesterday" },
    { from: "Pettah", to: "Kalamassery", date: "3 days ago" },
    { from: "MG Road", to: "Aluva", date: "1 week ago" },
  ]

  const mockResults = [
    {
      departure: "08:15",
      arrival: "09:02",
      duration: "47 min",
      price: 40,
      stops: 12,
    },
    {
      departure: "08:30",
      arrival: "09:17",
      duration: "47 min",
      price: 40,
      stops: 12,
    },
    {
      departure: "08:45",
      arrival: "09:32",
      duration: "47 min",
      price: 40,
      stops: 12,
    },
  ]

  const handleFindTrains = () => {
    if (fromStation && toStation && fromStation !== toStation) {
      setShowResults(true)
    } else {
      alert("Please select different stations for departure and arrival.")
    }
  }

  const navItems = [
    { id: "journey", label: "Plan Journey", icon: Search },
    { id: "tickets", label: "My Tickets", icon: Ticket },
    { id: "map", label: "Live Map", icon: Map },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold text-card-foreground">KO-NECT Passenger</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-t border-border">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                className="flex-1 rounded-none border-r border-border last:border-r-0"
                onClick={() => setCurrentView(item.id as PassengerView)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-4xl mx-auto">
        {/* Plan Journey View */}
        {currentView === "journey" && (
          <div className="space-y-6">
            {/* Journey Planning Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Plan Your Journey
                </CardTitle>
                <CardDescription>Find the best route for your trip</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <Select value={fromStation} onValueChange={setFromStation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select departure station" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((station) => (
                          <SelectItem key={station} value={station}>
                            {station}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <Select value={toStation} onValueChange={setToStation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination station" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((station) => (
                          <SelectItem key={station} value={station}>
                            {station}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleFindTrains} className="w-full" size="lg">
                  <Search className="h-4 w-4 mr-2" />
                  Find Trains
                </Button>
              </CardContent>
            </Card>

            {/* Search Results */}
            {showResults && (
              <Card>
                <CardHeader>
                  <CardTitle>Available Trains</CardTitle>
                  <CardDescription>
                    {fromStation} → {toStation}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="font-bold text-lg">{result.departure}</p>
                            <p className="text-xs text-muted-foreground">Departure</p>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div className="w-8 h-px bg-border"></div>
                            <ArrowRight className="h-3 w-3" />
                            <div className="w-8 h-px bg-border"></div>
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-lg">{result.arrival}</p>
                            <p className="text-xs text-muted-foreground">Arrival</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{result.duration}</p>
                            <p className="text-xs text-muted-foreground">{result.stops} stops</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{result.price}</p>
                          <Button size="sm" className="mt-1">
                            <CreditCard className="h-3 w-3 mr-1" />
                            Book Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Trips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  Recent Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrips.map((trip, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => {
                        setFromStation(trip.from)
                        setToStation(trip.to)
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {trip.from} → {trip.to}
                          </p>
                          <p className="text-sm text-muted-foreground">{trip.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Tickets View */}
        {currentView === "tickets" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Tickets</CardTitle>
                <CardDescription>Your current and past bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No tickets found</p>
                  <p className="text-sm text-muted-foreground mt-1">Book your first journey to see tickets here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Live Map View */}
        {currentView === "map" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Train Map</CardTitle>
                <CardDescription>Real-time train locations and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive map coming soon</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track trains in real-time across the Kochi Metro network
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                    <p className="font-medium text-green-800">All Lines</p>
                    <p className="text-sm text-green-600">Normal Service</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-blue-800">Average Delay</p>
                    <p className="text-sm text-blue-600">2 minutes</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Star className="h-4 w-4 text-purple-600 mx-auto mb-2" />
                    <p className="font-medium text-purple-800">Service Rating</p>
                    <p className="text-sm text-purple-600">4.8/5.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* SOS Button - Fixed position */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
      >
        <AlertCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
