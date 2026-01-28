import { Link } from "wouter";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Decorative shapes */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full shape-pastel-blue opacity-10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full shape-pastel-pink opacity-10 translate-y-1/2 -translate-x-1/2" />
        
        <div className="container relative py-16">
          {/* CTA Section */}
          <div className="mb-12 p-8 md:p-12 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Book Your Move?</h3>
              <p className="text-primary-foreground/90 font-light mb-6">
                Get a quote in 60 seconds. Call, WhatsApp, or book online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <a href="tel:07459920895">
                    <Phone className="mr-2 w-4 h-4" />
                    07459 920 895
                  </a>
                </Button>
                <Button asChild variant="outline" className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10">
                  <a 
                    href="https://wa.me/447459920895?text=Hi%20KK%20Logistics,%20I'd%20like%20a%20quote%20for..."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">KK</span>
                </div>
                <div>
                  <span className="font-bold text-lg tracking-tight">KK Logistics</span>
                  <p className="text-xs opacity-70 font-light tracking-wider">MAN WITH A VAN</p>
                </div>
              </div>
              <p className="text-sm opacity-80 font-light leading-relaxed">
                Trusted removal & delivery experts serving Falkirk, Glasgow, Edinburgh, and all of Scotland.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Same-Day Available</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <nav className="space-y-2">
                <Link href="/" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Home</Link>
                <Link href="/services" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Services</Link>
                <Link href="/quote" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Get Quote</Link>
                <Link href="/contact" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Contact</Link>
                <Link href="/driver/register" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Drive with Us</Link>
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Our Services</h4>
              <nav className="space-y-2">
                <Link href="/services#house-removals" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">House Removals</Link>
                <Link href="/services#furniture-delivery" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Furniture Delivery</Link>
                <Link href="/services#office-moves" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Office Moves</Link>
                <Link href="/services#courier" className="block text-sm opacity-80 hover:opacity-100 transition-smooth">Courier Services</Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
              <div className="space-y-3">
                <a 
                  href="tel:07459920895" 
                  className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-smooth font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  <span>07459 920 895</span>
                </a>
                <a 
                  href="https://wa.me/447459920895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-smooth"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <div className="flex items-center gap-3 text-sm opacity-80">
                  <MapPin className="w-4 h-4" />
                  <span>Falkirk, Scotland</span>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-80">
                  <Clock className="w-4 h-4" />
                  <span>7am - 9pm, 7 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-primary-foreground/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm opacity-70 font-light">
                © {currentYear} KK Logistics. All rights reserved. | Serving Falkirk, Glasgow, Edinburgh, Stirling & Central Scotland
              </p>
              <div className="flex gap-4 text-sm opacity-70">
                <a href="#" className="hover:opacity-100 transition-smooth">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:opacity-100 transition-smooth">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
