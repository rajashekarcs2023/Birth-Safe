"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Hospital, Ambulance, Clock, Phone, Info, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Facility = {
  id: string
  name: string
  type: "hospital" | "birth-center" | "clinic"
  distance: number // in miles
  travelTime: number // in minutes
  address: string
  phone: string
  hasObEmergency: boolean
  hasNICU: boolean
}

export default function NearestFacility() {
  const [loading, setLoading] = useState(true)
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Simulate fetching user location and nearby facilities
  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })

          // Simulate API call to get nearby facilities
          setTimeout(() => {
            setFacilities([
              {
                id: "1",
                name: "Oxford University Hospital",
                type: "hospital",
                distance: 3.2,
                travelTime: 12,
                address: "Headley Way, Oxford OX3 9DU",
                phone: "+44 1865 741166",
                hasObEmergency: true,
                hasNICU: true,
              },
              {
                id: "2",
                name: "John Radcliffe Maternity",
                type: "hospital",
                distance: 3.5,
                travelTime: 14,
                address: "Headley Way, Oxford OX3 9DU",
                phone: "+44 1865 221718",
                hasObEmergency: true,
                hasNICU: true,
              },
              {
                id: "3",
                name: "Oxford Birth Center",
                type: "birth-center",
                distance: 4.8,
                travelTime: 18,
                address: "Roosevelt Dr, Oxford OX3 7XP",
                phone: "+44 1865 221642",
                hasObEmergency: false,
                hasNICU: false,
              },
              {
                id: "4",
                name: "Wallingford Community Hospital",
                type: "clinic",
                distance: 8.2,
                travelTime: 25,
                address: "Reading Rd, Wallingford OX10 9DU",
                phone: "+44 1865 904954",
                hasObEmergency: false,
                hasNICU: false,
              },
            ])
            setLoading(false)
          }, 1500)
        },
        (error) => {
          setLocationError("Unable to access your location. Please enable location services.")
          setLoading(false)
        },
      )
    } else {
      setLocationError("Geolocation is not supported by your browser.")
      setLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Nearest Maternity Facilities</h1>
        <p className="text-sm text-slate-500 mt-1">Find emergency obstetric care near you</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Why this matters</p>
              <p className="text-xs text-blue-700 mt-1">
                In an emergency, knowing the nearest facility with appropriate maternity care can save precious time.
                Not all hospitals have obstetric emergency services.
              </p>
            </div>
          </div>
        </div>

        {/* Current Location */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-5 w-5 text-blue-600" />
              Your Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : locationError ? (
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-800">{locationError}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Navigation className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-sm">Oxford, United Kingdom</span>
                </div>
                <Button size="sm" variant="outline">
                  Update
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nearest Facilities */}
        <h2 className="text-lg font-semibold text-slate-800 mt-2">Nearest Facilities</h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-20 bg-slate-100 rounded-md"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : facilities.length > 0 ? (
          <div className="space-y-3">
            {facilities.map((facility) => (
              <Card key={facility.id} className={facility.hasObEmergency ? "border-green-200" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${facility.hasObEmergency ? "bg-green-100" : "bg-blue-100"}`}>
                      <Hospital className={`h-5 w-5 ${facility.hasObEmergency ? "text-green-600" : "text-blue-600"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{facility.name}</h3>
                        {facility.hasObEmergency && <Badge className="bg-green-100 text-green-700">OB Emergency</Badge>}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{facility.address}</p>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span>{facility.distance} miles</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span>{facility.travelTime} min drive</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1 gap-1">
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 gap-1">
                          <Navigation className="h-4 w-4" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 p-4 rounded-md border text-center">
            <p className="text-sm text-slate-600">No facilities found nearby.</p>
          </div>
        )}

        {/* Emergency Transport */}
        <Card className="bg-red-50 border-red-200 mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-red-800">
              <Ambulance className="h-5 w-5 text-red-600" />
              Emergency Transport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 mb-3">
              If you're experiencing a medical emergency, call for an ambulance immediately.
            </p>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Phone className="h-4 w-4 mr-2" />
              Call 999 for Ambulance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

