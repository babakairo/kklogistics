import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import Seo from "@/components/Seo";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageCircle
} from "lucide-react";

export default function Contact() {
  const businessAddress = [
    "Kaithan Logistics",
    "Falkirk, Scotland",
    "FK1 1AA",
  ];
  const mapEmbedUrl = "https://www.google.com/maps?q=Falkirk%2C%20Scotland&output=embed";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: ""
  });

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch shortly.");
      setFormData({ name: "", email: "", phone: "", serviceType: "", message: "" });
    },
    onError: (error) => {
      toast.error("Failed to send message. Please try again or call us directly.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    createLead.mutate({
      name: formData.name,
      email: formData.email || undefined,
      phone: formData.phone,
      serviceType: (formData.serviceType as any) || "house_removal",
      message: formData.message || undefined,
      source: "form"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Contact Us | Kaithan Logistics | Falkirk & Central Scotland"
        description="Contact Kaithan Logistics for removals, deliveries, and courier services. Call, WhatsApp, or request a quote online."
        canonicalPath="/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Kaithan Logistics",
          url: "https://kaithanlogistics.co.uk/contact",
        }}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />
          
          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">Get In Touch</p>
              <h1 className="mb-6">Contact Us</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Ready to book your move or have questions? Call us, WhatsApp, or fill out a form. We respond fast – usually within the hour.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="pb-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* Phone - Prominent */}
              <Card className="bg-primary text-primary-foreground border-0 md:col-span-1 group hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6 group-hover:bg-primary-foreground/30 transition-colors">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Fastest Response</h3>
                  <p className="text-sm opacity-80 font-light mb-4">
                    Call for instant quotes and bookings
                  </p>
                  <a 
                    href="tel:07459920895" 
                    className="text-3xl font-bold hover:underline block mb-4"
                  >
                    07459 920 895
                  </a>
                  <p className="text-xs opacity-70">Available 7am-9pm, 7 days a week</p>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="bg-green-600 text-white border-0 md:col-span-1 group hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">WhatsApp Chat</h3>
                  <p className="text-sm opacity-90 font-light mb-4">
                    Message us with your requirements
                  </p>
                  <a 
                    href="https://wa.me/447459920895?text=Hi%20KK%20Logistics,%20I'd%20like%20a%20quote%20for..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-bold hover:underline"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Message Now
                  </a>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="bg-card border-border/50 group hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-pastel-blue/20 flex items-center justify-center mb-6 group-hover:bg-pastel-blue/30 transition-colors">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Service Area</h3>
                  <p className="text-muted-foreground font-light mb-4">
                    Based in Falkirk, serving all of Central Scotland
                  </p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    Glasgow • Edinburgh • Dundee • Stirling • Aberdeen
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form & Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground font-light mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Required</Label>
                    <Select 
                      value={formData.serviceType} 
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house_removal">House Removal</SelectItem>
                        <SelectItem value="furniture_delivery">Furniture Delivery</SelectItem>
                        <SelectItem value="office_move">Office Move</SelectItem>
                        <SelectItem value="courier">Courier Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto"
                    disabled={createLead.isPending}
                  >
                    {createLead.isPending ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Interactive Map */}
              <div>
                <h2 className="text-2xl font-bold mb-2">Our Coverage Area</h2>
                <p className="text-muted-foreground font-light mb-8">
                  Based in Falkirk, we serve customers across Central Scotland.
                </p>

                <Card className="border-border/50 mb-6">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="w-4 h-4 text-primary" />
                      Business Address
                    </div>
                    <div className="text-sm text-muted-foreground font-light">
                      {businessAddress.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                    <div className="overflow-hidden rounded-lg border border-border/50">
                      <iframe
                        title="Kaithan Logistics Location"
                        src={mapEmbedUrl}
                        className="w-full h-56"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <ServiceAreaMap showDistanceCalculator={true} />

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-pastel-blue" />
                    <span className="text-muted-foreground">Falkirk & surrounds</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-pastel-blue" />
                    <span className="text-muted-foreground">Stirling area</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-pastel-blue" />
                    <span className="text-muted-foreground">Edinburgh routes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-pastel-blue" />
                    <span className="text-muted-foreground">Glasgow routes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call Banner */}
        <section className="py-12 bg-pastel-blue/20">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold mb-2">Prefer to Talk?</h3>
                <p className="text-muted-foreground font-light">
                  Call us directly for the fastest response and instant quotes.
                </p>
              </div>
              <Button size="lg" asChild>
                <a href="tel:07459920895">
                  <Phone className="mr-2 w-5 h-5" />
                  07459 920 895
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
