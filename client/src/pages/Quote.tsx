import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Truck, 
  Package, 
  Building2, 
  Zap, 
  Calculator,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPin
} from "lucide-react";

const serviceTypes = [
  { id: "house_removal", label: "House Removal", icon: Truck, basePrice: 50, perMile: 1.5, perItem: 5 },
  { id: "furniture_delivery", label: "Furniture Delivery", icon: Package, basePrice: 30, perMile: 1.2, perItem: 3 },
  { id: "office_move", label: "Office Move", icon: Building2, basePrice: 75, perMile: 1.8, perItem: 4 },
  { id: "courier", label: "Courier Service", icon: Zap, basePrice: 15, perMile: 0.8, perItem: 2 },
];

// Approximate distances from Falkirk (in miles)
const distanceEstimates: Record<string, number> = {
  "falkirk": 5,
  "grangemouth": 4,
  "bo'ness": 6,
  "polmont": 3,
  "larbert": 3,
  "stenhousemuir": 2,
  "denny": 5,
  "bonnybridge": 4,
  "stirling": 12,
  "edinburgh": 25,
  "glasgow": 25,
  "linlithgow": 10,
  "livingston": 18,
  "dunfermline": 15,
  "alloa": 10,
};

export default function Quote() {
  const [serviceType, setServiceType] = useState("house_removal");
  const [pickupArea, setPickupArea] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [itemCount, setItemCount] = useState([5]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    message: ""
  });

  const selectedService = serviceTypes.find(s => s.id === serviceType)!;

  // Calculate estimated distance
  const estimatedDistance = useMemo(() => {
    const pickupLower = pickupArea.toLowerCase().trim();
    const deliveryLower = deliveryArea.toLowerCase().trim();
    
    const pickupDist = Object.entries(distanceEstimates).find(([key]) => 
      pickupLower.includes(key)
    )?.[1] || 10;
    
    const deliveryDist = Object.entries(distanceEstimates).find(([key]) => 
      deliveryLower.includes(key)
    )?.[1] || 10;
    
    // Simple estimation: distance between two points from Falkirk
    return Math.max(pickupDist, deliveryDist) + Math.abs(pickupDist - deliveryDist) / 2;
  }, [pickupArea, deliveryArea]);

  // Calculate quote
  const quote = useMemo(() => {
    const base = selectedService.basePrice;
    const mileageCost = estimatedDistance * selectedService.perMile;
    const itemCost = itemCount[0] * selectedService.perItem;
    const subtotal = base + mileageCost + itemCost;
    
    return {
      base,
      mileage: Math.round(mileageCost),
      items: Math.round(itemCost),
      total: Math.round(subtotal),
      distance: Math.round(estimatedDistance)
    };
  }, [selectedService, estimatedDistance, itemCount]);

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      toast.success("Booking request sent! We'll call you shortly to confirm.");
      setShowBookingForm(false);
      setBookingData({ name: "", phone: "", email: "", preferredDate: "", message: "" });
    },
    onError: () => {
      toast.error("Failed to send booking. Please try again or call us directly.");
    }
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    createLead.mutate({
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email || undefined,
      serviceType: serviceType as any,
      pickupAddress: pickupArea,
      deliveryAddress: deliveryArea,
      preferredDate: bookingData.preferredDate || undefined,
      message: `Quote: £${quote.total} | Items: ${itemCount[0]} | Distance: ~${quote.distance} miles | ${bookingData.message}`,
      source: "quote_calculator"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />
          
          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">Instant Pricing</p>
              <h1 className="mb-6">Get Your Free Quote</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Use our calculator for an instant estimate. Transparent pricing, zero hidden fees. Or call us directly for a quick chat: <strong>07459 920 895</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Quote Calculator */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Service Type */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                      Select Service Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={serviceType} 
                      onValueChange={setServiceType}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {serviceTypes.map((service) => (
                        <div key={service.id}>
                          <RadioGroupItem
                            value={service.id}
                            id={service.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={service.id}
                            className="flex items-center gap-4 p-4 rounded-lg border-2 border-border cursor-pointer transition-smooth peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                          >
                            <div className="w-12 h-12 rounded-lg bg-pastel-blue/20 flex items-center justify-center">
                              <service.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold">{service.label}</p>
                              <p className="text-sm text-muted-foreground">From £{service.basePrice}</p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Locations */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                      Enter Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup" className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-pastel-blue" />
                          Pickup Location
                        </Label>
                        <Input
                          id="pickup"
                          placeholder="e.g., Falkirk, Edinburgh"
                          value={pickupArea}
                          onChange={(e) => setPickupArea(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="delivery" className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-pastel-pink" />
                          Delivery Location
                        </Label>
                        <Input
                          id="delivery"
                          placeholder="e.g., Glasgow, Stirling"
                          value={deliveryArea}
                          onChange={(e) => setDeliveryArea(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Estimated distance: ~{quote.distance} miles
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      For accurate distance, use the map on our Contact page.
                    </p>
                  </CardContent>
                </Card>

                {/* Item Count */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                      Number of Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Items / Boxes</Label>
                        <span className="text-2xl font-bold">{itemCount[0]}</span>
                      </div>
                      <Slider
                        value={itemCount}
                        onValueChange={setItemCount}
                        min={1}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1 item</span>
                        <span>50+ items</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      For larger moves, we'll provide a custom quote after assessment.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quote Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="border-border/50 bg-card">
                    <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Your Quote
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Base rate</span>
                          <span>£{quote.base}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Distance (~{quote.distance} mi)</span>
                          <span>£{quote.mileage}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Items ({itemCount[0]})</span>
                          <span>£{quote.items}</span>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Estimated Total</span>
                            <span className="text-3xl font-bold">£{quote.total}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        * This is an estimate. Final price may vary based on actual requirements.
                      </p>

                      {!showBookingForm ? (
                        <div className="space-y-3">
                          <Button 
                            className="w-full" 
                            size="lg"
                            onClick={() => setShowBookingForm(true)}
                          >
                            Book This Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full bg-transparent" 
                            size="lg"
                            asChild
                          >
                            <a href="tel:07459920895">
                              <Phone className="mr-2 w-4 h-4" />
                              Call to Discuss
                            </a>
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleBooking} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="book-name">Name *</Label>
                            <Input
                              id="book-name"
                              placeholder="Your name"
                              value={bookingData.name}
                              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="book-phone">Phone *</Label>
                            <Input
                              id="book-phone"
                              type="tel"
                              placeholder="Your phone"
                              value={bookingData.phone}
                              onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="book-email">Email</Label>
                            <Input
                              id="book-email"
                              type="email"
                              placeholder="your@email.com"
                              value={bookingData.email}
                              onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="book-date">Preferred Date</Label>
                            <Input
                              id="book-date"
                              type="date"
                              value={bookingData.preferredDate}
                              onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full" 
                            size="lg"
                            disabled={createLead.isPending}
                          >
                            {createLead.isPending ? (
                              <>
                                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="mr-2 w-4 h-4" />
                                Request Booking
                              </>
                            )}
                          </Button>
                          <Button 
                            type="button"
                            variant="ghost" 
                            className="w-full" 
                            onClick={() => setShowBookingForm(false)}
                          >
                            Cancel
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>

                  {/* Trust badges */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-pastel-blue" />
                      <span>No obligation quote</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-pastel-blue" />
                      <span>No hidden charges</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-pastel-blue" />
                      <span>Fully insured service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
