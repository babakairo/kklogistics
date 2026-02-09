import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { 
  Truck, 
  Package, 
  Building2, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  MapPin
} from "lucide-react";

const services = [
  {
    id: "house-removals",
    icon: Truck,
    title: "House Removals",
    subtitle: "Full Home Moving Service",
    description: "Moving home is stressful enough without worrying about the logistics. Our comprehensive house removal service takes care of everything, from careful packing to safe transport and unpacking at your new address.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1000&h=750&fit=crop&q=80",
    features: [
      "Full or partial packing service available",
      "Furniture disassembly and reassembly",
      "Protective wrapping for all items",
      "Flexible scheduling including weekends",
      "Single items to full house moves",
      "Storage solutions if needed"
    ],
    pricing: "From £50/hour",
    detailHref: "/services/house-removals"
  },
  {
    id: "furniture-delivery",
    icon: Package,
    title: "Furniture Delivery",
    subtitle: "Safe & Secure Transport",
    description: "Whether you've bought a new sofa, picked up a bargain on Gumtree, or need furniture moved between properties, we provide careful collection and delivery across Falkirk and beyond.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1000&h=750&fit=crop&q=80",
    features: [
      "Collection from any retailer or private seller",
      "Careful handling of all furniture types",
      "Assembly service available",
      "Same-day delivery options",
      "Blanket wrapping included",
      "Competitive flat-rate pricing"
    ],
    pricing: "From £30",
    detailHref: "/services/furniture-delivery"
  },
  {
    id: "office-moves",
    icon: Building2,
    title: "Office Moves",
    subtitle: "Minimize Business Downtime",
    description: "Relocating your business requires careful planning and execution. We work around your schedule to ensure minimal disruption, handling everything from desks and chairs to IT equipment and filing cabinets.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&h=750&fit=crop&q=80",
    features: [
      "Weekend and evening moves available",
      "IT equipment handling",
      "Desk and workstation setup",
      "Confidential document handling",
      "Multi-floor building experience",
      "Project management for larger moves"
    ],
    pricing: "Custom quotes",
    detailHref: "/services/office-moves"
  },
  {
    id: "courier",
    icon: Zap,
    title: "Courier Services",
    subtitle: "Fast & Reliable Delivery",
    description: "Need something delivered urgently? Our courier service offers same-day and next-day delivery for packages of all sizes across Central Scotland. Perfect for businesses and individuals alike.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&h=750&fit=crop&q=80",
    features: [
      "Same-day delivery available",
      "Real-time tracking updates",
      "Proof of delivery provided",
      "Fragile item specialists",
      "Regular business routes",
      "Competitive per-mile rates"
    ],
    pricing: "From £15",
    detailHref: "/services/courier-services"
  }
];

const coverageAreas = [
  "Falkirk", "Grangemouth", "Bo'ness", "Polmont", "Larbert", 
  "Stenhousemuir", "Denny", "Bonnybridge", "Camelon", "Stirling",
  "Edinburgh", "Glasgow", "Linlithgow", "Livingston"
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Our Services | House Removals & Courier | Kaithan Logistics"
        description="Explore our house removals, furniture delivery, office moves, and courier services across Falkirk and Central Scotland."
        canonicalPath="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Kaithan Logistics Services",
          url: "https://kaithanlogistics.co.uk/services",
          description: "House removals, furniture delivery, office moves, and courier services across Central Scotland.",
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
              <p className="subtitle mb-4">What We Do</p>
              <h1 className="mb-6">Our Services</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                From single item deliveries to complete house moves, KK Logistics provides 
                reliable, affordable transport solutions across Falkirk and Central Scotland.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-pastel-blue/20 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="subtitle">{service.subtitle}</p>
                    </div>
                    <h2 className="mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-pastel-blue flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground font-light">Starting from</p>
                        <p className="text-2xl font-bold">{service.pricing}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild>
                          <Link href="/quote">
                            Get Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={service.detailHref}>Learn More</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Card className="bg-card border-border/50 overflow-hidden">
                      <CardContent className="p-0">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full aspect-[4/3] object-cover"
                          />
                        ) : (
                          <div className="aspect-[4/3] bg-gradient-to-br from-pastel-blue/20 to-pastel-pink/20 flex items-center justify-center">
                            <service.icon className="w-24 h-24 text-primary/20" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full shape-pastel-blue opacity-40" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full shape-pastel-pink opacity-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Area */}
        <section className="section-spacing bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="subtitle mb-4">Service Area</p>
              <h2 className="mb-4">Where We Operate</h2>
              <p className="text-lg text-muted-foreground font-light">
                Based in Falkirk, we cover all of Central Scotland and beyond. 
                Regular routes to Edinburgh, Glasgow, and Stirling.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {coverageAreas.map((area, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-background rounded-full border border-border/50 text-sm font-medium"
                >
                  <MapPin className="w-3 h-3 inline-block mr-1 text-pastel-blue" />
                  {area}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-background border-border/50">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 text-pastel-blue" />
                  <h4 className="font-bold mb-2">Flexible Hours</h4>
                  <p className="text-sm text-muted-foreground font-light">
                    7 days a week, early mornings to late evenings
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border/50">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-3 text-pastel-blue" />
                  <h4 className="font-bold mb-2">Fully Insured</h4>
                  <p className="text-sm text-muted-foreground font-light">
                    Comprehensive goods in transit insurance
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border/50">
                <CardContent className="p-6 text-center">
                  <Truck className="w-8 h-8 mx-auto mb-3 text-pastel-blue" />
                  <h4 className="font-bold mb-2">Right-Sized Vehicle</h4>
                  <p className="text-sm text-muted-foreground font-light">
                    Large van suitable for most moves
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-spacing relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/10 to-pastel-pink/10" />
          
          <div className="container relative">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground font-light mb-8">
                Get an instant quote for your move or delivery. No obligation, 
                transparent pricing, and friendly service guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/quote">
                    Get Instant Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <a href="tel:07459920895">Call 07459 920 895</a>
                </Button>
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
