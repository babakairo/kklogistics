import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import StickyMobileButtons from "@/components/StickyMobileButtons";
import Seo from "@/components/Seo";
import { 
  Truck, 
  Package, 
  Building2, 
  Zap, 
  Phone, 
  Clock, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  MapPin,
  Award,
  Lock,
  TrendingUp,
  Users
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "House Removals",
    description: "Full house moves handled with care. From packing to unpacking, we've got you covered.",
    href: "/services/house-removals",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
  },
  {
    icon: Package,
    title: "Furniture Delivery",
    description: "Safe transport for your furniture purchases. Collection and delivery across Falkirk.",
    href: "/services/furniture-delivery",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  },
  {
    icon: Building2,
    title: "Office Moves",
    description: "Minimize downtime with our efficient office relocation services.",
    href: "/services/office-moves",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
  },
  {
    icon: Zap,
    title: "Courier Services",
    description: "Fast, reliable same-day and next-day delivery for packages of all sizes.",
    href: "/services/courier-services",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop"
  }
];

const features = [
  { icon: Clock, text: "Same Day Service Available" },
  { icon: Shield, text: "Fully Insured" },
  { icon: Star, text: "5-Star Rated Service" },
  { icon: CheckCircle2, text: "Free No-Obligation Quotes" }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <Seo
        title="Man with a Van Falkirk | Removals & Delivery Scotland | Kaithan Logistics"
        description="Professional removals, furniture delivery & courier services across Scotland. Falkirk-based, fully insured, same-day available. Free instant quotes. 07459 920 895."
        canonicalPath="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Kaithan Logistics",
          url: "https://kaithanlogistics.co.uk/",
          description:
            "Professional removals, furniture delivery & courier services across Scotland. Falkirk-based, fully insured, same-day available.",
        }}
      />
      <Header />
      <StickyMobileButtons />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden section-spacing">
          {/* Decorative shapes */}
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full shape-pastel-blue blur-3xl opacity-60" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full shape-pastel-pink blur-3xl opacity-60" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full shape-pastel-blue blur-2xl opacity-40" />
          
          <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-primary">
                  <Award className="w-4 h-4" />
                  <span>5-Star Rated • Fully Insured • Same-Day Available</span>
                </div>
                <h1 className="mb-6 text-4xl md:text-5xl font-bold leading-tight">
                  Man with a Van Falkirk You Can <span className="text-pastel-blue">Trust</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-2">
                  Professional removals, furniture delivery & courier across Scotland.
                </p>
                <p className="text-base text-muted-foreground font-light mb-8">
                  Local Falkirk experts serving Glasgow, Edinburgh, Dundee, Stirling & beyond. Zero hidden fees, real-time tracking, care guaranteed.
                </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="text-base px-8" asChild>
                  <Link href="/quote">
                    Get Free Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-2" asChild>
                  <a href="tel:07459920895">
                    <Phone className="mr-2 w-4 h-4" />
                    Call Now: 07459 920 895
                  </a>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <a 
                  href="https://wa.me/447459920895?text=Hi%20KK%20Logistics,%20I'd%20like%20a%20quote%20for..." 
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-green-200/50 shadow-sm">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-blue-200/50 shadow-sm">
                  <Clock className="w-4 h-4 text-pastel-blue" />
                  <span className="text-sm font-medium">Same-Day Available</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-amber-200/50 shadow-sm">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-purple-200/50 shadow-sm">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">No Hidden Fees</span>
                </div>
              </div>
              </div>

              {/* Hero Image */}
              <div className="hidden lg:flex items-center justify-center">
                <img 
                  src="/images/hero-van.svg" 
                  alt="KK Logistics Moving Van"
                  className="w-full max-w-md drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Hero Image */}
        <div className="lg:hidden container mx-auto -mt-8 mb-8">
          <img 
            src="/images/hero-van.svg" 
            alt="KK Logistics Moving Van"
            className="w-full max-w-sm mx-auto drop-shadow-lg"
          />
        </div>

        {/* Services Section */}
        <section className="section-spacing bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="subtitle mb-4">Our Services</p>
              <h2 className="mb-4">What We Offer Across Scotland</h2>
              <p className="text-lg text-muted-foreground font-light">
                From single-item delivery to complete house moves, we handle it all with professionalism and care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-smooth border-border/50 bg-background overflow-hidden"
                >
                  {service.image && (
                    <div className="overflow-hidden h-40">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-pastel-blue/20 flex items-center justify-center mb-4 group-hover:bg-pastel-blue/30 transition-smooth">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground font-light mb-4">{service.description}</p>
                    <Link 
                      href={service.href}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-spacing bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="subtitle mb-4">Customer Reviews</p>
              <h2 className="mb-4">Trusted by Local Customers</h2>
              <p className="text-lg text-muted-foreground font-light">
                Real feedback from moves and deliveries across Central Scotland.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Sarah M.",
                  location: "Falkirk",
                  quote: "Brilliant service. The team were on time, careful with our furniture, and very friendly.",
                },
                {
                  name: "James R.",
                  location: "Glasgow",
                  quote: "Same-day collection and delivery was smooth and stress-free. Highly recommend.",
                },
                {
                  name: "Priya K.",
                  location: "Edinburgh",
                  quote: "Great communication and clear pricing. Our flat move went perfectly.",
                },
                {
                  name: "David L.",
                  location: "Stirling",
                  quote: "Reliable and professional. Took great care of our office equipment.",
                },
              ].map((review) => (
                <Card key={review.name} className="border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground font-light">“{review.quote}”</p>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="section-spacing bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="subtitle mb-4">Trusted & Insured</p>
              <h2 className="mb-4">Why Customers Choose Us</h2>
              <p className="text-lg text-muted-foreground font-light">
                Fully insured, 5-star rated, and committed to safe, reliable transport.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-background border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Shield className="w-8 h-8 mx-auto text-pastel-blue" />
                  <h3 className="font-bold">Fully Insured</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Goods in transit and public liability coverage.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Star className="w-8 h-8 mx-auto text-amber-500" />
                  <h3 className="font-bold">5-Star Rated</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Consistently praised for care and reliability.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Award className="w-8 h-8 mx-auto text-primary" />
                  <h3 className="font-bold">Professional Service</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Local experts with a proven track record.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/10 to-pastel-pink/10" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full shape-pastel-pink blur-3xl opacity-30" />
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <p className="subtitle mb-4">Ready to Move?</p>
              <h2 className="mb-6">Get Your Quote in 60 Seconds</h2>
              <p className="text-lg text-muted-foreground font-light mb-8">
                Transparent pricing, no obligation. Get an instant estimate or speak to one of our team today. We serve all of Central Scotland.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base px-8" asChild>
                  <Link href="/quote">
                    Calculate Your Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-2" asChild>
                  <a href="tel:07459920895">
                    <Phone className="mr-2 w-4 h-4" />
                    Call 07459 920 895
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us / Trust Section */}
        <section className="section-spacing bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-light tracking-widest uppercase opacity-70 mb-4">Why Choose KK Logistics</p>
                <h2 className="mb-6">The Most Trusted Removal Service in Falkirk</h2>
                <p className="text-lg font-light opacity-90 leading-relaxed mb-8">
                  We're not a massive chain. We're local Falkirk experts who care about every move. Fully insured, real-time tracking, and a satisfaction guarantee on every job.
                </p>
                <ul className="space-y-4">
                  {[
                    "Fully insured – your belongings are 100% protected",
                    "Real-time tracking – know where your move is at all times",
                    "Same-day available – book quickly when you need us",
                    "Transparent pricing – no hidden charges, ever",
                    "5-star rated – proven track record across Falkirk & Scotland",
                    "24/7 support – text, call, or WhatsApp anytime"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-pastel-blue flex-shrink-0" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
                      <Star className="w-12 h-12" />
                    </div>
                    <p className="text-4xl font-bold mb-2">5.0</p>
                    <p className="text-sm font-light opacity-70 uppercase tracking-wider">Customer Rating</p>
                    <p className="text-xs font-light opacity-60 mt-4">Based on recent reviews from verified customers</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full shape-pastel-blue opacity-30" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full shape-pastel-pink opacity-30" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-spacing bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="subtitle mb-4">Simple Process</p>
              <h2 className="mb-4">How We Work</h2>
              <p className="text-lg text-muted-foreground font-light">
                Get a quote, book your move, and let us handle the rest. Easy as 1-2-3.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <Card className="border-border/50 text-center relative">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-pastel-blue/20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Get a Quote</h3>
                  <p className="text-muted-foreground font-light mb-4">
                    Call us or use our instant quote calculator. Real prices, no surprises.
                  </p>
                  <a href="tel:07459920895" className="text-sm font-medium text-primary hover:underline">
                    Call Now →
                  </a>
                </CardContent>
              </Card>
              {/* Step 2 */}
              <Card className="border-border/50 text-center relative">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-pastel-pink/20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Book & Confirm</h3>
                  <p className="text-muted-foreground font-light mb-4">
                    Choose your date and time. We'll send you a confirmation with tracking info.
                  </p>
                  <Link href="/quote" className="text-sm font-medium text-primary hover:underline">
                    Book Now →
                  </Link>
                </CardContent>
              </Card>
              {/* Step 3 */}
              <Card className="border-border/50 text-center relative">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-amber-200/30 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Relax & Move</h3>
                  <p className="text-muted-foreground font-light mb-4">
                    Our team handles everything. Track your move in real-time via WhatsApp or call.
                  </p>
                  <span className="text-sm font-medium text-muted-foreground">
                    We've got this ✓
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Drive with Us Section */}
        <section className="section-spacing bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-primary-foreground relative overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full shape-pastel-blue opacity-20 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full shape-pastel-pink opacity-20 translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-foreground/20 rounded-full text-sm font-medium mb-4">
                      <Truck className="w-4 h-4" />
                      <span>Join Our Team</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Got a Van? Drive with Us!</h2>
                    <p className="text-primary-foreground/80 font-light max-w-lg">
                      Use your own van to earn money on your schedule. Join KK Logistics and be part of our growing network of driver partners across Central Scotland.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button size="lg" variant="secondary" className="text-base px-8" asChild>
                      <Link href="/driver/register">
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-spacing bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <p className="subtitle mb-4">FAQ</p>
                <h2 className="mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground font-light">
                  Common questions about our services. Can't find an answer? Call us on 07459 920 895.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    q: "How much does it cost?",
                    a: "Pricing depends on service type, distance, and items. Call for an instant quote (07459 920 895) or use our calculator. No hidden fees."
                  },
                  {
                    q: "Can you do same-day moves?",
                    a: "Yes! We often have same-day availability, especially for smaller jobs. Text or call us to check. Weekends available too."
                  },
                  {
                    q: "Are you insured?",
                    a: "Fully insured for all removals and deliveries. Your belongings are protected. We carry full public liability and goods-in-transit coverage."
                  },
                  {
                    q: "Do you handle packing?",
                    a: "Yes, we offer full packing service, or can work around your packing. We bring protective materials and handle fragile items carefully."
                  },
                  {
                    q: "How far do you travel?",
                    a: "We cover all of Central Scotland – Glasgow, Edinburgh, Dundee, Aberdeen, Stirling, and everywhere in between. Long-distance quotes available."
                  },
                  {
                    q: "Can I track my move?",
                    a: "Yes! Real-time tracking via WhatsApp or text. You'll know exactly where your items are and when to expect us."
                  },
                  {
                    q: "What if I need to cancel?",
                    a: "Cancel up to 24 hours before your booking for a full refund. We understand plans change. Speak to our team for flexible rescheduling."
                  },
                  {
                    q: "How do I pay?",
                    a: "Bank transfer, card, or cash. You can pay a deposit upfront to secure your date, or pay in full on the day."
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50 overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pastel-blue/20 flex items-center justify-center text-sm font-bold text-primary">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                          <p className="text-muted-foreground font-light">{item.a}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-12 p-8 bg-pastel-blue/10 rounded-lg text-center border border-border/50">
                <p className="text-muted-foreground font-light mb-4">Still have questions?</p>
                <Button asChild>
                  <a href="tel:07459920895">
                    Call Us Now – 07459 920 895
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section className="py-8 bg-pastel-blue/20">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-light">Need help? Call us now</p>
                  <a href="tel:07459920895" className="text-xl font-bold hover:underline">
                    07459 920 895
                  </a>
                </div>
              </div>
              <Button asChild>
                <Link href="/contact">Send Enquiry</Link>
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
