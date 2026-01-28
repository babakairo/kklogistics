import { useRef, useCallback, useState } from "react";
import { MapView } from "./Map";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Loader2 } from "lucide-react";

// Falkirk coordinates
const FALKIRK_CENTER = { lat: 56.0019, lng: -3.7839 };

interface ServiceAreaMapProps {
  onDistanceCalculated?: (distance: number, duration: string) => void;
  showDistanceCalculator?: boolean;
  className?: string;
}

export function ServiceAreaMap({ 
  onDistanceCalculated, 
  showDistanceCalculator = false,
  className 
}: ServiceAreaMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    
    // Add Falkirk marker
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: FALKIRK_CENTER,
      title: "KK Logistics - Falkirk",
    });

    // Add coverage area circle
    new google.maps.Circle({
      map,
      center: FALKIRK_CENTER,
      radius: 40000, // 40km radius
      fillColor: "#93c5fd",
      fillOpacity: 0.1,
      strokeColor: "#3b82f6",
      strokeOpacity: 0.3,
      strokeWeight: 2,
    });

    // Initialize directions renderer
    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#1e293b",
        strokeWeight: 4,
      },
    });
  }, []);

  const calculateRoute = useCallback(async () => {
    if (!mapRef.current || !pickup || !delivery) return;

    setCalculating(true);
    setRouteInfo(null);

    try {
      const directionsService = new google.maps.DirectionsService();
      
      const result = await directionsService.route({
        origin: pickup + ", Scotland, UK",
        destination: delivery + ", Scotland, UK",
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (directionsRendererRef.current && result) {
        directionsRendererRef.current.setDirections(result);
        
        const route = result.routes[0];
        if (route && route.legs[0]) {
          const leg = route.legs[0];
          const distanceKm = (leg.distance?.value || 0) / 1000;
          const duration = leg.duration?.text || "Unknown";
          
          setRouteInfo({
            distance: `${distanceKm.toFixed(1)} km`,
            duration,
          });

          if (onDistanceCalculated) {
            onDistanceCalculated(distanceKm, duration);
          }
        }
      }
    } catch (error) {
      console.error("Failed to calculate route:", error);
      setRouteInfo({ distance: "Unable to calculate", duration: "N/A" });
    } finally {
      setCalculating(false);
    }
  }, [pickup, delivery, onDistanceCalculated]);

  return (
    <div className={className}>
      <Card className="border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <MapView
            className="h-[400px]"
            initialCenter={FALKIRK_CENTER}
            initialZoom={9}
            onMapReady={handleMapReady}
          />
        </CardContent>
      </Card>

      {showDistanceCalculator && (
        <Card className="mt-4 border-border/50">
          <CardContent className="p-4">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-pastel-blue" />
              Calculate Distance
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="map-pickup" className="flex items-center gap-2 text-sm">
                  <MapPin className="w-3 h-3 text-green-500" />
                  Pickup Location
                </Label>
                <Input
                  id="map-pickup"
                  placeholder="e.g., Falkirk"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="map-delivery" className="flex items-center gap-2 text-sm">
                  <MapPin className="w-3 h-3 text-red-500" />
                  Delivery Location
                </Label>
                <Input
                  id="map-delivery"
                  placeholder="e.g., Edinburgh"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button 
                onClick={calculateRoute}
                disabled={!pickup || !delivery || calculating}
                size="sm"
              >
                {calculating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate Route"
                )}
              </Button>

              {routeInfo && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Estimated</p>
                  <p className="font-bold">{routeInfo.distance}</p>
                  <p className="text-sm text-muted-foreground">{routeInfo.duration}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
