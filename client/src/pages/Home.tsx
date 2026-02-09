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
  TrendingUp,
  Users
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "House Removals",
    description: "Full house moves handled with care. From packing to unpacking, we've got you covered.",
    href: "/services/house-removals",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&h=600&fit=crop&q=80"
  },
  {
    icon: Package,
    title: "Furniture Delivery",
    description: "Safe transport for your furniture purchases. Collection and delivery across Falkirk.",
    href: "/services/furniture-delivery",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=600&fit=crop&q=80"
  },
  {
    icon: Building2,
    title: "Office Moves",
    description: "Minimize downtime with our efficient office relocation services.",
    href: "/services/office-moves",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80"
  },
  {
    icon: Zap,
    title: "Courier Services",
    description: "Fast, reliable same-day and next-day delivery for packages of all sizes.",
    href: "/services/courier-services",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop&q=80"
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
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-background dark:to-blue-950">
          {/* Animated Decorative shapes */}
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-400/30 to-orange-400/30 blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
          
          <div className="container relative py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-3xl space-y-8">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-full border-2 border-amber-200 dark:border-amber-800 shadow-lg animate-bounce" style={{animationDuration: '3s'}}>
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-bold text-amber-900 dark:text-amber-100">⭐ 5-Star Rated • Fully Insured • Same-Day Available</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Man with a Van
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-white">Falkirk You Can</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent animate-pulse">
                    Trust
                  </span>
                </h1>

                {/* Subtitle */}
                <div className="space-y-3">
                  <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                    Professional removals, furniture delivery & courier across Scotland.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    🚚 Local Falkirk experts • 📍 Serving Glasgow, Edinburgh & beyond • 💰 Zero hidden fees • ✅ Care guaranteed
                  </p>
                </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="group">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    Get Free Quote
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="tel:07459920895" className="group">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-lg rounded-xl border-3 border-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    07459 920 895
                  </button>
                </a>
              </div>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/447459920895?text=Hi%20KK%20Logistics,%20I'd%20like%20a%20quote%20for..." 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 animate-pulse" />
                <span>WhatsApp Chat - Instant Response</span>
              </a>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border-2 border-green-200 dark:border-green-700 shadow-md hover:shadow-lg transition-shadow">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-bold text-green-900 dark:text-green-100">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full border-2 border-blue-200 dark:border-blue-700 shadow-md hover:shadow-lg transition-shadow">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-blue-900 dark:text-blue-100">Same-Day Service</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-full border-2 border-amber-200 dark:border-amber-700 shadow-md hover:shadow-lg transition-shadow">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-bold text-amber-900 dark:text-amber-100">5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-md hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-bold text-purple-900 dark:text-purple-100">No Hidden Fees</span>
                </div>
              </div>
              </div>

              {/* Hero Image */}
              <div className="hidden lg:flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <img 
                  src="/images/hero-van.svg" 
                  alt="KK Logistics Moving Van"
                  className="w-full max-w-md drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Hero Image */}
        <div className="lg:hidden container mx-auto -mt-8 mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <img 
              src="/images/hero-van.svg" 
              alt="KK Logistics Moving Van"
              className="w-full max-w-sm mx-auto drop-shadow-2xl relative z-10"
            />
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold">500+</div>
                <div className="text-sm md:text-base font-medium opacity-90">Happy Customers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold">5★</div>
                <div className="text-sm md:text-base font-medium opacity-90">Average Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold">24/7</div>
                <div className="text-sm md:text-base font-medium opacity-90">Support Available</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold">100%</div>
                <div className="text-sm md:text-base font-medium opacity-90">Insured Moves</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-spacing bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 font-bold rounded-full mb-6 text-sm uppercase tracking-wide">Our Services</p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                What We Offer Across Scotland
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                From single-item delivery to complete house moves, we handle it all with professionalism and care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {service.image && (
                    <div className="overflow-hidden h-48 relative">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  )}
                  <CardContent className="p-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-light mb-4 leading-relaxed">{service.description}</p>
                    <Link 
                      href={service.href}
                      className="inline-flex items-center text-base font-bold text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 group-hover:gap-3 transition-all"
                    >
                      Learn more
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
