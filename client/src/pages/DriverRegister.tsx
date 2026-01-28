import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Truck, 
  User, 
  FileText, 
  Shield, 
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function DriverRegister() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal info
    fullName: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    dateOfBirth: "",
    // License
    drivingLicenseNumber: "",
    licenseExpiryDate: "",
    // Van details
    vanMake: "",
    vanModel: "",
    vanYear: "",
    vanRegistration: "",
    vanCapacity: "medium" as "small" | "medium" | "large" | "luton",
    // Insurance
    insuranceProvider: "",
    insurancePolicyNumber: "",
    insuranceExpiryDate: "",
    hasGoodsInTransitInsurance: false,
    // Service preferences
    serviceAreas: [] as string[],
    servicesOffered: [] as string[],
    maxDistanceKm: 50,
    // Availability
    availableDays: [] as string[],
    availableFrom: "07:00",
    availableTo: "21:00",
    // Terms
    agreeToTerms: false,
  });

  const registerMutation = trpc.drivers.register.useMutation({
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setLocation("/driver/application-submitted");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit application");
      setIsSubmitting(false);
    }
  });

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    setFormData(prev => {
      const arr = prev[field as keyof typeof prev] as string[];
      if (arr.includes(item)) {
        return { ...prev, [field]: arr.filter(i => i !== item) };
      }
      return { ...prev, [field]: [...arr, item] };
    });
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    
    registerMutation.mutate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || undefined,
      postcode: formData.postcode || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      drivingLicenseNumber: formData.drivingLicenseNumber || undefined,
      licenseExpiryDate: formData.licenseExpiryDate || undefined,
      vanMake: formData.vanMake || undefined,
      vanModel: formData.vanModel || undefined,
      vanYear: formData.vanYear ? parseInt(formData.vanYear) : undefined,
      vanRegistration: formData.vanRegistration || undefined,
      vanCapacity: formData.vanCapacity,
      insuranceProvider: formData.insuranceProvider || undefined,
      insurancePolicyNumber: formData.insurancePolicyNumber || undefined,
      insuranceExpiryDate: formData.insuranceExpiryDate || undefined,
      hasGoodsInTransitInsurance: formData.hasGoodsInTransitInsurance,
      serviceAreas: JSON.stringify(formData.serviceAreas),
      servicesOffered: JSON.stringify(formData.servicesOffered),
      maxDistanceKm: formData.maxDistanceKm,
      availableDays: JSON.stringify(formData.availableDays),
      availableFrom: formData.availableFrom,
      availableTo: formData.availableTo,
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone;
      case 2:
        return formData.vanMake && formData.vanRegistration;
      case 3:
        return formData.servicesOffered.length > 0;
      case 4:
        return formData.agreeToTerms;
      default:
        return false;
    }
  };

  const serviceAreas = [
    "Falkirk", "Grangemouth", "Bo'ness", "Polmont", "Larbert",
    "Stenhousemuir", "Denny", "Bonnybridge", "Stirling", "Edinburgh",
    "Glasgow", "Linlithgow", "Livingston"
  ];

  const services = [
    { id: "house_removal", label: "House Removals" },
    { id: "furniture_delivery", label: "Furniture Delivery" },
    { id: "office_move", label: "Office Moves" },
    { id: "courier", label: "Courier Services" }
  ];

  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-3">
              Join Our Team
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Become a <span className="text-pastel-blue">Driver Partner</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Use your own van to earn money on your schedule. Join KK Logistics and be part of our growing network.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep >= step 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-1 rounded ${currentStep > step ? "bg-primary" : "bg-secondary"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between text-xs text-muted-foreground mb-8 px-4">
            <span className={currentStep >= 1 ? "text-foreground font-medium" : ""}>Personal</span>
            <span className={currentStep >= 2 ? "text-foreground font-medium" : ""}>Vehicle</span>
            <span className={currentStep >= 3 ? "text-foreground font-medium" : ""}>Services</span>
            <span className={currentStep >= 4 ? "text-foreground font-medium" : ""}>Review</span>
          </div>

          {/* Form Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {currentStep === 1 && <><User className="w-5 h-5 text-pastel-blue" /> Personal Information</>}
                {currentStep === 2 && <><Truck className="w-5 h-5 text-pastel-blue" /> Vehicle Details</>}
                {currentStep === 3 && <><MapPin className="w-5 h-5 text-pastel-blue" /> Services & Availability</>}
                {currentStep === 4 && <><FileText className="w-5 h-5 text-pastel-blue" /> Review & Submit</>}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Tell us about your van"}
                {currentStep === 3 && "What services can you offer?"}
                {currentStep === 4 && "Review your application before submitting"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Smith"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="07xxx xxxxxx"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateField("dateOfBirth", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Your full address"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        placeholder="FK1 1AA"
                        value={formData.postcode}
                        onChange={(e) => updateField("postcode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="drivingLicenseNumber">Driving License Number</Label>
                      <Input
                        id="drivingLicenseNumber"
                        placeholder="SMITH901234AB5CD"
                        value={formData.drivingLicenseNumber}
                        onChange={(e) => updateField("drivingLicenseNumber", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Vehicle Details */}
              {currentStep === 2 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vanMake">Van Make *</Label>
                      <Input
                        id="vanMake"
                        placeholder="e.g., Ford, Mercedes, VW"
                        value={formData.vanMake}
                        onChange={(e) => updateField("vanMake", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vanModel">Van Model</Label>
                      <Input
                        id="vanModel"
                        placeholder="e.g., Transit, Sprinter"
                        value={formData.vanModel}
                        onChange={(e) => updateField("vanModel", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vanYear">Year</Label>
                      <Input
                        id="vanYear"
                        type="number"
                        placeholder="2020"
                        value={formData.vanYear}
                        onChange={(e) => updateField("vanYear", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vanRegistration">Registration Number *</Label>
                      <Input
                        id="vanRegistration"
                        placeholder="AB12 CDE"
                        value={formData.vanRegistration}
                        onChange={(e) => updateField("vanRegistration", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Van Size</Label>
                    <Select 
                      value={formData.vanCapacity} 
                      onValueChange={(v) => updateField("vanCapacity", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small Van (up to 3m³)</SelectItem>
                        <SelectItem value="medium">Medium Van (3-6m³)</SelectItem>
                        <SelectItem value="large">Large Van (6-10m³)</SelectItem>
                        <SelectItem value="luton">Luton Van (10m³+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-medium flex items-center gap-2 mb-4">
                      <Shield className="w-4 h-4 text-pastel-blue" />
                      Insurance Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                        <Input
                          id="insuranceProvider"
                          placeholder="e.g., Direct Line"
                          value={formData.insuranceProvider}
                          onChange={(e) => updateField("insuranceProvider", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="insuranceExpiryDate">Insurance Expiry</Label>
                        <Input
                          id="insuranceExpiryDate"
                          type="date"
                          value={formData.insuranceExpiryDate}
                          onChange={(e) => updateField("insuranceExpiryDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Checkbox
                        id="goodsInTransit"
                        checked={formData.hasGoodsInTransitInsurance}
                        onCheckedChange={(checked) => updateField("hasGoodsInTransitInsurance", checked)}
                      />
                      <Label htmlFor="goodsInTransit" className="text-sm">
                        I have Goods in Transit insurance
                      </Label>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Services & Availability */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-4">
                    <Label>Services You Can Offer *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            formData.servicesOffered.includes(service.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => toggleArrayItem("servicesOffered", service.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox checked={formData.servicesOffered.includes(service.id)} />
                            <span className="text-sm font-medium">{service.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Areas You Cover</Label>
                    <div className="flex flex-wrap gap-2">
                      {serviceAreas.map((area) => (
                        <button
                          key={area}
                          type="button"
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            formData.serviceAreas.includes(area)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                          onClick={() => toggleArrayItem("serviceAreas", area)}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Maximum Distance (km)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="range"
                        min="10"
                        max="200"
                        value={formData.maxDistanceKm}
                        onChange={(e) => updateField("maxDistanceKm", parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16">{formData.maxDistanceKm} km</span>
                    </div>
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-medium flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-pastel-blue" />
                      Availability
                    </h3>
                    <div className="space-y-4">
                      <Label>Days Available</Label>
                      <div className="flex flex-wrap gap-2">
                        {days.map((day) => (
                          <button
                            key={day}
                            type="button"
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                              formData.availableDays.includes(day)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary hover:bg-secondary/80"
                            }`}
                            onClick={() => toggleArrayItem("availableDays", day)}
                          >
                            {day.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="availableFrom">Available From</Label>
                        <Input
                          id="availableFrom"
                          type="time"
                          value={formData.availableFrom}
                          onChange={(e) => updateField("availableFrom", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availableTo">Available Until</Label>
                        <Input
                          id="availableTo"
                          type="time"
                          value={formData.availableTo}
                          onChange={(e) => updateField("availableTo", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <>
                  <div className="space-y-6">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Personal Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{formData.fullName}</span>
                        <span className="text-muted-foreground">Email:</span>
                        <span>{formData.email}</span>
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{formData.phone}</span>
                        {formData.postcode && (
                          <>
                            <span className="text-muted-foreground">Postcode:</span>
                            <span>{formData.postcode}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Vehicle</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Van:</span>
                        <span>{formData.vanMake} {formData.vanModel} {formData.vanYear && `(${formData.vanYear})`}</span>
                        <span className="text-muted-foreground">Registration:</span>
                        <span>{formData.vanRegistration}</span>
                        <span className="text-muted-foreground">Size:</span>
                        <span className="capitalize">{formData.vanCapacity}</span>
                      </div>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.servicesOffered.map(s => (
                          <span key={s} className="px-2 py-1 bg-primary/10 rounded text-xs">
                            {services.find(srv => srv.id === s)?.label}
                          </span>
                        ))}
                      </div>
                      {formData.serviceAreas.length > 0 && (
                        <div className="mt-3">
                          <span className="text-sm text-muted-foreground">Areas: </span>
                          <span className="text-sm">{formData.serviceAreas.join(", ")}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => updateField("agreeToTerms", checked)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          I confirm that all information provided is accurate. I agree to the terms and conditions 
                          and understand that my application will be reviewed before approval.
                        </Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 ? (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep((currentStep - 1) as Step)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                
                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep((currentStep + 1) as Step)}
                    disabled={!canProceed()}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-pastel-blue/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-sm text-muted-foreground">Work when it suits you. Accept jobs that fit your schedule.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-pastel-pink/20 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Use Your Van</h3>
              <p className="text-sm text-muted-foreground">No need to rent. Use your own vehicle and keep more earnings.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-pastel-blue/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Steady Work</h3>
              <p className="text-sm text-muted-foreground">Access to regular jobs from our growing customer base.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
